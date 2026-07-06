"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/app/lib/firebase";
import {
  deleteCaptionHistory,
  generateCaptionMock,
  generateEmojiSuggestions,
  generateHashtagMock,
  listCaptionHistory,
  rewriteCaptionMock,
  saveCaptionHistory,
  toggleCaptionFavorite,
  translateCaptionMock,
  type AIGenerationResult,
  type CaptionHistoryEntry,
  type CaptionLanguage,
  type CaptionTone,
} from "@/app/lib/ai-service";
import { AppShell } from "@/components/app-shell";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Heart, Trash2, Wand2, MessageSquareQuote, Hash, SmilePlus, Languages } from "lucide-react";

const toneOptions: CaptionTone[] = ["Professional", "Funny", "Casual", "Viral", "Short", "Long"];
const languageOptions: CaptionLanguage[] = ["English", "Urdu", "Spanish", "French", "German"];

type ActiveTab = "caption" | "hashtags" | "rewrite" | "emoji" | "translate" | "history";

export function AIStudioShell() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("caption");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<CaptionHistoryEntry[]>([]);
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState<CaptionTone>("Professional");
  const [language, setLanguage] = useState<CaptionLanguage>("English");
  const [captionInput, setCaptionInput] = useState("");
  const [rewriteStyle, setRewriteStyle] = useState<CaptionTone>("Professional");
  const [translationTarget, setTranslationTarget] = useState<CaptionLanguage>("Urdu");
  const [generated, setGenerated] = useState<AIGenerationResult | null>(null);
  const [lastCaption, setLastCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CaptionHistoryEntry | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUserId(currentUser.uid);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const loadHistory = async () => {
      try {
        setLoading(true);
        const entries = await listCaptionHistory(userId);
        setHistory(entries);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load your caption history.");
      } finally {
        setLoading(false);
      }
    };

    void loadHistory();
  }, [userId]);

  const summary = useMemo(() => {
    const favorites = history.filter((entry) => entry.favorite).length;
    const latest = history[0]?.caption ?? "Create your first caption to see it here.";
    return { total: history.length, favorites, latest };
  }, [history]);

  const generateCaption = async () => {
    if (!userId) {
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("Please sign in again to save your caption.");
      return;
    }

    setIsGenerating(true);
    try {
      const result = generateCaptionMock({ topic, audience, tone, language });
      setGenerated(result);
      setLastCaption(result.caption);
      await saveCaptionHistory(currentUser, { prompt: `topic:${topic}; audience:${audience}; tone:${tone}; language:${language}`, caption: result.caption, hashtags: result.hashtags.join(" ") });
      const refreshed = await listCaptionHistory(userId);
      setHistory(refreshed);
      toast.success("Caption generated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to generate a caption right now.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHashtags = () => {
    if (!topic) {
      toast.error("Add a topic to generate hashtags.");
      return;
    }

    const hashtags = generateHashtagMock(topic);
    setGenerated({ caption: lastCaption, hashtags, emojiSuggestions: generated?.emojiSuggestions ?? [] });
    toast.success("Hashtags generated.");
  };

  const generateRewritten = () => {
    const rewritten = rewriteCaptionMock(captionInput || lastCaption, rewriteStyle);
    setGenerated((current) => ({ caption: rewritten, hashtags: current?.hashtags ?? [], emojiSuggestions: current?.emojiSuggestions ?? [] }));
    toast.success("Caption rewritten.");
  };

  const generateEmojis = () => {
    const suggestions = generateEmojiSuggestions(topic || lastCaption);
    setGenerated((current) => ({ caption: current?.caption ?? lastCaption, hashtags: current?.hashtags ?? [], emojiSuggestions: suggestions }));
    toast.success("Emoji suggestions added.");
  };

  const generateTranslation = () => {
    const translated = translateCaptionMock(lastCaption || captionInput, translationTarget);
    setGenerated((current) => ({ caption: translated, hashtags: current?.hashtags ?? [], emojiSuggestions: current?.emojiSuggestions ?? [] }));
    toast.success("Translation ready.");
  };

  const handleFavorite = async (entry: CaptionHistoryEntry) => {
    if (!entry.id) {
      return;
    }

    try {
      await toggleCaptionFavorite(entry.id, !entry.favorite);
      const refreshed = await listCaptionHistory(userId!);
      setHistory(refreshed);
      toast.success("Favorite updated.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update favorites.");
    }
  };

  const handleDelete = async () => {
    if (!selectedEntry?.id) {
      return;
    }

    try {
      await deleteCaptionHistory(selectedEntry.id);
      const refreshed = await listCaptionHistory(userId!);
      setHistory(refreshed);
      toast.success("Caption removed.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete the caption.");
    } finally {
      setDeleteOpen(false);
      setSelectedEntry(null);
    }
  };

  const cards = [
    { key: "caption", label: "Caption Generator", icon: Wand2, description: "Create premium captions from a topic and audience." },
    { key: "hashtags", label: "Hashtag Generator", icon: Hash, description: "Generate trend-aware hashtags for each concept." },
    { key: "emoji", label: "Emoji Generator", icon: SmilePlus, description: "Add playful and relevant emoji cues." },
    { key: "rewrite", label: "Rewrite Caption", icon: MessageSquareQuote, description: "Adjust tone and structure with one click." },
    { key: "translate", label: "Caption Translator", icon: Languages, description: "Preview translations for new markets." },
    { key: "history", label: "Saved Captions", icon: Heart, description: "Review favorite captions and history." },
  ] as const;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageSection
          title="AI Content Studio"
          description="Generate polished captions, hashtags, translations, and creative variants with mock AI responses ready for future OpenAI integration."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              const active = activeTab === card.key;
              return (
                <button key={card.key} onClick={() => setActiveTab(card.key)} className={`rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-primary/10" : "border-border/70 bg-background/80 hover:border-primary/40"}`}>
                  <div className="flex items-center gap-2 text-primary"><Icon className="size-4" /> <span className="font-medium">{card.label}</span></div>
                  <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4"><p className="text-sm text-muted-foreground">Total captions generated</p>{loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-2xl font-semibold">{summary.total}</p>}</CardContent>
            </Card>
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4"><p className="text-sm text-muted-foreground">Favorite captions</p>{loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-2xl font-semibold">{summary.favorites}</p>}</CardContent>
            </Card>
            <Card className="border-border/70 bg-background/80">
              <CardContent className="p-4"><p className="text-sm text-muted-foreground">Last generated caption</p>{loading ? <Skeleton className="mt-2 h-8 w-16" /> : <p className="mt-2 text-sm font-medium">{summary.latest}</p>}</CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> {activeTab === "history" ? "Saved captions" : "Studio controls"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTab === "caption" ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2"><label className="text-sm font-medium">Video topic</label><Input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="New product launch" /></div>
                      <div className="space-y-2"><label className="text-sm font-medium">Audience</label><Input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="Gen Z founders" /></div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2"><label className="text-sm font-medium">Tone</label><select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={tone} onChange={(event) => setTone(event.target.value as CaptionTone)}>{toneOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                      <div className="space-y-2"><label className="text-sm font-medium">Language</label><select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={language} onChange={(event) => setLanguage(event.target.value as CaptionLanguage)}>{languageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                    </div>
                    <Button className="w-full" onClick={generateCaption} disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate caption"}</Button>
                  </>
                ) : null}

                {activeTab === "hashtags" ? (
                  <>
                    <div className="space-y-2"><label className="text-sm font-medium">Topic</label><Input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Behind the scenes" /></div>
                    <Button className="w-full" onClick={generateHashtags}>Generate hashtags</Button>
                  </>
                ) : null}

                {activeTab === "rewrite" ? (
                  <>
                    <div className="space-y-2"><label className="text-sm font-medium">Original caption</label><Textarea value={captionInput} onChange={(event) => setCaptionInput(event.target.value)} placeholder="Paste or edit your caption" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Style</label><select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={rewriteStyle} onChange={(event) => setRewriteStyle(event.target.value as CaptionTone)}>{toneOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                    <Button className="w-full" onClick={generateRewritten}>Rewrite caption</Button>
                  </>
                ) : null}

                {activeTab === "emoji" ? (
                  <>
                    <div className="space-y-2"><label className="text-sm font-medium">Topic</label><Input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Product reveal" /></div>
                    <Button className="w-full" onClick={generateEmojis}>Suggest emojis</Button>
                  </>
                ) : null}

                {activeTab === "translate" ? (
                  <>
                    <div className="space-y-2"><label className="text-sm font-medium">Target language</label><select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={translationTarget} onChange={(event) => setTranslationTarget(event.target.value as CaptionLanguage)}>{languageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                    <Button className="w-full" onClick={generateTranslation}>Translate caption</Button>
                  </>
                ) : null}

                {activeTab === "history" ? (
                  <div className="space-y-2 text-sm text-muted-foreground">Your saved and recent captions will appear here for easy reuse.</div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-background/80">
              <CardHeader>
                <CardTitle>Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generated ? (
                  <>
                    <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                      <p className="text-sm font-medium">Caption</p>
                      <p className="mt-2 text-sm text-muted-foreground">{generated.caption}</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                      <p className="text-sm font-medium">Hashtags</p>
                      <p className="mt-2 text-sm text-muted-foreground">{generated.hashtags.join(" ")}</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                      <p className="text-sm font-medium">Emoji suggestions</p>
                      <p className="mt-2 text-sm text-muted-foreground">{generated.emojiSuggestions.join(" ")}</p>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">Generate a caption to preview the studio output here.</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/70 bg-background/80">
            <CardHeader>
              <CardTitle>Caption history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
              ) : history.length ? history.slice(0, 6).map((entry) => (
                <div key={entry.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">{entry.caption}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{entry.hashtags}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleFavorite(entry)}>
                      <Heart className={`mr-2 size-3 ${entry.favorite ? "fill-current text-rose-500" : ""}`} /> {entry.favorite ? "Saved" : "Save"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => { setSelectedEntry(entry); setDeleteOpen(true); }}>
                      <Trash2 className="mr-2 size-3" /> Remove
                    </Button>
                  </div>
                </div>
              )) : <p className="text-sm text-muted-foreground">No captions saved yet. Generate your first one and it will appear here.</p>}
            </CardContent>
          </Card>
        </PageSection>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove caption?</DialogTitle>
              <DialogDescription>This will delete the saved caption from your history.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
