"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Terms of service"
          description="These terms outline how the service should be used."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/60">
            <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
              <p>Use the service for lawful content planning, publishing preparation, and analytics review.</p>
              <p>Do not upload or distribute content that violates third-party rights or platform policies.</p>
              <p>Future TikTok publishing integrations will be subject to separate platform requirements and approval.</p>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
