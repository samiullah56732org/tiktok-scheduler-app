"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const schedule = [
  { date: "Mon, Jul 8", title: "Behind the scenes", status: "Planned" },
  { date: "Wed, Jul 10", title: "Product walkthrough", status: "Review" },
  { date: "Fri, Jul 12", title: "Community pulse", status: "Queued" },
];

export default function CalendarPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Content calendar"
          description="Plan your publishing cadence and keep your campaign timeline visible."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-0">
              {schedule.map((item) => (
                <div key={item.date} className="flex flex-col gap-2 border-b border-border/70 p-4 last:border-none sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{item.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">Publishing automation is coming soon. For now, this calendar is a polished planning surface.</p>
        </PageSection>
      </div>
    </AppShell>
  );
}
