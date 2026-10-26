import React from 'react';
import { Badge, Loader, Pagination } from '@mantine/core';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import { useIsMobile } from '@/hooks/use-mobile';
import type { AdminPayment } from '@/store/slices/adminSlice';
import { formatCurrencyIntl } from '@/utils/currencyFormatter';
import DataTable, { type DataColumn } from '@/components/common/DataTable';
import AdminUserCell from '../AdminUserCell';
import { planColor, statusColor } from '../adminColors';

interface PaymentTableProps {
  payments: AdminPayment[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onTableChange: (page: number, limit: number) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
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
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader size="sm" />
          </div>
        ) : payments.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">No payments found</div>
        ) : (
          payments.map((payment) => (
            <div key={payment._id} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <AdminUserCell user={payment.userId} />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatCurrencyIntl(payment.amount, payment.currency)}</div>
                  <Badge color={statusColor(payment.status)} tt="capitalize" className="mt-1">
                    {payment.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                <div className="flex items-center gap-2">
                  <Badge color={planColor(payment.planType)} tt="capitalize">{payment.planType}</Badge>
                  <span className="text-xs text-muted-foreground">{payment.planDuration}mo</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatter.format(payment.createdAt, { dateStyle: 'medium' })}
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

  const columns: DataColumn<AdminPayment>[] = [
    {
      key: 'user',
      title: 'User',
      render: (_, record) => <AdminUserCell user={record.userId} />,
    },
    {
      key: 'orderId',
      title: 'Order ID',
      dataIndex: 'orderId',
      render: (orderId) => <span className="font-mono text-xs">{orderId as string}</span>,
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount, record) => formatCurrencyIntl(amount as number, record.currency),
    },
    {
      key: 'planType',
      title: 'Plan',
      dataIndex: 'planType',
      render: (planType, record) => (
        <div>
          <Badge color={planColor(planType as string)} tt="capitalize">{planType as string}</Badge>
          <div className="mt-1 text-xs text-muted-foreground">{record.planDuration} months</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Badge color={statusColor(status as string)} tt="capitalize">{status as string}</Badge>,
    },
    {
      key: 'paymentId',
      title: 'Payment ID',
      dataIndex: 'paymentId',
      render: (paymentId) =>
        paymentId ? (
          <span className="font-mono text-xs">{paymentId as string}</span>
        ) : (
          <span className="text-muted-foreground">Pending</span>
        ),
    },
    {
      key: 'createdAt',
      title: 'Created',
      dataIndex: 'createdAt',
      render: (date) => formatter.format(date as string, { dateStyle: 'medium' }),
    },
  ];

  return (
    <DataTable<AdminPayment>
      rowKey="_id"
      data={payments}
      columns={columns}
      loading={loading}
      minWidth={1000}
      emptyText="No payments found"
      pagination={{ current: page, pageSize: limit, total, onChange: onTableChange }}
    />
  );
};

export default PaymentTable;
