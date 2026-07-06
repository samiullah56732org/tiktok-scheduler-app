"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, PlayCircle, TrendingUp, Sparkles } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Analytics"
          description="Track the signals that matter for your social strategy."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total views" value="12.3K" description="Across your latest posts" icon={Eye} trend="+18%" />
            <MetricCard title="Average watch time" value="14.8s" description="Keeping attention high" icon={PlayCircle} trend="+4s" />
            <MetricCard title="Engagement" value="8.4%" description="Comments and saves" icon={TrendingUp} trend="Healthy" />
            <MetricCard title="Publishing cadence" value="3x/wk" description="Consistent performance" icon={BarChart3} trend="Steady" />
          </div>
        </PageSection>

        <PageSection title="Performance overview" description="A real-time view of your most important metrics.">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><CardTitle>Reporting preview</CardTitle></div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Advanced reporting, trend charts, and deeper channel insights are being finalized for the next release.</p>
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                  <p className="font-medium text-foreground">What this unlocks next</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Weekly performance summaries</li>
                    <li>Audience sentiment snapshots</li>
                    <li>Publishing windows and conversion trends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <CardTitle>Signal tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 p-3"><span>Reach trend</span><span className="font-medium text-foreground">+12%</span></div>
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 p-3"><span>Watch time consistency</span><span className="font-medium text-foreground">Stable</span></div>
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 p-3"><span>Creative velocity</span><span className="font-medium text-foreground">High</span></div>
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}
