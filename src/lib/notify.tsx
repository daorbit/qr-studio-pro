import React, { useState, type ReactNode } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Button, Group, Stack, Text } from '@mantine/core';

const DEDUPE_MS = 4000;
const recent = new Map<string, number>();

type Tone = 'success' | 'error' | 'info' | 'warning';

const TONE_COLOR: Record<Tone, string | undefined> = {
  success: 'teal',
  error: 'red',
  info: undefined,
  warning: 'yellow',
};

const show = (content: ReactNode, tone: Tone, autoClose: number) => {
  const key = `${tone}|${String(content ?? '')}`;
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUPE_MS) return;
  recent.set(key, now);
  if (recent.size > 50) {
    for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k);
  }
  notifications.show({
    message: content,
    color: TONE_COLOR[tone],
    autoClose,
    withCloseButton: false,
    classNames: { root: 'app-toast', description: 'app-toast-message' },
  });
};

type MessageInput = ReactNode | { content: ReactNode; duration?: number };

const normalise = (input: MessageInput, fallbackMs: number): [ReactNode, number] => {
  if (input && typeof input === 'object' && 'content' in (input as object)) {
    const { content, duration } = input as { content: ReactNode; duration?: number };
    return [content, duration ? duration * 1000 : fallbackMs];
  }
  return [input as ReactNode, fallbackMs];
};

const toast = (tone: Tone, defaultMs: number) => (input: MessageInput) => {
  const [content, ms] = normalise(input, defaultMs);
  show(content, tone, ms);
};

export const notify = {
  success: toast('success', 3000),
  error: toast('error', 5000),
  info: toast('info', 3000),
  warning: toast('warning', 4000),
};

export const message = {
  ...notify,
  loading: (content: MessageInput) => notify.info(content),
};

export const errorMessage = (error: unknown, fallback = 'Something went wrong') => {
  const data = (error as { response?: { data?: { message?: string } } })?.response?.data;
  if (data?.message) return data.message;
  if (typeof error === 'string' && error) return error;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

const ConfirmBody: React.FC<{
  body?: ReactNode;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}> = ({ body, confirmLabel, confirmColor, onConfirm, onCancel }) => {
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack gap="md">
      {body && (
        <Text size="sm" c="dimmed">
          {body}
        </Text>
      )}
      <Group justify="flex-end" gap="sm">
        <Button variant="default" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button color={confirmColor} onClick={run} loading={busy}>
          {confirmLabel}
        </Button>
      </Group>
    </Stack>
  );
};

export const confirmAction = (opts: {
  title: string;
  body?: ReactNode;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void | Promise<void>;
}) => {
  const id = `confirm-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  modals.open({
    modalId: id,
    title: opts.title,
    size: 'sm',
    zIndex: 600,
    children: (
      <ConfirmBody
        body={opts.body}
        confirmLabel={opts.confirmLabel ?? (opts.danger ? 'Delete' : 'Confirm')}
        confirmColor={opts.danger ? 'red' : 'brand'}
        onCancel={() => modals.close(id)}
        onConfirm={async () => {
          try {
            await opts.onConfirm();
          } finally {
            modals.close(id);
          }
        }}
      />
    ),
  });
};
