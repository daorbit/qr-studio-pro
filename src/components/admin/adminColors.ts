const PLAN_COLORS: Record<string, string> = {
  free: 'gray',
  basic: 'blue',
  pro: 'yellow',
  enterprise: 'violet',
  trial: 'orange',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'teal',
  paid: 'teal',
  inactive: 'gray',
  expired: 'yellow',
  cancelled: 'red',
  failed: 'red',
  created: 'blue',
  refunded: 'yellow',
};

export const planColor = (plan?: string) => PLAN_COLORS[plan ?? ''] ?? 'gray';

export const statusColor = (status?: string) => STATUS_COLORS[status ?? ''] ?? 'gray';
