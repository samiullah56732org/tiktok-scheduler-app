"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Privacy policy"
          description="Your information is handled responsibly and transparently."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70 bg-background/80">
            <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 text-primary"><ShieldCheck className="size-4" /><p className="font-medium text-foreground">Data handling overview</p></div>
              <p>We collect account and usage information required to provide authentication, dashboards, and product features.</p>
              <p>Profile images and basic account metadata are used to personalize your workspace and support sign-in flows.</p>
              <p>We do not publish your content to TikTok without explicit future integration support.</p>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
