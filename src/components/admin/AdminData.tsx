import React, { memo } from "react";
import { Tabs, Title } from "@mantine/core";
import { Users, CreditCard, RefreshCw, DollarSign } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminUsersTab from "./AdminUsersTab";
import AdminSubscriptions from "./AdminSubscriptions";
import AdminAuditLogsTab from "./AdminAuditLogsTab";
import AdminPlanPricingTab from "./AdminPlanPricingTab";

const ADMIN_TABS = [
  { value: 'users', path: '/admin/users', label: 'Users & QR Codes', icon: Users, Panel: AdminUsersTab },
  { value: 'subscriptions', path: '/admin/subscriptions', label: 'Subscriptions & Payments', icon: CreditCard, Panel: AdminSubscriptions },
  { value: 'audit-logs', path: '/admin/audit-logs', label: 'Audit Logs', icon: RefreshCw, Panel: AdminAuditLogsTab },
  { value: 'plan-pricing', path: '/admin/plan-pricing', label: 'Plan Pricing', icon: DollarSign, Panel: AdminPlanPricingTab },
];

const AdminData: React.FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = ADMIN_TABS.find((tab) => tab.path === location.pathname)?.value ?? ADMIN_TABS[0].value;

  const handleTabChange = (value: string | null) => {
    const tab = ADMIN_TABS.find((t) => t.value === value);
    if (tab) navigate(tab.path);
  };

  return (
    <div>
      <Title order={2} className="mb-6">Admin Dashboard</Title>

      <Tabs value={activeTab} onChange={handleTabChange} keepMounted={false}>
        <Tabs.List className="mb-5 flex-nowrap overflow-x-auto">
          {ADMIN_TABS.map(({ value, label, icon: Icon }) => (
            <Tabs.Tab key={value} value={value} leftSection={<Icon size={16} />} className="shrink-0">
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {ADMIN_TABS.map(({ value, Panel }) => (
          <Tabs.Panel key={value} value={value}>
            <Panel />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
});

AdminData.displayName = 'AdminData';

export default AdminData;
