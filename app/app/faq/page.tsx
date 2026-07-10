"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  {
    title: "How does the scheduler work?",
    answer: "Create content plans, assign publishing windows, and review your upcoming schedule from one dashboard.",
  },
  {
    title: "Can I use AI captions?",
    answer: "Yes. The AI caption generator produces draft copy you can refine before scheduling your content.",
  },
  {
    title: "Is TikTok publishing live yet?",
    answer: "TikTok OAuth and publishing APIs are intentionally reserved for a future release. This experience uses placeholders for now.",
  },
];

export default function FAQPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="Frequently asked questions"
          description="Everything you need to know about getting started with Creator Scheduler."
          action={<Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>}
        >
          <div className="grid gap-4">
            {questions.map((item) => (
              <Card key={item.title} className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}
