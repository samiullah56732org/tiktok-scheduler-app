"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_30%),linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--muted))_100%)] px-4 py-10">
      <Card className="w-full max-w-lg border-border/70 bg-background/80 shadow-xl">
        <CardContent className="space-y-4 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Unexpected error</p>
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">A runtime issue interrupted the page. Please retry or return to the dashboard.</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => reset()}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
