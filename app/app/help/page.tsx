"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Compass, Sparkles, Workflow } from "lucide-react";

const helpItems = [
  { title: "Sign in with Google", description: "Unlock the workspace and access your profile-based planning tools.", icon: Compass },
  { title: "Prepare posts", description: "Use the upload and calendar experiences to structure your publishing plan.", icon: Workflow },
  { title: "Generate AI content", description: "Create captions and hashtags with the mock studio before future AI integrations.", icon: Sparkles },
  { title: "Review insights", description: "Use the analytics and dashboard views to stay on top of performance signals.", icon: BookOpen },
];

export default function HelpPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Help center"
          description="Quick guidance for getting the most out of Creator Scheduler."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <CardTitle className="text-base">Getting started</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {helpItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                    <div className="flex items-center gap-2 text-primary"><Icon className="size-4" /><p className="font-medium text-foreground">{item.title}</p></div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </AppShell>
  );
}
