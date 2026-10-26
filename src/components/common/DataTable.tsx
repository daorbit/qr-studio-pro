import React, { useState } from 'react';
import { ActionIcon, Group, Loader, Pagination, ScrollArea, Table, Text } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DataColumn<T> {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T | string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataPagination {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

interface DataTableProps<T> {
  columns: DataColumn<T>[];
  data: T[];
  rowKey: keyof T | ((record: T) => string);
  loading?: boolean;
  pagination?: DataPagination | false;
  emptyText?: React.ReactNode;
  minWidth?: number;
  expandedRowRender?: (record: T) => React.ReactNode;
}

const readValue = <T,>(record: T, dataIndex?: keyof T | string) => {
  if (!dataIndex) return undefined;
  return String(dataIndex)
    .split('.')
    .reduce<unknown>((acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined), record);
};

function DataTable<T>({
  columns,
  data,
  rowKey,
  loading,
  pagination,
  emptyText = 'Nothing here yet',
  minWidth = 640,
  expandedRowRender,
}: DataTableProps<T>) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const keyOf = (record: T, index: number) =>
    typeof rowKey === 'function' ? rowKey(record) : String((record as Record<string, unknown>)[rowKey as string] ?? index);

  const toggleRow = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const pages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;
  const colSpan = columns.length + (expandedRowRender ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <ScrollArea type="auto">
        <Table miw={minWidth} verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
          <Table.Thead className="bg-muted/50">
            <Table.Tr>
              {expandedRowRender && <Table.Th w={44} />}
              {columns.map((col) => (
                <Table.Th key={col.key} w={col.width} ta={col.align} className={col.className}>
                  <Text size="xs" fw={600} c="dimmed" tt="uppercase" className="tracking-wide">
                    {col.title}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Group justify="center" py="xl">
                    <Loader size="sm" />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ) : data.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Text ta="center" c="dimmed" size="sm" py="xl">
                    {emptyText}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              data.map((record, index) => {
                const key = keyOf(record, index);
                const isOpen = expanded.has(key);
                return (
                  <React.Fragment key={key}>
                    <Table.Tr>
                      {expandedRowRender && (
                        <Table.Td>
                          <ActionIcon size="sm" onClick={() => toggleRow(key)} aria-label={isOpen ? 'Collapse row' : 'Expand row'} aria-expanded={isOpen}>
                            <ChevronRight size={14} className={cn('transition-transform', isOpen && 'rotate-90')} />
                          </ActionIcon>
                        </Table.Td>
                      )}
                      {columns.map((col) => {
                        const value = readValue(record, col.dataIndex);
                        return (
                          <Table.Td key={col.key} ta={col.align} className={col.className}>
                            {col.render ? col.render(value, record, index) : (value as React.ReactNode)}
                          </Table.Td>
                        );
                      })}
                    </Table.Tr>
                    {expandedRowRender && isOpen && (
                      <Table.Tr className="bg-muted/30">
                        <Table.Td colSpan={colSpan} p="md">
                          {expandedRowRender(record)}
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {pagination && pagination.total > pagination.pageSize && (
        <Group justify="space-between" px="md" py="sm" className="border-t border-border">
          <Text size="xs" c="dimmed">
            {pagination.total} total
          </Text>
          <Pagination size="sm" total={pages} value={pagination.current} onChange={(page) => pagination.onChange(page, pagination.pageSize)} />
        </Group>
      )}
    </div>
  );
}

export default DataTable;
