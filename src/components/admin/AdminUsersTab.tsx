import React, { useCallback, useState, memo } from "react";
import { ActionIcon, Alert, Avatar, Badge, Modal, Pagination, Text, TextInput, Tooltip, UnstyledButton } from "@mantine/core";
import { RefreshCw, Search, AlertCircle } from 'lucide-react';
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { useAdminData } from "@/hooks/useAdminData";
import type { AdminUser, AdminUserRow } from "@/store/slices/adminSlice";
import UserSubscriptionModal from "./UserSubscriptionModal";
import UserPlanBadges from "./UserPlanBadges";
import AdminUserActions from "./AdminUserActions";
import AdminUserCard from "./AdminUserCard";
import UserQRCodesTable from "./UserQRCodesTable";
import LogoLoader from "@/components/common/LogoLoader";
import DataTable, { type DataColumn } from "@/components/common/DataTable";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminUsersTab: React.FC = memo(() => {
  const formatter = useDateFormatter();
  const isMobile = useIsMobile();
  const {
    users,
    loading,
    error,
    page,
    limit,
    total,
    search,
    handleTableChange,
    handleSearch,
    toggleBlock,
    deleteUser,
    refresh,
  } = useAdminData();

  const [localSearch, setLocalSearch] = useState(search);
  const [preview, setPreview] = useState<{ image: string; title: string } | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const handleAvatarClick = useCallback((profilePicture: string | undefined, userName: string | undefined) => {
    if (profilePicture) setPreview({ image: profilePicture, title: userName || "Profile Picture" });
  }, []);

  const handleManagePlan = useCallback((user: AdminUser) => {
    setSelectedUser({ id: user._id, name: user.name || '', email: user.email || '' });
  }, []);

  const onSearch = useCallback(() => {
    handleSearch(localSearch);
  }, [handleSearch, localSearch]);

  const columns: DataColumn<AdminUserRow>[] = [
    {
      key: "profilePicture",
      title: "Profile",
      width: 80,
      render: (_, record) => (
        <UnstyledButton
          onClick={() => handleAvatarClick(record.user?.profilePicture, record.user?.name)}
          aria-label="View profile picture"
        >
          <Avatar size={40} src={record.user?.profilePicture} name={record.user?.name} color="initials" />
        </UnstyledButton>
      ),
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "user.name",
      render: (val, record) => (
        <Text size="sm" fw={600}>{(val as string | undefined) ?? record.user?.email ?? "—"}</Text>
      ),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "user.email",
      render: (email) => <Text size="sm">{(email as string | undefined) ?? "—"}</Text>,
    },
    {
      key: "createdAt",
      title: "Created",
      dataIndex: "user.createdAt",
      render: (val) => (
        <Text size="sm" c="dimmed">{formatter.dateTime(val as string | null | undefined)}</Text>
      ),
    },
    {
      key: "qrcodes",
      title: "QR Codes",
      render: (_, record) => <Badge color="gray">{record.qrcodes?.length ?? 0}</Badge>,
    },
    {
      key: "subscriptionPlan",
      title: "Plan",
      render: (_, record) => <UserPlanBadges user={record.user} />,
    },
    {
      key: "status",
      title: "Status",
      render: (_, record) => (
        record.user?.blocked ? <Badge color="red">Blocked</Badge> : <Badge color="gray">Active</Badge>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, record) => (
        <AdminUserActions
          user={record.user}
          onManagePlan={handleManagePlan}
          onToggleBlock={toggleBlock}
          onDelete={deleteUser}
        />
      ),
    },
  ];

  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Text size="sm" c="dimmed" className="hidden sm:block">
          View user details and the QR codes created by each user.
        </Text>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <TextInput
            placeholder="Search..."
            leftSection={<Search size={16} />}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.currentTarget.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
            className="flex-1 sm:w-60"
            aria-label="Search users"
          />
          <Tooltip label="Refresh">
            <ActionIcon variant="default" size="lg" onClick={refresh} loading={loading} aria-label="Refresh data">
              <RefreshCw size={16} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>

      {error && <Alert color="red" icon={<AlertCircle size={16} />} className="mb-4">{error}</Alert>}

      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <LogoLoader size="sm"/>
        </div>
      ) : isMobile ? (
        <div>
          {users.map((record) => (
            <AdminUserCard
              key={record.user?._id ?? record.user?.id}
              record={record}
              onAvatarClick={handleAvatarClick}
              onManagePlan={handleManagePlan}
              onToggleBlock={toggleBlock}
              onDelete={deleteUser}
            />
          ))}
          {pageCount > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination size="sm" total={pageCount} value={page} onChange={(p) => handleTableChange(p, limit)} />
            </div>
          )}
        </div>
      ) : (
        <DataTable<AdminUserRow>
          rowKey={(row) => row.user?._id ?? row.user?.id ?? JSON.stringify(row.user)}
          data={users}
          columns={columns}
          minWidth={1000}
          emptyText="No users found"
          pagination={{ current: page, pageSize: limit, total, onChange: handleTableChange }}
          expandedRowRender={(record) => <UserQRCodesTable qrcodes={record.qrcodes ?? []} />}
        />
      )}

      <Modal opened={!!preview} onClose={() => setPreview(null)} title={preview?.title} size="lg">
        {preview && <img alt={preview.title} src={preview.image} className="h-auto w-full" />}
      </Modal>

      <UserSubscriptionModal
        visible={!!selectedUser}
        onCancel={() => setSelectedUser(null)}
        userId={selectedUser?.id || null}
        userName={selectedUser?.name || ''}
        userEmail={selectedUser?.email || ''}
        onSuccess={refresh}
      />
    </div>
  );
});

AdminUsersTab.displayName = 'AdminUsersTab';

export default AdminUsersTab;
