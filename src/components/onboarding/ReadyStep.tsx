import React from 'react';
import { BarChart3, Check, Palette, QrCode, UserPlus } from 'lucide-react';

const NEXT = [
  { icon: QrCode, title: 'Create your first QR code', text: 'URL, Wi-Fi, vCard, menu and 25 more types.', tone: 'bg-orange-500/10 text-orange-500' },
  { icon: Palette, title: 'Brand it', text: 'Add your logo, colors and a frame.', tone: 'bg-violet-500/10 text-violet-500' },
  { icon: BarChart3, title: 'Watch the scans', text: 'Devices, cities and peak hours, live.', tone: 'bg-sky-500/10 text-sky-500' },
  { icon: UserPlus, title: 'Invite your team', text: 'Share the workspace with roles.', tone: 'bg-emerald-500/10 text-emerald-500' },
];

const ReadyStep: React.FC<{ workspaceName: string }> = ({ workspaceName }) => (
  <div className="space-y-5">
    <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/[0.06] p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check size={18} strokeWidth={3} />
      </span>
      <div className="min-w-0">
        <div className="text-[15px] font-semibold text-foreground truncate">{workspaceName} is ready</div>
        <div className="text-xs text-muted-foreground">Pro trial active for 3 months. No card needed.</div>
      </div>
    </div>

    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {NEXT.map(({ icon: Icon, title, text, tone }) => (
        <li key={title} className="flex items-center gap-3.5 p-3.5">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
            <Icon size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-medium text-foreground">{title}</span>
            <span className="block text-xs text-muted-foreground">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ReadyStep;
