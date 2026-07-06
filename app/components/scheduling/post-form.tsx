"use client";

import { useState } from "react";
import { CalendarDays, Clock3, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ScheduledPostStatus } from "@/app/lib/firestore";

const statusOptions: ScheduledPostStatus[] = ["draft", "scheduled", "published"];

export type PostFormValues = {
  title: string;
  caption: string;
  hashtags: string;
  notes: string;
  scheduledDate: string;
  scheduledTime: string;
  status: ScheduledPostStatus;
};

type PostFormProps = {
  initialValues?: PostFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
};

const emptyValues = (initialValues?: PostFormValues): PostFormValues => ({
  title: initialValues?.title ?? "",
  caption: initialValues?.caption ?? "",
  hashtags: initialValues?.hashtags ?? "",
  notes: initialValues?.notes ?? "",
  scheduledDate: initialValues?.scheduledDate ?? "",
  scheduledTime: initialValues?.scheduledTime ?? "",
  status: initialValues?.status ?? "draft",
});

export function PostForm({ initialValues, submitLabel = "Save post", isSubmitting = false, onSubmit }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(() => emptyValues(initialValues));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <Card className="border-border/70 bg-background/80">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-4" />
          <CardTitle>Post details</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} placeholder="Summer launch teaser" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                value={values.status}
                onChange={(event) => setValues((current) => ({ ...current, status: event.target.value as ScheduledPostStatus }))}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Caption</label>
            <Textarea value={values.caption} onChange={(event) => setValues((current) => ({ ...current, caption: event.target.value }))} placeholder="Write your post caption" required />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hashtags</label>
              <Input value={values.hashtags} onChange={(event) => setValues((current) => ({ ...current, hashtags: event.target.value }))} placeholder="#launch #tiktok" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Input value={values.notes} onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))} placeholder="Creative notes" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="size-4 text-primary" /> Date
              </label>
              <Input type="date" value={values.scheduledDate} onChange={(event) => setValues((current) => ({ ...current, scheduledDate: event.target.value }))} required />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock3 className="size-4 text-primary" /> Time
              </label>
              <Input type="time" value={values.scheduledTime} onChange={(event) => setValues((current) => ({ ...current, scheduledTime: event.target.value }))} required />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="mr-2 size-4 animate-spin" /> Saving...</> : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
