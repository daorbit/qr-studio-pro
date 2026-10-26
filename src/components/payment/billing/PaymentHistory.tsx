import React, { useEffect } from 'react';
import { Button } from '@mantine/core';
import { Download } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import type { PaymentHistory as PaymentRecord } from '@/types/payment';
import { formatCurrency } from '@/utils/currencyFormatter';
import { cn } from '@/lib/utils';
import DataTable, { type DataColumn } from '@/components/common/DataTable';

const STATUS: Record<PaymentRecord['status'], { label: string; tone: string }> = {
  paid: { label: 'Paid', tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  created: { label: 'Pending', tone: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
  failed: { label: 'Failed', tone: 'bg-destructive/10 text-destructive' },
  refunded: { label: 'Refunded', tone: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
};

const PaymentHistory: React.FC = () => {
  const formatter = useDateFormatter();
  const { paymentHistory, loading, fetchPaymentHistory, downloadInvoice } = usePayment();

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  const columns: DataColumn<PaymentRecord>[] = [
    {
      key: 'createdAt',
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date) => <span className="tabular-nums">{formatter.format(date as string, { dateStyle: 'medium' })}</span>,
    },
    {
      key: 'planType',
      title: 'Plan',
      render: (_, r) => (
        <span className="capitalize text-foreground">
          {r.planType}
          <span className="ml-1.5 text-xs normal-case text-muted-foreground">{r.planDuration === 12 ? 'yearly' : 'monthly'}</span>
        </span>
      ),
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => <span className="font-semibold tabular-nums text-foreground">{formatCurrency(amount as number)}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const meta = STATUS[status as PaymentRecord['status']] ?? { label: String(status), tone: 'bg-foreground/[0.06] text-muted-foreground' };
        return <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', meta.tone)}>{meta.label}</span>;
      },
    },
    {
      key: 'orderId',
      title: 'Order',
      dataIndex: 'orderId',
      render: (orderId) => <span className="font-mono text-xs text-muted-foreground">…{String(orderId).slice(-8)}</span>,
    },
    {
      key: 'invoice',
      title: '',
      align: 'right',
      render: (_, r) =>
        r.status === 'paid' ? (
          <Button size="xs" variant="subtle" color="gray" leftSection={<Download size={13} />} onClick={() => downloadInvoice(r._id)}>
            Invoice
          </Button>
        ) : null,
    },
  ];

  return (
    <DataTable<PaymentRecord>
      rowKey="_id"
      data={paymentHistory}
      columns={columns}
      loading={loading && paymentHistory.length === 0}
      emptyText="No payments yet. Your receipts will appear here."
      minWidth={680}
    />
  );
};

export default PaymentHistory;
