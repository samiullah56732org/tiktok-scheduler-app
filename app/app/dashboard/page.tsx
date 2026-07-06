"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { getUserProfile, type UserProfile } from "@/app/lib/firestore";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, CalendarDays, Sparkles, UploadCloud, Activity, Clock3, CheckCircle2, Sparkle } from "lucide-react";

const quickActions = [
  { href: "/upload", title: "Upload content", description: "Drop media into the queue", icon: UploadCloud },
  { href: "/calendar", title: "View calendar", description: "Review upcoming posts", icon: CalendarDays },
  { href: "/ai-caption", title: "Generate caption", description: "Create copy fast", icon: Sparkles },
  { href: "/analytics", title: "Open analytics", description: "Track performance", icon: BarChart3 },
];

const activityFeed = [
  { title: "Draft created", description: "New caption concept saved for a product launch", time: "12 mins ago" },
  { title: "Upload queued", description: "Video asset moved to the publishing queue", time: "1 hour ago" },
  { title: "Review scheduled", description: "Calendar updated with a new posting window", time: "Yesterday" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
        router.push("/login");
        return;
      }

      setUser(currentUser);
      setError(null);

      try {
        const fetchedProfile = await getUserProfile(currentUser.uid);
        setProfile(fetchedProfile);
      } catch (err) {
        console.error(err);
        setError("Unable to load your profile right now.");
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-2xl border border-border/70 bg-background/80 px-6 py-5 text-sm text-muted-foreground">
            Loading your workspace...
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {error ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <PageSection
          title={`Welcome back, ${profile?.displayName?.split(" ")[0] ?? user?.displayName?.split(" ")[0] ?? "creator"}`}
          description="Your workspace is ready for your next release."
          action={<Button asChild variant="outline" className="rounded-full"><Link href="/upload">Create new post</Link></Button>}
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[1.5rem] border border-border/70 bg-gradient-to-br from-primary/15 via-background to-violet-600/10 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <Sparkle className="size-4" />
                <p className="text-sm font-medium">Signed in with Google</p>
              </div>
              <p className="mt-2 text-2xl font-semibold">Your content operating system is ready.</p>
              <p className="mt-2 text-sm text-muted-foreground">{profile?.email ?? user?.email ?? "Your account is connected and ready for planning."}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/calendar">Review calendar <ArrowRight className="ml-2 size-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/connect">Connect TikTok <span className="ml-2 text-xs text-muted-foreground">Coming Soon</span></Link>
                </Button>
              </div>
            </div>
            <Card className="border-border/70 bg-background/70">
              <CardHeader>
                <CardTitle>Today&apos;s focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> Prepare 3 short-form assets</div>
                <div className="flex items-center gap-2"><Clock3 className="size-4 text-amber-500" /> Review caption drafts</div>
                <div className="flex items-center gap-2"><Activity className="size-4 text-sky-600" /> Track engagement pulse</div>
              </CardContent>
            </Card>
          </div>
        </PageSection>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Scheduled posts" value="12" description="Planned across the next 7 days" icon={CalendarDays} trend="+3 this week" />
          <MetricCard title="Video assets" value="8" description="Queued and ready for review" icon={UploadCloud} trend="2 new this week" />
          <MetricCard title="AI captions" value="24" description="Generated drafts available" icon={Sparkles} trend="Fast turnaround" />
          <MetricCard title="Engagement" value="8.4%" description="Average engagement rate" icon={BarChart3} trend="Up 14%" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <PageSection title="Quick actions" description="Jump straight into the next task.">
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="rounded-2xl border border-border/70 bg-muted/40 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background">
                    <div className="flex items-center gap-2 text-primary"><Icon className="size-4" /> <span className="font-medium">{item.title}</span></div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </PageSection>

          <PageSection title="Recent activity" description="A snapshot of your latest work.">
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item.title} className="flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3 transition hover:bg-muted/50">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </PageSection>
        </div>
      </div>
    </AppShell>
  );
}