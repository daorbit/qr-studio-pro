import React from 'react';
import { BarChart3, Palette, Users } from 'lucide-react';

const POINTS = [
  { icon: Palette, title: 'Designed to match your brand', text: 'Logos, colors, frames and templates.' },
  { icon: BarChart3, title: 'Every scan, measured', text: 'Devices, cities and peak hours in real time.' },
  { icon: Users, title: 'Built for teams', text: 'Shared workspaces with clear roles.' },
];

const AuthShowcase: React.FC = () => (
  <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-[28px] m-3 p-12 xl:p-14 bg-[#0b0c0e] text-[#f5f5f7]">
    <div className="pointer-events-none absolute -top-40 right-[-10%] h-[460px] w-[460px] rounded-full bg-orange-500/[0.12] blur-[120px]" />

    <div className="relative flex items-center gap-2.5">
      <img src="/logo.png" alt="" className="w-7 h-7 object-contain" />
      <span className="text-[15px] font-semibold tracking-[-0.02em]">QR Studio</span>
    </div>

    <div className="relative max-w-md">
      <h2 className="text-[2.75rem] xl:text-[3.25rem] font-semibold leading-[1.04] tracking-[-0.04em]">
        QR codes,
        <br />
        <span className="text-[#86868b]">beautifully simple.</span>
      </h2>

      <ul className="mt-14 space-y-6">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.06] ring-1 ring-inset ring-white/[0.08]">
              <Icon size={16} className="text-[#f5f5f7]" />
            </span>
            <span>
              <span className="block text-[15px] font-medium tracking-[-0.01em]">{title}</span>
              <span className="mt-0.5 block text-sm text-[#86868b]">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>

    <p className="relative text-xs text-[#6e6e73]">© {new Date().getFullYear()} QR Studio</p>
  </aside>
);

export default AuthShowcase;
