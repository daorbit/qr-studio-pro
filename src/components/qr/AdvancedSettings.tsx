import React from 'react';
import { NumberInput, PasswordInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { CalendarClock, Lock, ScanLine, type LucideIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { usePayment } from '@/hooks/usePayment';
import { cn } from '@/lib/utils';
import UpgradeNotice from '@/components/common/UpgradeNotice';

interface AdvancedSettingsProps {
  password?: string | null;
  onPasswordChange: (v: string | null) => void;
  expirationDate?: string | null;
  onExpirationChange: (v: string | null) => void;
  scanLimit?: number | null;
  onScanLimitChange: (v: number | null) => void;
}

const SettingRow: React.FC<{ icon: LucideIcon; title: string; description: string; children: React.ReactNode }> = ({
  icon: Icon,
  title,
  description,
  children,
}) => (
  <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-6">
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <div className="text-[13.5px] font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
    <div className="sm:w-64">{children}</div>
  </div>
);

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  password,
  onPasswordChange,
  expirationDate,
  onExpirationChange,
  scanLimit,
  onScanLimitChange,
}) => {
  const { subscription } = usePayment();
  const canUse = Boolean(subscription?.planType && subscription.planType !== 'free');

  return (
    <div className="space-y-5">
      {!canUse && <UpgradeNotice description="Upgrade to add passwords, expiry dates and custom scan limits." />}

      <div className={cn('divide-y divide-border', !canUse && 'pointer-events-none opacity-50')}>
        <SettingRow icon={Lock} title="Password" description="People must enter it before the link opens.">
          <PasswordInput
            placeholder="No password"
            value={password || ''}
            onChange={(e) => onPasswordChange(e.currentTarget.value || null)}
            disabled={!canUse}
          />
        </SettingRow>

        <SettingRow icon={CalendarClock} title="Expiry date" description="The code stops working after this moment.">
          <DateTimePicker
            placeholder="Never expires"
            value={expirationDate ? dayjs(expirationDate).format('YYYY-MM-DD HH:mm:ss') : null}
            onChange={(value) => onExpirationChange(value ? dayjs(value).toISOString() : null)}
            minDate={dayjs().format('YYYY-MM-DD')}
            clearable
            disabled={!canUse}
          />
        </SettingRow>

        <SettingRow
          icon={ScanLine}
          title="Scan limit"
          description={canUse ? 'Leave empty for unlimited scans.' : 'The free plan allows 20 scans per code.'}
        >
          <NumberInput
            min={1}
            allowDecimal={false}
            allowNegative={false}
            placeholder="Unlimited"
            value={scanLimit ?? ''}
            onChange={(value) => onScanLimitChange(value === '' ? null : Number(value))}
            disabled={!canUse}
          />
        </SettingRow>
      </div>
    </div>
  );
};

export default AdvancedSettings;
