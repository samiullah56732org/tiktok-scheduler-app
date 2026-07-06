"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Workflow } from "lucide-react";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="About TikTok Scheduler"
          description="A modern operating system for creators managing short-form content at scale."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70 bg-background/80">
            <CardContent className="space-y-4 py-6 text-sm text-muted-foreground">
              <p>
                TikTok Scheduler helps marketing teams and solo creators plan, review, and optimize content from one central workspace.
              </p>
              <p>
                The product focuses on a polished workflow for upload preparation, campaign planning, AI-assisted captioning, and reporting.
              </p>
              <p>
                TikTok OAuth and publishing actions remain placeholders for upcoming releases, keeping the product experience realistic while preserving a clear roadmap.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4"><div className="flex items-center gap-2 text-primary"><Workflow className="size-4" /><p className="font-medium text-foreground">Workflow first</p></div><p className="mt-2">Plan, schedule, and review content in one calm workspace.</p></div>
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4"><div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><p className="font-medium text-foreground">AI-native</p></div><p className="mt-2">Prepare captions and creative copy with a future-ready studio architecture.</p></div>
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4"><div className="flex items-center gap-2 text-primary"><ShieldCheck className="size-4" /><p className="font-medium text-foreground">Production-minded</p></div><p className="mt-2">The experience remains secure, modular, and easy to extend.</p></div>
              </div>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
