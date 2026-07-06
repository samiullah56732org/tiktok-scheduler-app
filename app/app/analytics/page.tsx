"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, PlayCircle, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Analytics"
          description="Track the signals that matter for your social strategy."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total views" value="12.3K" description="Across your latest posts" icon={Eye} trend="+18%" />
            <MetricCard title="Average watch time" value="14.8s" description="Keeping attention high" icon={PlayCircle} trend="+4s" />
            <MetricCard title="Engagement" value="8.4%" description="Comments and saves" icon={TrendingUp} trend="Healthy" />
            <MetricCard title="Publishing cadence" value="3x/wk" description="Consistent performance" icon={BarChart3} trend="Steady" />
          </div>
        </PageSection>

        <PageSection title="Performance overview" description="A real-time view of your most important metrics.">
          <Card className="border-border/70 bg-muted/20">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Advanced reporting, trend charts, and deeper channel insights are being finalized for the next release.</p>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
