"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UploadPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Upload content"
          description="Prepare assets for your next short-form release."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Media upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-dashed border-border/80 p-6 text-center text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Drop your video here</p>
                  <p className="mt-2">MP4, MOV, and other common formats supported in the next release.</p>
                </div>
                <Input type="file" accept="video/*" />
                <Button className="w-full">Queue upload <span className="ml-2 text-xs text-primary-foreground/80">Coming Soon</span></Button>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Post details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Title</p>
                <Input placeholder="Summer launch teaser" />
                <p>Caption</p>
                <Input placeholder="Craft your narrative" />
                <p>Publish date</p>
                <Input type="date" />
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}