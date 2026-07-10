"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Contact us"
          description="Need help or want to share feedback?"
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70 bg-background/80">
            <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 text-primary"><Mail className="size-4" /><p className="font-medium text-foreground">Get in touch</p></div>
              <p>Email: hello@creatorscheduler.app</p>
              <p>Response time: usually within one business day.</p>
              <p>Support is currently focused on onboarding, product feedback, and authenticated experience improvements.</p>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
