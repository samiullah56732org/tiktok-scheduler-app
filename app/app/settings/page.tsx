"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Settings"
          description="Manage your workspace preferences and notifications."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <label className="flex items-center gap-3 rounded-xl border border-border/70 p-3"><input type="checkbox" defaultChecked className="size-4" /> Email digests and reminders</label>
                <label className="flex items-center gap-3 rounded-xl border border-border/70 p-3"><input type="checkbox" className="size-4" /> TikTok integration alerts</label>
                <Button className="w-full">Save preferences</Button>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Display name</p>
                <Input placeholder="Creator name" />
                <p>Workspace name</p>
                <Input placeholder="Northstar Studio" />
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}
