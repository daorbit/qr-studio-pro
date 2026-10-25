import React from 'react';
import { Button, Input, Modal, message } from 'antd';
import { Copy } from 'lucide-react';

interface InviteLinkModalProps {
  link: string | null;
  email: string;
  onClose: () => void;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ link, email, onClose }) => {
  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    message.success('Invite link copied');
  };

  return (
    <Modal open={Boolean(link)} onCancel={onClose} footer={null} title="Share the invite link" centered>
      <p className="text-sm text-muted-foreground mb-4">
        We couldn&apos;t email {email}. Send them this link instead. It works once and expires in 7 days.
      </p>
      <div className="flex gap-2">
        <Input readOnly value={link ?? ''} size="large" />
        <Button size="large" icon={<Copy size={16} />} onClick={copy}>
          Copy
        </Button>
      </div>
    </Modal>
  );
};

export default InviteLinkModal;
