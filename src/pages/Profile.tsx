import React from 'react';
import { Tabs } from '@mantine/core';
import { Crown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { usePayment } from '@/hooks/usePayment';
import { SETTINGS_SECTIONS } from './settings/settingsSections';

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasFeatureAccess } = usePayment();
  const requested = location.pathname.split('/')[2];
  const section = SETTINGS_SECTIONS.find((s) => s.id === requested) ?? SETTINGS_SECTIONS[0];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Settings" description="Your profile, how QR Studio looks, your branding, and how your account is protected." />

      <Tabs value={section.id} onChange={(id) => id && navigate(`/settings/${id}`, { replace: true })} keepMounted={false}>
        <Tabs.List className="mb-6 flex-nowrap overflow-x-auto scrollbar-hide">
          {SETTINGS_SECTIONS.map(({ id, label, icon: Icon, premium }) => (
            <Tabs.Tab
              key={id}
              value={id}
              leftSection={<Icon size={15} />}
              rightSection={premium && !hasFeatureAccess(premium) ? <Crown size={12} className="text-amber-500" /> : undefined}
              className="shrink-0"
            >
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {SETTINGS_SECTIONS.map(({ id, description, Panel }) => (
          <Tabs.Panel key={id} value={id}>
            <div className="max-w-[920px]">
              <p className="mb-5 text-sm text-muted-foreground">{description}</p>
              <Panel />
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default Profile;
