"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Contact us"
          description="Need help or want to share feedback?"
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/60">
            <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
              <p>Email: hello@tiktokscheduler.app</p>
              <p>Response time: usually within one business day.</p>
              <p>Support is currently focused on onboarding, product feedback, and authenticated experience improvements.</p>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
