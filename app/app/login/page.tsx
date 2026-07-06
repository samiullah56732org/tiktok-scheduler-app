"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { ensureUserProfile, ensureUserSettings, createActivity } from "@/app/lib/firestore";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    const provider = new GoogleAuthProvider();

    setIsSigningIn(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await ensureUserProfile(user);
      await ensureUserSettings(user.uid);
      await createActivity(user.uid, "signed_in");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <AppShell>
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border/70 bg-background/85 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-6" />
            </div>
            <CardTitle className="text-2xl">Welcome to TikTok Scheduler</CardTitle>
            <CardDescription>Sign in with Google to access your planning workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={login} className="w-full" disabled={isSigningIn}>
              {isSigningIn ? "Signing in..." : "Continue with Google"}
            </Button>
            {error ? <p className="text-center text-sm text-destructive">{error}</p> : null}
            <p className="text-center text-sm text-muted-foreground">
              Your existing Firebase authentication remains active and protected.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}