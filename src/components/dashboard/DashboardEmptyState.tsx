import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArrowRight, CreditCard, FileText, Globe, Instagram, Sparkles, UserSquare, Wifi, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const STARTERS: { label: string; hint: string; icon: LucideIcon; tint: string }[] = [
  { label: 'Website', hint: 'Link to any URL', icon: Globe, tint: 'from-sky-400 to-blue-600' },
  { label: 'Wi-Fi', hint: 'Join without typing', icon: Wifi, tint: 'from-cyan-400 to-sky-600' },
  { label: 'Contact card', hint: 'Share your vCard', icon: UserSquare, tint: 'from-emerald-400 to-teal-600' },
  { label: 'Menu or PDF', hint: 'Open a document', icon: FileText, tint: 'from-red-400 to-rose-600' },
  { label: 'Social profile', hint: 'Instagram, LinkedIn…', icon: Instagram, tint: 'from-amber-400 via-pink-500 to-purple-600' },
  { label: 'Payment', hint: 'UPI or PayPal', icon: CreditCard, tint: 'from-blue-500 to-indigo-700' },
];

const DashboardEmptyState: React.FC<{ canCreate: boolean }> = ({ canCreate }) => (
  <div className="create-stage overflow-hidden rounded-[28px] border border-border px-6 py-12 sm:px-10 sm:py-16">
    <div className="mx-auto max-w-md text-center">
      <span className="create-app-icon mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <Sparkles size={24} />
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-foreground">Create your first QR code</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Pick a starting point. Style it with your logo and colors, then track every scan here.
      </p>
      {canCreate && (
        <Button component={Link} to="/create" size="md" rightSection={<ArrowRight size={16} />} className="mt-6">
          New QR code
        </Button>
      )}
    </div>

    {canCreate && (
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
        {STARTERS.map(({ label, hint, icon: Icon, tint }) => (
          <Link key={label} to="/create" className="create-glass flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-card">
            <span className={cn('create-app-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br text-white', tint)}>
              <Icon size={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-semibold text-foreground">{label}</span>
              <span className="block truncate text-xs text-muted-foreground">{hint}</span>
            </span>
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default DashboardEmptyState;
