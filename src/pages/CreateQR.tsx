import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { message } from '@/lib/notify';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { qrCodeAPI } from '@/lib/api';
import CreateHeader from '../components/create/CreateHeader';
import PreviewCanvas from '../components/create/PreviewCanvas';
import PreviewSheet from '../components/create/PreviewSheet';
import StepFooter from '../components/create/StepFooter';
import MobileCreateBar from '../components/create/MobileCreateBar';
import { CONTENT_STEP, CREATE_STEPS, CreateStepKey } from '../components/create/createSteps';
import TemplateSelector from '../components/qr/TemplateSelector';
import TemplateEditorModal from '../components/qr/TemplateEditorModal';
import QRTypeSelector from '../components/qr/QRTypeSelector';
import ContentEditor from '../components/qr/ContentEditor';
import QRDesignTemplates from '../components/qr/QRDesignTemplates';
import QRStyleEditor from '../components/qr/QRStyleEditor';
import QRCodePreview from '../components/qr/QRCodePreview';
import AdvancedSettings from '../components/qr/AdvancedSettings';
import { useQRCodes } from '../hooks/useQRCodes';
import { useStyleHistory } from '../hooks/useStyleHistory';
import {
  QRTemplate,
  QRStyling,
  QRType,
  defaultStyling,
} from '../types/qrcode';

const stepKeys = CREATE_STEPS.map((step) => step.key);
type StepKey = CreateStepKey;
const LAST_STEP = CREATE_STEPS.length - 1;

