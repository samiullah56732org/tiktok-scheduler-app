"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/app/lib/firebase";
import {
  createScheduledPost,
  deleteScheduledPost,
  subscribeToScheduledPosts,
  type ScheduledPost,
  updateScheduledPost,
} from "@/app/lib/firestore";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostForm, type PostFormValues } from "@/components/scheduling/post-form";
import { PostList } from "@/components/scheduling/post-list";
import { Sparkles, Trash2 } from "lucide-react";

type SchedulingShellProps = {
  mode?: "upload" | "calendar";
  title: string;
  description: string;
};

export function SchedulingShell({ mode = "upload", title, description }: SchedulingShellProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<ScheduledPost | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        setPosts([]);
        setLoading(false);
        return;
      }

      setUserId(currentUser.uid);
      setLoading(true);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribe = subscribeToScheduledPosts(userId, (nextPosts) => {
      setPosts(nextPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const metrics = useMemo(() => {
    const drafts = posts.filter((post) => post.status === "draft").length;
    const scheduled = posts.filter((post) => post.status === "scheduled").length;
    const published = posts.filter((post) => post.status === "published").length;
    const nextScheduled = [...posts].filter((post) => post.status === "scheduled" || post.status === "published").sort((a, b) => {
      const aKey = `${a.scheduledDate} ${a.scheduledTime}`;
      const bKey = `${b.scheduledDate} ${b.scheduledTime}`;
      return aKey.localeCompare(bKey);
    })[0];

    return { drafts, scheduled, published, nextScheduled };
  }, [posts]);

  const handleCreateOrUpdate = async (values: PostFormValues) => {
    if (!userId) {
      return;
    }

    setIsSaving(true);

    try {
      if (selectedPost?.id) {
        await updateScheduledPost(selectedPost.id, {
          title: values.title,
          caption: values.caption,
          hashtags: values.hashtags,
          notes: values.notes,
          scheduledDate: values.scheduledDate,
          scheduledTime: values.scheduledTime,
          status: values.status,
        });
        toast.success("Post updated successfully.");
      } else {
        await createScheduledPost({
          userId,
          title: values.title,
          caption: values.caption,
          hashtags: values.hashtags,
          notes: values.notes,
          scheduledDate: values.scheduledDate,
          scheduledTime: values.scheduledTime,
          status: values.status,
        });
        toast.success("Post created successfully.");
      }

      setSelectedPost(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to save the post right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteDialog = (post: ScheduledPost) => {
    setPostToDelete(post);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete?.id) {
      return;
    }

    try {
      await deleteScheduledPost(postToDelete.id);
      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete the post right now.");
    } finally {
      setDeleteOpen(false);
      setPostToDelete(null);
    }
  };

  const beginEdit = (post: ScheduledPost) => {
    setSelectedPost(post);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection title={title} description={description} action={<Button asChild variant="outline" className="rounded-full"><a href="/dashboard">Back to dashboard</a></Button>}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Drafts</p>
                {loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-2xl font-semibold">{metrics.drafts}</p>}
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Scheduled</p>
                {loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-2xl font-semibold">{metrics.scheduled}</p>}
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Published</p>
                {loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-2xl font-semibold">{metrics.published}</p>}
              </CardContent>
            </Card>
          </div>

          {mode === "upload" ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
              Video upload will be enabled after TikTok Production approval.
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <PostForm
              initialValues={selectedPost ? {
                title: selectedPost.title,
                caption: selectedPost.caption,
                hashtags: selectedPost.hashtags,
                notes: selectedPost.notes,
                scheduledDate: selectedPost.scheduledDate,
                scheduledTime: selectedPost.scheduledTime,
                status: selectedPost.status,
              } : undefined}
              submitLabel={selectedPost ? "Update post" : "Save post"}
              isSubmitting={isSaving}
              onSubmit={handleCreateOrUpdate}
            />
            <div className="space-y-4">
              <Card className="border-border/70 bg-background/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Next scheduled post</p>
                      {loading ? <Skeleton className="mt-2 h-6 w-40" /> : (
                        metrics.nextScheduled ? (
                          <p className="mt-2 font-semibold">{metrics.nextScheduled.title}</p>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No scheduled post yet.</p>
                        )
                      )}
                    </div>
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <Sparkles className="size-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <PostList posts={posts} onEdit={beginEdit} onDelete={openDeleteDialog} />
              )}
            </div>
          </div>
        </PageSection>

        <Dialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete scheduled post?</DialogTitle>
              <DialogDescription>This action cannot be undone. The post will be removed from your calendar.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash2 className="mr-2 size-4" /> Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
