import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@mantine/core";
import { ArrowUpRight, Lock } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import type { AdvancedAnalytics } from "@/types/analytics";
import { cn } from "@/lib/utils";
import GeographicHeatmap from "./GeographicHeatmap";
import PeakTimesAnalysis from "./PeakTimesAnalysis";
import RetentionAnalysis from "./RetentionAnalysis";
import ReferrerAnalysis from "./ReferrerAnalysis";
import { ADVANCED_SAMPLE_DATA } from "./advancedSampleData";

interface AdvancedAnalyticsSectionProps {
  advancedAnalytics?: AdvancedAnalytics | null;
  advancedLoading: boolean;
}

const AdvancedAnalyticsSection: React.FC<AdvancedAnalyticsSectionProps> = ({ advancedAnalytics, advancedLoading }) => {
  const { hasFeatureAccess } = usePayment();
  const unlocked = hasFeatureAccess("advancedAnalytics");
  const loading = unlocked && advancedLoading;
  const data = unlocked ? advancedAnalytics ?? undefined : ADVANCED_SAMPLE_DATA;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Audience insights</h2>
        <Badge size="sm" color="orange">Pro</Badge>
      </div>

      <div className="relative">
        <div
          className={cn("grid grid-cols-1 gap-4 lg:grid-cols-2", !unlocked && "pointer-events-none select-none opacity-60 blur-[3px]")}
          aria-hidden={!unlocked}
        >
          <GeographicHeatmap data={data?.heatmap} loading={loading} />
          <ReferrerAnalysis data={data?.referrers} loading={loading} />
          <PeakTimesAnalysis data={data?.peakTimes} loading={loading} />
          <RetentionAnalysis data={data?.retention} loading={loading} />
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <div className="create-glass max-w-sm rounded-2xl p-6 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground">
                <Lock size={18} />
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">See who scans, and from where</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Cities, traffic sources, busiest hours and returning visitors are part of the Pro plan.
              </p>
              <Button component={Link} to="/pricing" rightSection={<ArrowUpRight size={15} />} className="mt-4">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvancedAnalyticsSection;
