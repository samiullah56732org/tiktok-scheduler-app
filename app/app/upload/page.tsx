"use client";

import { SchedulingShell } from "@/components/scheduling/scheduling-shell";

export default function UploadPage() {
  return (
    <SchedulingShell
      mode="upload"
      title="Upload content"
      description="Prepare your publishing plan, capture your notes, and save the post to Firestore."
    />
  );
}