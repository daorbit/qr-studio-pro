import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Button, FileButton, Select, TextInput } from '@mantine/core';
import { Camera, Globe2, Trash2, UserRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { authAPI } from '@/lib/api';
import { confirmAction, errorMessage, message } from '@/lib/notify';
import SettingsCard from '@/components/common/SettingsCard';
import AvatarCropModal from '@/components/common/AvatarCropModal';
import { LANGUAGES, TIMEZONES, TIME_FORMATS } from './profileOptions';

const MAX_PHOTO_MB = 3;

interface ProfileFields {
  name: string;
  mobile: string;
  country: string;
  city: string;
  language: string;
  timezone: string;
  timeFormat: string;
}

const ProfileInfo: React.FC = () => {
  const { user, updateUser } = useAuth();
  const initial = useMemo<ProfileFields>(
    () => ({
      name: user?.name || '',
      mobile: user?.mobile || '',
      country: user?.country || '',
      city: user?.city || '',
      language: user?.language || 'en',
      timezone: user?.timezone || 'UTC',
      timeFormat: user?.timeFormat || '12',
    }),
    [user]
  );
  const [fields, setFields] = useState<ProfileFields>(initial);
  const [saving, setSaving] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  useEffect(() => setFields(initial), [initial]);

  if (!user) return null;

  const dirty = (Object.keys(fields) as (keyof ProfileFields)[]).some((k) => fields[k] !== initial[k]);
  const set = (key: keyof ProfileFields) => (value: string | null) => setFields((prev) => ({ ...prev, [key]: value ?? '' }));

  const submitProfile = async (values: ProfileFields, picture?: File | '') => {
    const formData = new FormData();
    (Object.keys(values) as (keyof ProfileFields)[]).forEach((key) => formData.append(key, values[key]));
    if (picture !== undefined) formData.append('profilePicture', picture);
    const response = await authAPI.updateProfile(formData);
    if (response.success) updateUser(response.user);
    return response.success;
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name.trim()) {
      message.error('Please enter your name');
      return;
    }
    setSaving(true);
    try {
      if (await submitProfile({ ...fields, name: fields.name.trim() })) message.success('Profile updated');
    } catch (error) {
      message.error(errorMessage(error, 'Failed to update profile'));
    } finally {
      setSaving(false);
    }
  };

  const pickPhoto = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      message.error('Please choose an image file');
      return;
    }
    if (file.size / 1024 / 1024 >= MAX_PHOTO_MB) {
      message.error(`Images must be smaller than ${MAX_PHOTO_MB}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const savePhoto = async (picture: File | '') => {
    setPhotoBusy(true);
    try {
      if (await submitProfile(initial, picture)) {
        message.success(picture ? 'Photo updated' : 'Photo removed');
        setCropSrc(null);
      }
    } catch (error) {
      message.error(errorMessage(error, 'Failed to update photo'));
    } finally {
      setPhotoBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <SettingsCard icon={Camera} title="Photo" description="Shown to teammates in members lists and on shared items.">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar src={user.profilePicture} name={user.name} color="initials" size={72} radius="xl" />
          <div className="flex flex-wrap gap-2">
            <FileButton onChange={pickPhoto} accept="image/*">
              {(props) => (
                <Button {...props} variant="default" leftSection={<Camera size={15} />} loading={photoBusy && !cropSrc}>
                  {user.profilePicture ? 'Change photo' : 'Upload photo'}
                </Button>
              )}
            </FileButton>
            {user.profilePicture && (
              <Button
                variant="subtle"
                color="red"
                leftSection={<Trash2 size={15} />}
                onClick={() =>
                  confirmAction({ title: 'Remove your photo?', confirmLabel: 'Remove', danger: true, onConfirm: () => savePhoto('') })
                }
              >
                Remove
              </Button>
            )}
          </div>
          <p className="w-full text-xs text-muted-foreground sm:w-auto">JPG or PNG, up to {MAX_PHOTO_MB}MB.</p>
        </div>
      </SettingsCard>

      <form onSubmit={save} className="space-y-5">
        <SettingsCard icon={UserRound} title="Personal details" description="Your name and how to reach you.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput label="Full name" withAsterisk value={fields.name} onChange={(e) => set('name')(e.currentTarget.value)} />
            <TextInput label="Email" value={user.email} disabled description="Contact support to change it." />
            <TextInput label="Mobile number" value={fields.mobile} onChange={(e) => set('mobile')(e.currentTarget.value)} />
            <TextInput label="Country" value={fields.country} onChange={(e) => set('country')(e.currentTarget.value)} />
            <TextInput label="City" value={fields.city} onChange={(e) => set('city')(e.currentTarget.value)} />
          </div>
        </SettingsCard>

        <SettingsCard icon={Globe2} title="Language and region" description="Used for dates, times and analytics.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select label="Language" data={LANGUAGES} value={fields.language} onChange={set('language')} allowDeselect={false} />
            <Select label="Timezone" data={TIMEZONES} value={fields.timezone} onChange={set('timezone')} searchable allowDeselect={false} />
            <Select label="Time format" data={TIME_FORMATS} value={fields.timeFormat} onChange={set('timeFormat')} allowDeselect={false} />
          </div>
        </SettingsCard>

        {dirty && (
          <div className="sticky bottom-4 z-10">
            <div className="create-glass flex items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5">
              <span className="text-[13px] font-medium text-foreground">You have unsaved changes</span>
              <div className="flex gap-2">
                <Button variant="subtle" color="gray" onClick={() => setFields(initial)}>
                  Discard
                </Button>
                <Button type="submit" loading={saving}>
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>

      <AvatarCropModal image={cropSrc} busy={photoBusy} onCancel={() => setCropSrc(null)} onConfirm={(file) => savePhoto(file)} />
    </div>
  );
};

export default ProfileInfo;
