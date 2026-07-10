"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { ArrowRight, BarChart3, CalendarDays, CheckCircle2, Sparkles, UploadCloud, Zap, ShieldCheck, Workflow } from "lucide-react";

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

const benefits = [
  "Design-driven workflow for polished publishing plans",
  "Fast review loops with clear status visibility",
  "Context-rich dashboards for creative teams",
  "Future-ready architecture for TikTok and AI integrations",
];

const faqPreview = [
  { question: "How does the scheduling workspace work?", answer: "Create campaigns, review assets, and keep every release aligned in one place." },
  { question: "Can I use AI-generated captions?", answer: "Yes, draft and refine copy without leaving the planning view." },
];

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-primary/15 via-background to-violet-600/10 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-sm font-medium text-primary backdrop-blur">
                <Zap className="mr-2 size-4" /> Built for modern creators and teams
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Plan, publish, and optimize short-form content with clarity.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                Creator Scheduler brings your uploads, captions, scheduling, and reporting into one polished workspace.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/login">
                    Start free <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/dashboard">Open dashboard</Link>
                </Button>
              </div>
            </div>
            <Card className="border-border/70 bg-background/80 shadow-lg">
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
              <Card key={feature.title} className="group border-border/70 bg-background/80 transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-105">
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

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <CardTitle>Why creators love it</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/40 p-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-600" />
                  <p className="text-sm text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <CardTitle>FAQ preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqPreview.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border/70 p-4">
                  <p className="font-medium">{item.question}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary"><Workflow className="size-4" /><CardTitle>How it works</CardTitle></div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Create your content plan and capture your creative notes.</p>
              <p>2. Schedule posts and review them from the shared calendar.</p>
              <p>3. Generate AI captions and accelerate your publishing workflow.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary"><ShieldCheck className="size-4" /><CardTitle>Built for review readiness</CardTitle></div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Protected routes, modular services, responsive UI, and clear production planning make the experience review-friendly.</p>
            </CardContent>
          </Card>
        </section>

        <footer className="rounded-3xl border border-border/70 bg-background/80 px-6 py-5 text-sm text-muted-foreground">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Creator Scheduler</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="transition hover:text-foreground">About</Link>
              <Link href="/privacy" className="transition hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="transition hover:text-foreground">Terms</Link>
              <Link href="/contact" className="transition hover:text-foreground">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}