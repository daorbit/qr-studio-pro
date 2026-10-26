import React from 'react';
import { ActionIcon, Badge, CopyButton, Group, Text, Tooltip } from '@mantine/core';
import { Check, Copy } from 'lucide-react';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import type { AdminQRCode } from '@/store/slices/adminSlice';
import DataTable, { type DataColumn } from '@/components/common/DataTable';

interface UserQRCodesTableProps {
  qrcodes: AdminQRCode[];
}

const UserQRCodesTable: React.FC<UserQRCodesTableProps> = ({ qrcodes }) => {
  const formatter = useDateFormatter();

  const columns: DataColumn<AdminQRCode>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'type', title: 'Type', dataIndex: 'type' },
    {
      key: 'content',
      title: 'Content',
      dataIndex: 'content',
      render: (content) => {
        const text = String(content ?? '');
        return (
          <Group gap={4} wrap="nowrap">
            <Text size="sm" truncate="end" maw={280}>{text}</Text>
            <CopyButton value={text}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'}>
                  <ActionIcon size="sm" onClick={copy} aria-label="Copy content">
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        );
      },
    },
    { key: 'scanCount', title: 'Scans', dataIndex: 'scanCount' },
    {
      key: 'createdAt',
      title: 'Created',
      dataIndex: 'createdAt',
      render: (value) => formatter.dateTime(value as string),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Badge color="gray">{(status as string) ?? '—'}</Badge>,
    },
  ];

  return <DataTable<AdminQRCode> rowKey="_id" data={qrcodes} columns={columns} emptyText="No QR codes" />;
};

export default UserQRCodesTable;
