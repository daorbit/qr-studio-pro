import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

const MobileTopBar: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => {
  const { workspace, canEdit } = useWorkspace();

  return (
    <header className="z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-3 backdrop-blur-xl lg:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-foreground/[0.05]"
      >
        <Menu size={20} />
      </button>
      {workspace && (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img src="/logo.png" alt="" className="h-7 w-7 shrink-0 object-contain" />
          <span className="truncate text-[15px] font-semibold text-foreground">{workspace.name}</span>
        </div>
      )}
      {canEdit && (
        <Link
          to="/create"
          aria-label="Create QR code"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-cta text-cta-foreground transition-colors hover:bg-cta-hover"
        >
          <Plus size={18} />
        </Link>
      )}
    </header>
  );
};

export default MobileTopBar;