const CreateQR: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { saveQRCode, updateQRCode, getQRCode } = useQRCodes();
  const previewRef = useRef<HTMLDivElement>(null);
  const { pushStyle, undo, canUndo } = useStyleHistory();

  const { id } = useParams<{ id?: string }>();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Get current step from URL or default to 0
  const stepParam = searchParams.get('step') as StepKey | null;
  const currentStep = useMemo(() => {
    const idx = stepKeys.indexOf(stepParam as StepKey);
    return idx >= 0 ? idx : 0;
  }, [stepParam]);

  const [template, setTemplate] = useState<QRTemplate | null>(null);
  const [type, setType] = useState<QRType>('url');
  const [content, setContent] = useState('https://example.com');
  const [styling, setStyling] = useState<QRStyling>(defaultStyling);
  const [name, setName] = useState('');
  const [password, setPassword] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [scanLimit, setScanLimit] = useState<number | null>(null);

  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);
  const [saving, setSaving] = useState(false);

  // Update URL when step changes
  const setCurrentStep = useCallback((stepIndex: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('step', stepKeys[stepIndex]);
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const canSave = Boolean(name.trim() && content.trim());

  const canJump = useCallback(
    (stepIndex: number) => stepIndex <= currentStep || stepIndex <= CONTENT_STEP || canSave,
    [currentStep, canSave]
  );

  const goToStep = useCallback((stepIndex: number) => {
    if (canJump(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  }, [canJump, setCurrentStep]);

  // Wrap setStyling to track history
  const handleStyleChange = useCallback((newStyling: QRStyling) => {
    pushStyle(styling);
    setStyling(newStyling);
  }, [pushStyle, styling]);

  const handleUndo = useCallback(() => {
    const previousStyle = undo();
    if (previousStyle) {
      setStyling(previousStyle);
      message.info('Styling reverted');
    }
  }, [undo]);

  // Initialize step from URL on mount
  useEffect(() => {
    if (!stepParam) {
      setCurrentStep(0);
    }
  }, []);

  useEffect(() => {
    const loadForEdit = async () => {
      if (!id) return;
      setEditingId(id);

      const existing = getQRCode(id);
      if (existing) {
        setTemplate(existing.template ?? null);
        setStyling(existing.styling ?? defaultStyling);
        setType(existing.type ?? 'url');
        setContent(existing.content ?? 'https://example.com');
        setName(existing.name ?? '');
        setPassword((existing as any).password ?? null);
        setExpirationDate((existing as any).expirationDate ?? (existing as any).expirationdate ?? null);
        setScanLimit((existing as any).scanLimit ?? (existing as any).scanlimit ?? null);
        message.info('Loaded QR code for editing');
        return;
      }

      try {
        const res = await qrCodeAPI.getOne(id);
        const q: any = res.qrCode;
        if (q) {
          setTemplate(q.template ?? null);
          setStyling(q.styling ?? defaultStyling);
          setType(q.type ?? 'url');
          setContent(q.content ?? 'https://example.com');
          setName(q.name ?? '');
          setPassword(q.password ?? null);
          setExpirationDate(q.expirationDate ?? q.expirationdate ?? null);
          setScanLimit(q.scanLimit ?? q.scanlimit ?? null);
          message.info('Loaded QR code for editing');
        }
      } catch (err) {
        console.error('Failed to load QR for edit:', err);
        message.error('Failed to load QR for editing');
      }
    };

    loadForEdit();
  }, [id, getQRCode]);

  const handleNext = useCallback(() => {
    if (currentStep === CONTENT_STEP) {
      if (!name.trim()) {
        message.error('Please enter a QR code title');
        return;
      }
      if (!content.trim()) {
        message.error('Please fill in the required content fields');
        return;
      }
    }
    
    if (currentStep < LAST_STEP) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, name, content, setCurrentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      message.error('Please enter a name for your QR code');
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        name: name.trim(),
        type,
        content,
        template: template || null,
        styling,
        password: password || null,
        expirationDate: expirationDate || null,
        scanLimit: scanLimit || null,
      };

      if (type === 'image') {
        payload.previewImage = content || null;
      }

      if (editingId) {
        await updateQRCode(editingId, payload);
        message.success('QR Code updated');
      } else {
        await saveQRCode(payload);
        message.success('QR Code saved!');
      }
      navigate('/dashboard');
    } catch (err) {
      // error handled in hook
    } finally {
      setSaving(false);
    }
  }, [name, type, content, template, styling, password, expirationDate, scanLimit, editingId, updateQRCode, saveQRCode, navigate]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <QRTypeSelector selectedType={type} onSelect={setType} />;
      case 1:
        return (
          <ContentEditor
            type={type}
            content={content}
            name={name}
            onNameChange={setName}
            onContentChange={setContent}
          />
        );
      case 2:
        return <QRDesignTemplates styling={styling} onStyleChange={handleStyleChange} />;
      case 3:
        return <QRStyleEditor styling={styling} onStyleChange={handleStyleChange} />;
      case 4:
        return <TemplateSelector selectedTemplate={template} onSelect={setTemplate} />;
      case 5:
        return (
          <AdvancedSettings
            password={password}
            onPasswordChange={setPassword}
            expirationDate={expirationDate}
            onExpirationChange={setExpirationDate}
            scanLimit={scanLimit}
            onScanLimitChange={setScanLimit}
          />
        );
      default:
        return null;
    }
  };

  const step = CREATE_STEPS[currentStep];
  const editing = Boolean(editingId);

  return (
    <>
      <div className="pb-24 lg:pb-0">
        <CreateHeader
          name={name}
          editing={editing}
          current={currentStep}
          canJump={canJump}
          onJump={goToStep}
          canUndo={canUndo}
          onUndo={handleUndo}
          canSave={canSave}
          saving={saving}
          onSave={handleSave}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <section className="flex min-w-0 flex-col lg:min-h-[calc(100dvh-184px)] xl:min-h-[calc(100dvh-140px)]">
            <div key={step.key} className="create-step-enter">
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  Step {currentStep + 1} of {CREATE_STEPS.length}
                </div>
                <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-[32px]">{step.title}</h1>
                <p className="mt-1.5 max-w-xl text-[15px] text-muted-foreground">{step.lede}</p>
              </div>

              <div className="create-glass rounded-[28px] p-4 sm:p-6">{renderStepContent()}</div>
            </div>

            <StepFooter
              current={currentStep}
              editing={editing}
              canSave={canSave}
              saving={saving}
              onPrev={handlePrev}
              onNext={handleNext}
              onSave={handleSave}
            />
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-24 xl:top-[88px]">
              <PreviewCanvas
                previewRef={previewRef}
                content={content}
                template={template}
                styling={styling}
                type={type}
                qrId={editingId || undefined}
                onTemplateChange={setTemplate}
                onEditCard={() => setShowTemplateEditor(true)}
              />
            </div>
          </aside>
        </div>

        <MobileCreateBar
          isFirst={currentStep === 0}
          isLast={currentStep === LAST_STEP}
          saving={saving}
          onPrev={handlePrev}
          onNext={handleNext}
          onSave={handleSave}
          onPreview={() => setShowPreviewDrawer(true)}
        />

        <PreviewSheet
          opened={showPreviewDrawer}
          onClose={() => setShowPreviewDrawer(false)}
          content={content}
          template={template}
          styling={styling}
          type={type}
          qrId={editingId || undefined}
          onTemplateChange={setTemplate}
          onEditCard={() => setShowTemplateEditor(true)}
        />

        <TemplateEditorModal
          open={showTemplateEditor}
          onClose={() => setShowTemplateEditor(false)}
          template={template}
          onTemplateChange={setTemplate}
          content={content}
          styling={styling}
          qrId={editingId || undefined}
          qrType={type}
        />
      </div>
    </>
  );
};

export default CreateQR;
