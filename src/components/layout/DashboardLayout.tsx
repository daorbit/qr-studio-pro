import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { cn } from "@/lib/utils";
import Sidebar from "./shell/Sidebar";
import MobileTopBar from "./shell/MobileTopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { collapsed, toggle } = useSidebarCollapsed();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden overflow-hidden transition-[width] duration-200 ease-out lg:block",
          collapsed ? "w-[60px]" : "w-[248px]"
        )}
      >
        <Sidebar collapsed={collapsed} onToggle={toggle} />
      </aside>

      <MobileTopBar onOpenMenu={() => setMobileOpen(true)} />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] border-r border-border bg-background p-0 [&>button]:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className={cn("flex min-h-0 flex-1 flex-col transition-[padding] duration-200 ease-out lg:py-2 lg:pr-2", collapsed ? "lg:pl-[60px]" : "lg:pl-[248px]")}>
        <main
          ref={scrollRef}
          className="app-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain bg-panel lg:rounded-2xl lg:border lg:border-border lg:shadow-soft"
        >
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout);
