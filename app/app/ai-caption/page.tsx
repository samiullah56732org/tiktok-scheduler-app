"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AICaptionPage() {
  const [caption, setCaption] = useState("");

  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="AI caption generator"
          description="Turn a quick idea into a polished caption draft."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <textarea
                  rows={8}
                  className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe your video and the tone you want..."
                />
                <Button onClick={() => setCaption("🔥 This drop is built to spark conversation. Keep it authentic, punchy, and worth saving. #TikTok #CreatorTips #ComingSoon")}>Generate caption</Button>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{caption || "Your generated caption will appear here."}</p>
                <p className="rounded-xl border border-dashed border-border/70 p-3 text-xs">AI captioning is currently in preview. This experience uses a placeholder message while the backend is being prepared.</p>
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}
