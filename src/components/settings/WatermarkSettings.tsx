import React, { useState } from 'react';
import { Button, Switch, TextInput } from '@mantine/core';
import { Droplets, Eye } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { useWorkspace } from '@/hooks/useWorkspace';
import { errorMessage, message } from '@/lib/notify';
import SettingsCard from '@/components/common/SettingsCard';
import SettingRow from '@/components/common/SettingRow';
import UpgradeNotice from '@/components/common/UpgradeNotice';

const MAX_LENGTH = 30;

const WatermarkSettings: React.FC = () => {
  const { workspace, canManage, updateWorkspace } = useWorkspace();
  const { hasFeatureAccess } = usePayment();
  const [saving, setSaving] = useState(false);
  const [removeWatermark, setRemoveWatermark] = useState(workspace?.removeWatermark || false);
  const [watermarkText, setWatermarkText] = useState(workspace?.watermarkText || 'QR Studio');

  const entitled = hasFeatureAccess('removeWatermark');
  const editable = entitled && canManage;
  const dirty = removeWatermark !== (workspace?.removeWatermark || false) || watermarkText.trim() !== (workspace?.watermarkText || 'QR Studio');
  const showsWatermark = !(removeWatermark && entitled);

  const save = async () => {
    setSaving(true);
    try {
      await updateWorkspace({ removeWatermark, watermarkText: watermarkText.trim() });
      message.success('Watermark settings saved');
    } catch (error) {
      message.error(errorMessage(error, 'Failed to save settings'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {!entitled && <UpgradeNotice description="Upgrade to remove the watermark or replace it with your own brand." />}

      <SettingsCard
        icon={Droplets}
        title="Watermark"
        description="A small line of text added to every QR code you download from this workspace."
        action={
          editable && (
            <Button size="xs" onClick={save} loading={saving} disabled={!dirty}>
              Save
            </Button>
          )
        }
      >
        <div className="space-y-5">
          <SettingRow title="Remove watermark" description="Download clean codes with no attribution." disabled={!editable}>
            <Switch checked={removeWatermark && entitled} onChange={(e) => setRemoveWatermark(e.currentTarget.checked)} disabled={!editable} aria-label="Remove watermark" />
          </SettingRow>

          <TextInput
            label="Watermark text"
            description="Your brand name or website works well."
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.currentTarget.value)}
            maxLength={MAX_LENGTH}
            disabled={!editable || !showsWatermark}
            rightSection={<span className="pr-2 text-[11px] tabular-nums text-muted-foreground">{watermarkText.length}/{MAX_LENGTH}</span>}
            rightSectionWidth={52}
          />
        </div>
      </SettingsCard>

      <SettingsCard icon={Eye} title="Preview" description={showsWatermark ? `“${watermarkText || ' '}” appears in the corner of each code.` : 'Your codes download without a watermark.'}>
        <div className="create-stage flex justify-center rounded-xl py-8">
          <div className="relative rounded-2xl bg-white p-4 shadow-card">
            <div className="grid h-24 w-24 grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className={(i * 7) % 3 === 0 ? 'rounded-[2px] bg-zinc-900' : 'rounded-[2px] bg-zinc-200'} />
              ))}
            </div>
            {showsWatermark && watermarkText && <span className="absolute bottom-1 right-2 text-[8px] text-zinc-500">{watermarkText}</span>}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default WatermarkSettings;
