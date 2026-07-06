"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="About TikTok Scheduler"
          description="A modern operating system for creators managing short-form content at scale."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/60">
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
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
