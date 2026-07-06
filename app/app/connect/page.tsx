"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConnectPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Connect TikTok"
          description="Bring your TikTok workflow into the studio once official publishing support is available."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Official TikTok OAuth and publishing APIs are intentionally left as placeholders in this release.</p>
              <p>The experience is ready for a future integration while keeping the current product polished and safe for users.</p>
              <Button className="mt-2">Connect TikTok</Button>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
