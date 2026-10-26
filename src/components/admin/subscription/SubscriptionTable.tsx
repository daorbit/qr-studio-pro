import React from 'react';
import { Badge, Loader, Pagination } from '@mantine/core';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import type { AdminSubscription } from '@/store/slices/adminSlice';
import { useIsMobile } from '@/hooks/use-mobile';
import DataTable, { type DataColumn } from '@/components/common/DataTable';
import AdminUserCell from '../AdminUserCell';
import { planColor, statusColor } from '../adminColors';

interface SubscriptionTableProps {
  subscriptions: AdminSubscription[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onTableChange: (page: number, limit: number) => void;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  loading,
  page,
  limit,
  total,
  onTableChange,
}) => {
  const formatter = useDateFormatter();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader size="sm" />
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">No subscriptions found</div>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub._id} className="rounded-xl border border-border bg-card p-3">
              <div className="mb-2">
                <AdminUserCell user={sub.userId} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color={planColor(sub.planType)} tt="capitalize">{sub.planType}</Badge>
                <Badge color={statusColor(sub.status)} tt="capitalize">{sub.status}</Badge>
                <span className="ml-auto text-xs text-muted-foreground">
                  {sub.startDate ? formatter.format(sub.startDate, { dateStyle: 'short' }) : 'N/A'}
                </span>
              </div>
            </div>
          ))
        )}
        {total > limit && (
          <div className="flex justify-center pt-2">
            <Pagination size="sm" total={Math.ceil(total / limit)} value={page} onChange={(p) => onTableChange(p, limit)} />
          </div>
        )}
      </div>
    );
  }

  const columns: DataColumn<AdminSubscription>[] = [
    {
      key: 'user',
      title: 'User',
      render: (_, record) => <AdminUserCell user={record.userId} />,
    },
    {
      key: 'planType',
      title: 'Plan',
      dataIndex: 'planType',
      render: (planType) => <Badge color={planColor(planType as string)} tt="capitalize">{planType as string}</Badge>,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Badge color={statusColor(status as string)} tt="capitalize">{status as string}</Badge>,
    },
  ];

  return (
    <DataTable<AdminSubscription>
      rowKey="_id"
      data={subscriptions}
      columns={columns}
      loading={loading}
      minWidth={480}
      emptyText="No subscriptions found"
      pagination={{ current: page, pageSize: limit, total, onChange: onTableChange }}
    />
  );
};

export default SubscriptionTable;
