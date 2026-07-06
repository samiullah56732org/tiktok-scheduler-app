import type { Metadata } from "next";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SonnerToaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "TikTok Scheduler",
  description: "TikTok Scheduler Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          {children}
          <SonnerToaster />
        </TooltipProvider>
      </body>
    </html>
  );
}