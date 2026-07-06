"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BellRing, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Settings"
          description="Tune your workspace preferences, notifications, and account controls."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><BellRing className="size-4" /><CardTitle>Notifications</CardTitle></div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <label className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-3"><input type="checkbox" defaultChecked className="size-4" /> Email digests and reminders</label>
                <label className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-3"><input type="checkbox" className="size-4" /> TikTok integration alerts</label>
                <label className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-3"><input type="checkbox" defaultChecked className="size-4" /> AI caption activity summaries</label>
                <Button className="w-full rounded-full">Save preferences</Button>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><UserCircle2 className="size-4" /><CardTitle>Profile</CardTitle></div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Display name</p>
                  <Input placeholder="Creator name" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Workspace name</p>
                  <Input placeholder="Northstar Studio" />
                </div>
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                  <div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /><p className="font-medium text-foreground">Workspace status</p></div>
                  <p className="mt-2 text-sm text-muted-foreground">Your workspace is ready for preview mode and future production rollout.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary"><ShieldCheck className="size-4" /><CardTitle>Account controls</CardTitle></div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-foreground">Secure access</p>
                <p>Your Google sign-in remains the primary authentication method.</p>
              </div>
              <Button variant="outline" className="rounded-full">Review account safety</Button>
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
