"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LayoutGrid, Upload, CalendarDays, BarChart3, Settings, Sparkles, HelpCircle, BadgeInfo, FileText, ShieldCheck, MessagesSquare, LogOut, ChevronRight } from "lucide-react";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/ai-caption", label: "AI Caption", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

const footerLinks = [
  { href: "/faq", label: "FAQ", icon: MessagesSquare },
  { href: "/about", label: "About", icon: BadgeInfo },
  { href: "/privacy", label: "Privacy", icon: ShieldCheck },
  { href: "/terms", label: "Terms", icon: FileText },
  { href: "/contact", label: "Contact", icon: HelpCircle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isAuthPage = useMemo(() => ["/login"].includes(pathname ?? ""), [pathname]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_28%),linear-gradient(135deg,_#f8fafc,_#fefefe)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="border-b px-5 py-4 text-left">
                    <SheetTitle className="text-lg">TikTok Scheduler</SheetTitle>
                  </SheetHeader>
                  <div className="flex h-full flex-col gap-2 p-4">
                    <nav className="space-y-1">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                          >
                            <Icon className="size-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </nav>
                    <div className="mt-6 space-y-1 border-t pt-4">
                      {footerLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                            <Icon className="size-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div>
                <p className="text-sm font-semibold text-primary">TikTok Scheduler</p>
                <p className="text-sm text-muted-foreground">Plan. Publish. Perform.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Home</Link>
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 size-4" />
                Logout
              </Button>
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-2 py-1.5">
                <Avatar size="sm">
                  <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} />
                  <AvatarFallback>{user?.displayName?.slice(0, 2).toUpperCase() ?? "US"}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium">{user?.displayName ?? "Creator"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email ?? "Signed in"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 gap-6">
          <aside className="hidden w-72 shrink-0 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm lg:block">
            <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-violet-600 p-4 text-primary-foreground">
              <p className="text-sm font-medium">Weekly Performance</p>
              <p className="mt-2 text-3xl font-semibold">+24%</p>
              <p className="mt-1 text-sm text-primary-foreground/80">Strong engagement trend</p>
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" />
                      {item.label}
                    </span>
                    <ChevronRight className="size-4" />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 space-y-1 border-t pt-4">
              {footerLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
