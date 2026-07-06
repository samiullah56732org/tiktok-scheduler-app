"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const helpItems = [
  "Sign in with Google to unlock the dashboard.",
  "Use the Upload page to prepare video assets and plan your next post.",
  "Generate AI captions for faster content drafting.",
  "Review analytics and calendar views to stay consistent.",
];

export default function HelpPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Help center"
          description="Quick guidance for getting the most out of TikTok Scheduler."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Getting started</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {helpItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
