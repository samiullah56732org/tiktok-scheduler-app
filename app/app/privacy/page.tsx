"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Privacy policy"
          description="Your information is handled responsibly and transparently."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/60">
            <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
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
