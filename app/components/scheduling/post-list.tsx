"use client";

import { useMemo } from "react";
import { CalendarDays, Clock3, Edit3, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ScheduledPost } from "@/app/lib/firestore";

type PostListProps = {
  posts: ScheduledPost[];
  onEdit: (post: ScheduledPost) => void;
  onDelete: (post: ScheduledPost) => void;
};

export function PostList({ posts, onEdit, onDelete }: PostListProps) {
  const grouped = useMemo(() => {
    return posts.reduce<Record<string, ScheduledPost[]>>((accumulator, post) => {
      const key = post.scheduledDate;
      accumulator[key] = accumulator[key] ?? [];
      accumulator[key].push(post);
      return accumulator;
    }, {});
  }, [posts]);

  if (!posts.length) {
    return (
      <Card className="border-border/70 bg-background/80">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          No scheduled posts yet. Create your first post to start planning.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([date, datePosts]) => (
        <Card key={date} className="border-border/70 bg-background/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="size-4 text-primary" />
              {date}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {datePosts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{post.title}</p>
                      <Badge variant="secondary">{post.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.caption}</p>
                    {post.hashtags ? <p className="text-sm text-primary">{post.hashtags}</p> : null}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock3 className="size-3" /> {post.scheduledTime}</span>
                      {post.notes ? <span>{post.notes}</span> : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                      <Edit3 className="mr-2 size-3" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(post)}>
                      <Trash2 className="mr-2 size-3" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
