import React, { useState } from "react";
import { Button, Modal, ScrollArea, SegmentedControl } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import { QRTemplate, QRStyling, defaultStyling, QRType } from "../../types/qrcode";
import QRCodePreview from "./QRCodePreview";
import { useIsMobile } from "@/hooks/use-mobile";
import CardContentPanel from "./card-editor/CardContentPanel";
import CardStylePanel from "./card-editor/CardStylePanel";
import CardLayoutPanel from "./card-editor/CardLayoutPanel";

interface TemplateEditorModalProps {
  open: boolean;
  onClose: () => void;
  template: QRTemplate | null;
  onTemplateChange: (template: QRTemplate) => void;
  content?: string;
  styling?: QRStyling;
  qrId?: string;
  qrType?: QRType;
}

const SECTIONS = [
  { value: "content", label: "Content", Panel: CardContentPanel },
  { value: "style", label: "Style", Panel: CardStylePanel },
  { value: "layout", label: "Layout", Panel: CardLayoutPanel },
];

const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({
  open,
  onClose,
  template,
  onTemplateChange,
  content = "https://example.com",
  styling = defaultStyling,
  qrId,
  qrType = "url",
}) => {
  const isMobile = useIsMobile();
  const [section, setSection] = useState(SECTIONS[0].value);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  if (!template) return null;

  const Panel = SECTIONS.find((s) => s.value === section)?.Panel ?? CardContentPanel;

  const preview = (
    <QRCodePreview content={content} template={template} styling={styling} editable={false} qrId={qrId} qrType={qrType} />
  );

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Edit card"
      size={1040}
      fullScreen={isMobile}
      padding={0}
      classNames={{ header: "border-b border-border px-5", body: "p-0" }}
    >
      <div className="flex flex-col lg:h-[640px] lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="space-y-3 px-5 pt-4">
            <SegmentedControl fullWidth data={SECTIONS.map(({ value, label }) => ({ value, label }))} value={section} onChange={setSection} />
            {isMobile && (
              <Button
                fullWidth
                variant="default"
                leftSection={showMobilePreview ? <EyeOff size={14} /> : <Eye size={14} />}
                onClick={() => setShowMobilePreview((v) => !v)}
              >
                {showMobilePreview ? "Hide preview" : "Show preview"}
              </Button>
            )}
          </div>

          {isMobile && showMobilePreview && (
            <div className="create-stage mx-5 mt-3 flex justify-center overflow-hidden rounded-2xl py-4">
              <div className="origin-top scale-[0.6]">{preview}</div>
            </div>
          )}

          <ScrollArea className="flex-1" type="auto">
            <div key={section} className="create-step-enter px-5 py-5">
              <Panel template={template} onTemplateChange={onTemplateChange} />
            </div>
          </ScrollArea>

          <div className="flex justify-end border-t border-border px-5 py-3">
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>

        <div className="create-stage hidden w-[400px] shrink-0 flex-col items-center justify-center overflow-hidden border-l border-border lg:flex">
          <div className="origin-center scale-[0.85]">{preview}</div>
          <div className="create-glass mt-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            {styling.size}px{styling.includeMargin ? " · quiet zone" : ""}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateEditorModal;
