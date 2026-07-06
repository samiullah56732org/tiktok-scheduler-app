"use client";

import { SchedulingShell } from "@/components/scheduling/scheduling-shell";

export default function CalendarPage() {
  return (
    <SchedulingShell
      mode="calendar"
      title="Content calendar"
      description="Review your scheduled posts grouped by date and keep your publishing cadence visible."
    />
  );
}
