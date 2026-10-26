import React, { useState } from "react";
import { Button, Switch, TextInput } from "@mantine/core";
import { Eye, Tag } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { useWorkspace } from "@/hooks/useWorkspace";
import type { WhiteLabelConfig } from "@/context/authTypes";
import { errorMessage, message } from "@/lib/notify";
import SettingsCard from "@/components/common/SettingsCard";
import SettingRow from "@/components/common/SettingRow";
import UpgradeNotice from "@/components/common/UpgradeNotice";
import ColorField from "@/components/create/ColorField";

const WhiteLabelSettings: React.FC = () => {
  const { workspace, canManage, updateWorkspace } = useWorkspace();
  const { hasFeatureAccess } = usePayment();
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<WhiteLabelConfig>({
    enabled: workspace?.whiteLabel?.enabled || false,
    brandName: workspace?.whiteLabel?.brandName || "",
    primaryColor: workspace?.whiteLabel?.primaryColor || "#f97316",
    loadingText: workspace?.whiteLabel?.loadingText || "",
    showPoweredBy: workspace?.whiteLabel?.showPoweredBy ?? true,
  });

  const entitled = hasFeatureAccess("whiteLabel");
  const editable = entitled && canManage;
  const fieldsEnabled = editable && config.enabled;
  const accent = config.enabled ? config.primaryColor : "hsl(var(--primary))";
  const update = (patch: Partial<WhiteLabelConfig>) => setConfig((prev) => ({ ...prev, ...patch }));

  const save = async () => {
    setSaving(true);
    try {
      await updateWorkspace({ whiteLabel: config });
      message.success("White-label settings saved");
    } catch (error) {
      message.error(errorMessage(error, "Failed to save settings"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {!entitled && <UpgradeNotice description="Upgrade to put your own brand on the page people see after scanning." />}

      <SettingsCard
        icon={Tag}
        title="White-label redirect page"
        description="The short page people see while a scanned code takes them to its destination."
        action={
          editable && (
            <Button size="xs" onClick={save} loading={saving}>
              Save
            </Button>
          )
        }
      >
        <div className="space-y-5">
          <SettingRow title="Use my branding" description="Replace QR Studio branding on every redirect page." disabled={!editable}>
            <Switch checked={config.enabled && entitled} onChange={(e) => update({ enabled: e.currentTarget.checked })} disabled={!editable} aria-label="Use my branding" />
          </SettingRow>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              label="Brand name"
              placeholder="Your company"
              maxLength={50}
              value={config.brandName}
              onChange={(e) => update({ brandName: e.currentTarget.value })}
              disabled={!fieldsEnabled}
            />
            <div className={fieldsEnabled ? "" : "pointer-events-none opacity-60"}>
              <ColorField label="Accent color" value={config.primaryColor} onChange={(primaryColor) => update({ primaryColor })} />
            </div>
            <TextInput
              label="Loading message"
              placeholder="Taking you there…"
              description="Leave empty to use the default."
              maxLength={50}
              value={config.loadingText}
              onChange={(e) => update({ loadingText: e.currentTarget.value })}
              disabled={!fieldsEnabled}
              className="sm:col-span-2"
            />
          </div>

          <SettingRow title="Show “Powered by QR Studio”" description="A small line at the bottom of the page." disabled={!fieldsEnabled}>
            <Switch checked={config.showPoweredBy} onChange={(e) => update({ showPoweredBy: e.currentTarget.checked })} disabled={!fieldsEnabled} aria-label="Show powered by" />
          </SettingRow>
        </div>
      </SettingsCard>

      <SettingsCard icon={Eye} title="Preview" description={config.enabled ? "What people see after scanning." : "Turn on your branding to customise this page."}>
        <div className="create-stage flex justify-center rounded-xl py-10">
          <div className="flex w-64 flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-card">
            <span className="h-11 w-11 animate-spin rounded-full border-4 border-muted" style={{ borderTopColor: accent }} />
            <span className="mt-4 text-base font-semibold text-foreground">{config.enabled && config.brandName ? config.brandName : "Loading…"}</span>
            <span className="mt-0.5 text-xs text-muted-foreground">{config.enabled && config.loadingText ? config.loadingText : "Please wait…"}</span>
            {(!config.enabled || config.showPoweredBy) && <span className="mt-5 text-[11px] text-muted-foreground/70">Powered by QR Studio</span>}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default WhiteLabelSettings;
