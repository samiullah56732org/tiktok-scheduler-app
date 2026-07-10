import type { Metadata } from "next";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SonnerToaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Creator Scheduler",
    template: "%s | Creator Scheduler",
  },
  description:
    "Creator Scheduler helps creators plan, publish, and optimize short-form content from one central workspace.",
  openGraph: {
    title: "Creator Scheduler",
    description:
      "Creator Scheduler helps creators plan, publish, and optimize short-form content from one central workspace.",
    type: "website",
    locale: "en_US",
    siteName: "Creator Scheduler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Scheduler",
    description:
      "Creator Scheduler helps creators plan, publish, and optimize short-form content from one central workspace.",
  },
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