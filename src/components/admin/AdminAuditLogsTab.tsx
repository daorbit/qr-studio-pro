import React, { useCallback, memo, useState } from "react";
import { ActionIcon, Alert, Badge, Button, Code, Group, Modal, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { RefreshCw, Eye, Copy, AlertCircle } from "lucide-react";
import { message } from "@/lib/notify";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import type { AuditLog } from "@/store/slices/adminSlice";
import DataTable, { type DataColumn } from "@/components/common/DataTable";

const ACTION_COLORS: Record<AuditLog['action'], string> = {
  USER_BLOCKED: "red",
  USER_UNBLOCKED: "green",
  USER_DELETED: "red",
  SUBSCRIPTION_UPDATED: "blue",
  USER_SUBSCRIPTION_REFRESHED: "orange",
  SYSTEM_CLEANUP: "grape",
  LIMITS_ENFORCED: "indigo",
  UPDATE_PLAN_PRICES: "cyan",
};

const AdminAuditLogsTab: React.FC = memo(() => {
  const formatter = useDateFormatter();
  const clipboard = useClipboard();
  const {
    logs: auditLogs,
    loading: auditLogsLoading,
    error: auditLogsError,
    page: auditLogsPage,
    limit: auditLogsLimit,
    total: auditLogsTotal,
    search: auditLogsSearch,
    handleTableChange: handleAuditLogsTableChange,
    handleSearch: handleAuditLogsSearch,
  } = useAuditLogs();

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const handleCopyJson = useCallback(() => {
    if (!selectedLog) return;
    clipboard.copy(JSON.stringify(selectedLog, null, 2));
    message.success('JSON copied to clipboard!');
  }, [clipboard, selectedLog]);

  const auditLogsColumns: DataColumn<AuditLog>[] = [
    {
      key: "admin",
      title: "Admin",
      render: (_, record) => (
        <Text size="sm" fw={600}>{record.adminId?.name || record.adminEmail}</Text>
      ),
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      render: (action) => (
        <Badge color={ACTION_COLORS[action as AuditLog['action']] ?? "gray"}>
          {String(action).replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      key: "targetUser",
      title: "Target User",
      render: (_, record) => (
        <Text size="sm">{record.targetUserId?.name || record.targetUserEmail || "—"}</Text>
      ),
    },
    {
      key: "details",
      title: "Details",
      dataIndex: "details",
      render: (details) => {
        if (!details) return "—";
        const compactStr = typeof details === "object" ? JSON.stringify(details) : String(details);
        const prettyStr = typeof details === "object" ? JSON.stringify(details, null, 2) : String(details);
        return (
          <Tooltip label={<pre className="m-0 whitespace-pre-wrap font-mono text-xs">{prettyStr}</pre>} multiline maw={420}>
            <Text size="sm" c="dimmed" truncate="end" maw={420}>
              {compactStr}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      key: "createdAt",
      title: "Date",
      dataIndex: "createdAt",
      render: (val) => (
        <Text size="sm" c="dimmed">{formatter.dateTime(val as string)}</Text>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      width: 80,
      render: (_, record) => (
        <ActionIcon onClick={() => setSelectedLog(record)} aria-label="View details">
          <Eye size={14} />
        </ActionIcon>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Title order={3}>Audit Logs</Title>
        <Group gap="sm">
          <TextInput
            placeholder="Search logs..."
            value={auditLogsSearch}
            onChange={(e) => handleAuditLogsSearch(e.currentTarget.value)}
            w={200}
            aria-label="Search logs"
          />
          <Button
            variant="default"
            leftSection={<RefreshCw size={14} />}
            onClick={() => handleAuditLogsSearch(auditLogsSearch)}
            loading={auditLogsLoading}
          >
            Refresh
          </Button>
        </Group>
      </div>

      {auditLogsError && (
        <Alert color="red" icon={<AlertCircle size={16} />}>{auditLogsError}</Alert>
      )}

      <DataTable<AuditLog>
        columns={auditLogsColumns}
        data={auditLogs}
        rowKey="_id"
        loading={auditLogsLoading}
        minWidth={900}
        emptyText="No audit logs found"
        pagination={{
          current: auditLogsPage,
          pageSize: auditLogsLimit,
          total: auditLogsTotal,
          onChange: handleAuditLogsTableChange,
        }}
      />

      <Modal
        opened={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        size={800}
        title={
          <Group gap="xs">
            <span>Audit Log Details</span>
            <Tooltip label="Copy JSON">
              <ActionIcon size="sm" onClick={handleCopyJson} aria-label="Copy JSON">
                <Copy size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        }
      >
        {selectedLog && (
          <Code block className="max-h-[500px] select-text overflow-auto whitespace-pre-wrap break-words">
            {JSON.stringify(selectedLog, null, 2)}
          </Code>
        )}
      </Modal>
    </div>
  );
});

AdminAuditLogsTab.displayName = "AdminAuditLogsTab";

export default AdminAuditLogsTab;
