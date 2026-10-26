import React, { useState } from "react";
import { Button, PasswordInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import { authAPI } from "@/lib/api";
import { errorMessage, message } from "@/lib/notify";
import SettingsCard from "@/components/common/SettingsCard";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";

const MIN_LENGTH = 8;
const EMPTY = { currentPassword: "", newPassword: "", confirmPassword: "" };

const SecuritySettings: React.FC = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<typeof EMPTY>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.currentTarget.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<typeof EMPTY> = {};
    if (!values.currentPassword) next.currentPassword = "Enter your current password";
    if (values.newPassword.length < MIN_LENGTH) next.newPassword = `Use at least ${MIN_LENGTH} characters`;
    if (values.confirmPassword !== values.newPassword) next.confirmPassword = "Passwords don't match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      message.success("Password changed");
      setValues(EMPTY);
    } catch (error) {
      message.error(errorMessage(error, "Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard icon={KeyRound} title="Password" description="Use at least 8 characters with a mix of letters, numbers and symbols.">
      <form onSubmit={submit} className="max-w-md space-y-4" noValidate>
        <PasswordInput label="Current password" autoComplete="current-password" value={values.currentPassword} onChange={set("currentPassword")} error={errors.currentPassword} />
        <div>
          <PasswordInput label="New password" autoComplete="new-password" value={values.newPassword} onChange={set("newPassword")} error={errors.newPassword} />
          {values.newPassword && <PasswordStrengthIndicator password={values.newPassword} />}
        </div>
        <PasswordInput label="Confirm new password" autoComplete="new-password" value={values.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword} />
        <Button type="submit" loading={loading}>
          Update password
        </Button>
      </form>
    </SettingsCard>
  );
};

export default SecuritySettings;
