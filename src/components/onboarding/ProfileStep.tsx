import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from '@/components/auth/AuthHeader';

const ProfileStep: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = name.trim();
    if (!value) {
      message.error('Tell us your name');
      return;
    }
    if (value === user?.name) {
      onDone();
      return;
    }

    setSaving(true);
    try {
      const response = await authAPI.updateProfile({ name: value });
      updateUser({ name: response.user?.name ?? value });
      onDone();
    } catch {
      message.error('Could not save your name');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <AuthHeader title={`Welcome${user?.name ? `, ${user.name.split(' ')[0]}` : ''}`} subtitle="Let's set up QR Studio. First, how should teammates see you?" />
      <div>
        <label htmlFor="onb-name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
          Your name
        </label>
        <Input id="onb-name" autoFocus autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Button type="primary" htmlType="submit" loading={saving} block>
        Continue
      </Button>
    </form>
  );
};

export default ProfileStep;
