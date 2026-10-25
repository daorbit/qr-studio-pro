import React from 'react';
import { cn } from '@/lib/utils';

const TONES = [
  'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  'bg-rose-500/15 text-rose-600 dark:text-rose-400',
  'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  'bg-teal-500/15 text-teal-600 dark:text-teal-400',
];

const SIZES = {
  sm: 'w-7 h-7 text-xs rounded-lg',
  md: 'w-9 h-9 text-sm rounded-[10px]',
  lg: 'w-14 h-14 text-lg rounded-2xl',
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'W';

const toneFor = (name: string) => {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return TONES[hash % TONES.length];
};

interface WorkspaceMarkProps {
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}

const WorkspaceMark: React.FC<WorkspaceMarkProps> = ({ name, size = 'md', className }) => (
  <span className={cn('inline-flex shrink-0 items-center justify-center font-semibold', SIZES[size], toneFor(name), className)}>
    {initials(name)}
  </span>
);

export default WorkspaceMark;
