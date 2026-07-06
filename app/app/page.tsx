"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { ArrowRight, BarChart3, CalendarDays, Sparkles, UploadCloud } from "lucide-react";

const features = [
  {
    title: "AI Caption Studio",
    description: "Generate polished short-form captions in seconds for your next release.",
    icon: Sparkles,
  },
  {
    title: "Smart Calendar",
    description: "Map content sequences and schedule posts around your campaign windows.",
    icon: CalendarDays,
  },
  {
    title: "Live Analytics",
    description: "Monitor views, performance, and engagement trends from one dashboard.",
    icon: BarChart3,
  },
  {
    title: "Fast Uploads",
    description: "Prepare media assets and manage your creative queue with a streamlined flow.",
    icon: UploadCloud,
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-violet-500/10 p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-sm font-medium text-primary">
                Built for modern creators and teams
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Plan, publish, and optimize short-form content with clarity.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                TikTok Scheduler brings your uploads, captions, scheduling, and reporting into one polished workspace.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/login">
                    Start free <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">Open dashboard</Link>
                </Button>
              </div>
            </div>
            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <CardTitle>Weekly snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricCard title="Scheduled posts" value="12" description="Ready for approval" icon={CalendarDays} trend="+3 this week" />
                <MetricCard title="Avg. engagement" value="8.4%" description="Across your latest releases" icon={BarChart3} trend="Up 14%" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/70 bg-background/80">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </AppShell>
  );
}