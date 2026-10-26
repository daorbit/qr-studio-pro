import React from 'react';
import { Group, PinInput } from '@mantine/core';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, onChange, value = '', disabled = false, loading = false }) => (
  <Group justify="center">
    <PinInput
      length={length}
      type="number"
      oneTimeCode
      size="lg"
      radius="md"
      gap="sm"
      value={value}
      onChange={(next) => onChange?.(next)}
      onComplete={(next) => onComplete?.(next)}
      disabled={disabled || loading}
      aria-label="Verification code"
    />
  </Group>
);

export default OTPInput;
