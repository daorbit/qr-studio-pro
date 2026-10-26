import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Tooltip } from "@mantine/core";
import { BarChart3, Download } from "lucide-react";
import { QRCodeData } from "../../types/qrcode";
import QRCodeOnly from "./QRCodeOnly";
import QRDownloadModal from "./card/QRDownloadModal";
import QRCardMenu from "./card/QRCardMenu";
import QRTypeChip from "./card/QRTypeChip";
import QRStatusBadge from "./card/QRStatusBadge";
import QRProtectionIcons from "./card/QRProtectionIcons";

interface QRCodeCardProps {
  qrCode: QRCodeData;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  viewMode?: "list" | "grid";
}

const QRCodeCard: React.FC<QRCodeCardProps> = React.memo(({ qrCode, onEdit, onDelete, onToggleStatus, viewMode = "list" }) => {
  const navigate = useNavigate();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const active = qrCode.status === "active";
  const openAnalytics = () => navigate(`/analytics/${qrCode.id}`);

  const menu = (
    <QRCardMenu
      name={qrCode.name}
      active={active}
      onEdit={() => onEdit(qrCode.id)}
      onAnalytics={openAnalytics}
      onDownload={() => setDownloadOpen(true)}
      onToggleStatus={onToggleStatus ? () => onToggleStatus(qrCode.id) : undefined}
      onDelete={() => onDelete(qrCode.id)}
    />
  );

  const modal = <QRDownloadModal qrCode={qrCode} opened={downloadOpen} onClose={() => setDownloadOpen(false)} />;

  if (viewMode === "grid") {
    return (
      <>
        <div className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-foreground/15 hover:shadow-card">
          <button
            type="button"
            onClick={() => setDownloadOpen(true)}
            aria-label={`Preview ${qrCode.name}`}
            className="create-stage relative m-1.5 flex aspect-[4/3] items-center justify-center rounded-[18px]"
          >
            <span className="rounded-2xl bg-white p-2.5 shadow-card">
              <QRCodeOnly
                content={qrCode.content}
                template={qrCode.template}
                styling={qrCode.styling}
                qrId={qrCode.id}
                size={window.innerWidth < 640 ? 92 : 112}
                qrType={qrCode.type}
              />
            </span>
            <span className="absolute left-2.5 top-2.5">
              <QRProtectionIcons qrCode={qrCode} />
            </span>
            <span className="absolute right-2.5 top-2.5">
              <QRStatusBadge active={active} />
            </span>
          </button>

          <div className="flex flex-1 flex-col gap-2 px-4 pb-3 pt-2">
            <div className="flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => onEdit(qrCode.id)}
                className="min-w-0 truncate text-left text-[15px] font-semibold tracking-[-0.01em] text-foreground hover:text-primary"
              >
                {qrCode.name}
              </button>
              {menu}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2">
              <QRTypeChip type={qrCode.type} />
              <button
                type="button"
                onClick={openAnalytics}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-foreground/[0.05] px-2 py-0.5 text-xs font-medium tabular-nums text-foreground transition-colors hover:bg-foreground/[0.09]"
              >
                <BarChart3 size={12} />
                {qrCode.scans} {qrCode.scans === 1 ? "scan" : "scans"}
              </button>
            </div>
          </div>
        </div>
        {modal}
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-foreground/[0.025] sm:gap-4 sm:px-4">
        <button
          type="button"
          onClick={() => setDownloadOpen(true)}
          aria-label={`Preview ${qrCode.name}`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-soft ring-1 ring-border"
        >
          <QRCodeOnly content={qrCode.content} template={qrCode.template} styling={qrCode.styling} qrId={qrCode.id} size={44} qrType={qrCode.type} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(qrCode.id)}
              className="min-w-0 truncate text-left text-sm font-semibold text-foreground hover:text-primary"
            >
              {qrCode.name}
            </button>
            <QRProtectionIcons qrCode={qrCode} />
          </div>
          <div className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">{qrCode.content}</div>
          <div className="mt-1 sm:hidden">
            <QRTypeChip type={qrCode.type} />
          </div>
        </div>

        <div className="hidden w-32 md:block">
          <QRTypeChip type={qrCode.type} />
        </div>
        <div className="hidden w-20 text-right text-sm tabular-nums text-foreground sm:block">
          {qrCode.scans}
          <span className="ml-1 text-xs text-muted-foreground">scans</span>
        </div>
        <div className="hidden w-20 sm:block">
          <QRStatusBadge active={active} />
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <Tooltip label="Analytics">
            <ActionIcon onClick={openAnalytics} aria-label="Analytics" className="hidden sm:flex">
              <BarChart3 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download">
            <ActionIcon onClick={() => setDownloadOpen(true)} aria-label="Download">
              <Download size={16} />
            </ActionIcon>
          </Tooltip>
          {menu}
        </div>
      </div>
      {modal}
    </>
  );
});

QRCodeCard.displayName = "QRCodeCard";

export default QRCodeCard;
