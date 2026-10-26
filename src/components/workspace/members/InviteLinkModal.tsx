import React from 'react';
import { Button, CopyButton, Modal, TextInput } from '@mantine/core';
import { Check, Copy } from 'lucide-react';

interface InviteLinkModalProps {
  link: string | null;
  email: string;
  onClose: () => void;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ link, email, onClose }) => (
  <Modal opened={Boolean(link)} onClose={onClose} title="Share the invite link" size={480}>
    <p className="mb-4 text-sm text-muted-foreground">
      We couldn&apos;t email {email}. Send them this link instead. It works once and expires in 7 days.
    </p>
    <div className="flex gap-2">
      <TextInput readOnly value={link ?? ''} className="flex-1" aria-label="Invite link" />
      <CopyButton value={link ?? ''}>
        {({ copied, copy }) => (
          <Button variant="default" leftSection={copied ? <Check size={15} /> : <Copy size={15} />} onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
        )}
      </CopyButton>
    </div>
  </Modal>
);

export default InviteLinkModal;
