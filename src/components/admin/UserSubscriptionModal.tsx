import React, { useEffect, useState } from 'react';
import { Badge, Button, Divider, Group, Loader, Modal, Select, Table, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Crown, Calendar, User } from 'lucide-react';
import dayjs from 'dayjs';
import api from '@/lib/api';
import { message } from '@/lib/notify';
import { planColor, statusColor } from './adminColors';

interface UserSubscriptionModalProps {
  visible: boolean;
  onCancel: () => void;
  userId: string | null;
  userName: string;
  userEmail: string;
  onSuccess?: () => void;
}

interface UserSubscriptionData {
  user: {
    _id: string;
    name: string;
    email: string;
    subscriptionPlan: string;
    subscriptionStatus: string;
    isOnTrial: boolean;
  };
  subscription: {
    planType: keyof typeof planFeatures;
    status: string;
    startDate: string;
    endDate?: string;
    isTrialSubscription?: boolean;
    trialEndDate?: string;
  } | null;
}

const planOptions = [
  { value: 'free', label: 'Free Plan' },
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' },
  { value: 'trial', label: 'Trial Plan (Premium)' },
];

const planFeatures = {
  free: { maxQRCodes: 5, maxScansPerQR: 20 },
  basic: { maxQRCodes: 50, maxScansPerQR: 1000 },
  pro: { maxQRCodes: 200, maxScansPerQR: 10000 },
  enterprise: { maxQRCodes: -1, maxScansPerQR: -1 },
  trial: { maxQRCodes: -1, maxScansPerQR: -1 },
};

const formatLimit = (value: number) => (value === -1 ? 'Unlimited' : value.toLocaleString());

const UserSubscriptionModal: React.FC<UserSubscriptionModalProps> = ({
  visible,
  onCancel,
  userId,
  userName,
  userEmail,
  onSuccess,
}) => {
  const [planType, setPlanType] = useState<string>('free');
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [currentData, setCurrentData] = useState<UserSubscriptionData | null>(null);

  useEffect(() => {
    if (visible && userId) {
      fetchCurrentSubscription();
    }
  }, [visible, userId]);

  const fetchCurrentSubscription = async () => {
    setDataLoading(true);
    try {
      const { data } = await api.get(`/admin/users/${userId}/subscription`);

      if (data?.success) {
        setCurrentData(data.data);
        setPlanType(data.data.subscription?.planType ?? 'free');
        setEndDate(
          data.data.subscription?.endDate ? dayjs(data.data.subscription.endDate).format('YYYY-MM-DD') : null
        );
      }
    } catch (err) {
      message.error('Failed to fetch subscription data');
    } finally {
      setDataLoading(false);
    }
  };

  const handleCancel = () => {
    setPlanType('free');
    setEndDate(null);
    setCurrentData(null);
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const payload = {
        planType,
        endDate: planType !== 'free' && endDate ? dayjs(endDate).toISOString() : null,
      };

      const { data } = await api.put(`/admin/users/${userId}/subscription`, payload);

      if (data?.success) {
        message.success('Subscription updated successfully');
        onSuccess?.();
        handleCancel();
      } else {
        message.error(data?.message || 'Update failed');
      }
    } catch {
      message.error('Failed to update subscription');
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentSubscription = () => {
    if (!currentData?.subscription) {
      return (
        <div className="py-4 text-center">
          <Badge color="gray">No active subscription</Badge>
        </div>
      );
    }

    const { subscription, user } = currentData;
    const features = planFeatures[subscription.planType];

    return (
      <div className="mb-2">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <User size={14} /> Current Subscription
        </div>
        <Table variant="vertical" layout="fixed" withTableBorder>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w={140}>Plan</Table.Th>
              <Table.Td>
                <Group gap={4}>
                  <Badge color={planColor(subscription.planType)}>
                    {planOptions.find((p) => p.value === subscription.planType)?.label}
                  </Badge>
                  {user.isOnTrial && <Badge color={planColor('trial')}>Trial</Badge>}
                </Group>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Status</Table.Th>
              <Table.Td>
                <Badge color={statusColor(subscription.status)} tt="capitalize">{subscription.status}</Badge>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Limits</Table.Th>
              <Table.Td>
                <div>QR Codes: {formatLimit(features.maxQRCodes)}</div>
                <div>Scans per QR: {formatLimit(features.maxScansPerQR)}</div>
              </Table.Td>
            </Table.Tr>
            {subscription.endDate && (
              <Table.Tr>
                <Table.Th>End Date</Table.Th>
                <Table.Td>{dayjs(subscription.endDate).format('MMMM D, YYYY')}</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
    );
  };

  return (
    <Modal
      opened={visible}
      onClose={handleCancel}
      size={600}
      title={
        <Group gap="xs">
          <Crown size={16} />
          <span>Manage Subscription – {userName}</span>
        </Group>
      }
    >
      {dataLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="sm" />
        </div>
      ) : (
        <>
          <Text fw={600} mb="md">{userEmail}</Text>

          {renderCurrentSubscription()}

          <Divider label="Update Subscription" labelPosition="center" my="lg" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Plan Type"
              data={planOptions}
              value={planType}
              onChange={(value) => setPlanType(value ?? 'free')}
              allowDeselect={false}
              renderOption={({ option }) => <Badge color={planColor(option.value)}>{option.label}</Badge>}
            />

            {planType !== 'free' && (
              <DatePickerInput
                label="End Date (Optional)"
                placeholder="Pick a date"
                value={endDate}
                onChange={setEndDate}
                minDate={dayjs().format('YYYY-MM-DD')}
                leftSection={<Calendar size={16} />}
                clearable
              />
            )}

            <Group justify="flex-end" gap="sm" pt="sm">
              <Button variant="default" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" loading={loading}>
                Update Subscription
              </Button>
            </Group>
          </form>
        </>
      )}
    </Modal>
  );
};

export default UserSubscriptionModal;
