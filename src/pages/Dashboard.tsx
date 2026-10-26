import React from "react";
import { Button, Pagination } from "@mantine/core";
import confetti from 'canvas-confetti';
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "@/lib/notify";
import PageHeader from "../components/layout/PageHeader";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import StatsCards from "../components/dashboard/StatsCards";
import { useWorkspace } from "../hooks/useWorkspace";
import SearchBar from "../components/dashboard/SearchBar";
import QRCodesList from "../components/dashboard/QRCodesList";
import NoSearchResults from "../components/dashboard/NoSearchResults";
import SubscriptionLimitAlert from "../components/payment/SubscriptionLimitAlert";
import { useQRCodes } from "../hooks/useQRCodes";
import { useAppSelector } from "../store";
import { selectStatsLoading } from "../store/slices/statsSlice";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { workspace, canEdit } = useWorkspace();
  const {
    qrCodes,
    loading,
    deleteQRCode,
    toggleQRCodeStatus,
    page,
    limit,
    total,
    totalPages,
    totalScans,
    totalActive,
    statsTotal,
    setPage,
    setSearch,
  } = useQRCodes();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("grid");
  
  // Get separate loading state for stats
  const statsLoading = useAppSelector(selectStatsLoading);

  // Memoize stats from Redux store - they don't change during search
  const stats = React.useMemo(() => ({
    total: statsTotal,
    totalScans,
    totalActive,
    inactive: Number(statsTotal) - Number(totalActive)
  }), [statsTotal, totalScans, totalActive]);

  // Initial loading (first time) vs search loading - for QR codes list only
  const isInitialLoading = loading && qrCodes.length === 0 && !searchTerm;
  
  // Check if user has no QR codes at all (not searching)
  const hasNoQRCodes = statsTotal === 0 && !statsLoading && !loading;

  // debounce search input
  const searchTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current)
        window.clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteQRCode(id);
    message.success('QR Code deleted successfully!');
  };

  const handleToggleStatus = (id: string) => {
    toggleQRCodeStatus(id);
    // Confetti on activation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#fdba74']
    });
    message.success('QR Code status updated!');
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = window.setTimeout(() => {
      setSearch(value.trim());
    }, 400);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearch('');
  };

  return (
    <>
      {/* Subscription Limit Alert - Fixed at top */}
      <SubscriptionLimitAlert currentQRCount={statsTotal || 0} />
      
      <div className="animate-fade-in space-y-6 md:space-y-8">
        <PageHeader
          title="QR codes"
          description={workspace ? `Everything in ${workspace.name}` : undefined}
          actions={
            canEdit && (
              <Button component={Link} to="/create" leftSection={<Plus size={16} />}>
                New QR code
              </Button>
            )
          }
        />

        <StatsCards loading={statsLoading} stats={stats} />

        {hasNoQRCodes ? (
          <DashboardEmptyState canCreate={canEdit} />
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">All codes</h2>
                <span className="text-sm tabular-nums text-muted-foreground">{Number(total) || qrCodes.length}</span>
              </div>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>

            {/* QR Codes List or No Results */}
            {qrCodes.length === 0 && searchTerm.trim() ? (
              <NoSearchResults searchTerm={searchTerm} onClearSearch={handleClearSearch} />
            ) : (
              <QRCodesList
                qrCodes={qrCodes}
                loading={loading}
                viewMode={viewMode}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </>
        )}

        {Number(total) > Number(limit) && (
          <div className="flex justify-center pt-2">
            <Pagination value={Number(page)} total={Number(totalPages) || Math.ceil(Number(total) / Number(limit))} onChange={setPage} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
