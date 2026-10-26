import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { BarChart3, Download, MoreHorizontal, Pause, Pencil, Play, Trash2 } from 'lucide-react';
import { confirmAction } from '@/lib/notify';

interface QRCardMenuProps {
  name: string;
  active: boolean;
  onEdit: () => void;
  onAnalytics: () => void;
  onDownload: () => void;
  onToggleStatus?: () => void;
  onDelete: () => void;
}

const QRCardMenu: React.FC<QRCardMenuProps> = ({ name, active, onEdit, onAnalytics, onDownload, onToggleStatus, onDelete }) => (
  <Menu position="bottom-end" width={200}>
    <Menu.Target>
      <ActionIcon aria-label="More actions" onClick={(e) => e.stopPropagation()}>
        <MoreHorizontal size={16} />
      </ActionIcon>
    </Menu.Target>
    <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
      <Menu.Item leftSection={<Pencil size={14} />} onClick={onEdit}>
        Edit
      </Menu.Item>
      <Menu.Item leftSection={<BarChart3 size={14} />} onClick={onAnalytics}>
        Analytics
      </Menu.Item>
      <Menu.Item leftSection={<Download size={14} />} onClick={onDownload}>
        Download
      </Menu.Item>
      {onToggleStatus && (
        <Menu.Item leftSection={active ? <Pause size={14} /> : <Play size={14} />} onClick={onToggleStatus}>
          {active ? 'Pause' : 'Activate'}
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<Trash2 size={14} />}
        onClick={() =>
          confirmAction({
            title: 'Delete QR code?',
            body: `“${name}” will stop working and its scan history will be removed.`,
            danger: true,
            onConfirm: onDelete,
          })
        }
      >
        Delete
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default QRCardMenu;
