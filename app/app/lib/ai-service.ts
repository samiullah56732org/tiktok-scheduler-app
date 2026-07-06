import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { User } from "firebase/auth";

export type CaptionTone = "Professional" | "Funny" | "Casual" | "Viral" | "Short" | "Long";
export type CaptionLanguage = "English" | "Urdu" | "Spanish" | "French" | "German";

export type CaptionHistoryEntry = {
  id?: string;
  userId: string;
  prompt: string;
  caption: string;
  hashtags: string;
  createdAt?: unknown;
  favorite?: boolean;
};

export type AIGenerationResult = {
  caption: string;
  hashtags: string[];
  emojiSuggestions: string[];
};

const mockToneMap: Record<string, string> = {
  Professional: "polished and confident",
  Funny: "playful and witty",
  Casual: "relaxed and conversational",
  Viral: "high-energy and trend-aware",
  Short: "tight and punchy",
  Long: "rich and descriptive",
};

const mockLanguageMap: Record<string, string> = {
  English: "English",
  Urdu: "Urdu",
  Spanish: "Español",
  French: "Français",
  German: "Deutsch",
};

export function generateCaptionMock(payload: {
  topic: string;
  audience: string;
  tone: CaptionTone;
  language: CaptionLanguage;
}): AIGenerationResult {
  const toneStyle = mockToneMap[payload.tone] ?? "balanced";
  const languageLabel = mockLanguageMap[payload.language] ?? payload.language;
  const topicLabel = payload.topic.trim() || "your latest creative drop";
  const audienceLabel = payload.audience.trim() || "a broad audience";

  return {
    caption: `This ${topicLabel} is crafted for ${audienceLabel} with a ${toneStyle} voice in ${languageLabel}. It blends momentum, personality, and a clear hook so the message feels premium and ready to publish.`,
    hashtags: [
      "#creatorstudio",
      "#contentstrategy",
      "#shortform",
      "#socialmedia",
      "#viralcontent",
      "#marketing",
      "#brandvoice",
      "#contentcreation",
      "#tiktokgrowth",
      "#trendaware",
    ].slice(0, 10),
    emojiSuggestions: ["✨", "🚀", "🔥", "📈", "🎯"],
  };
}

export function generateHashtagMock(topic: string): string[] {
  const normalizedTopic = topic.trim().toLowerCase().replace(/\s+/g, "-");
  return [
    `#${normalizedTopic || "content"}`,
    "#creatorlife",
    "#contentstrategy",
    "#shortform",
    "#socialgrowth",
    "#viralideas",
    "#brandbuilding",
    "#marketingtips",
    "#digitalcreator",
    "#tiktokcontent",
  ];
}

export function generateEmojiSuggestions(topic: string): string[] {
  const baseSuggestions = ["✨", "🔥", "🚀", "💡", "📈", "🎯", "💬", "🎬", "🌟", "⚡"];
  return topic.trim() ? baseSuggestions.slice(0, 5) : baseSuggestions.slice(0, 4);
}

export function rewriteCaptionMock(caption: string, style: CaptionTone): string {
  const base = caption.trim() || "Your next post deserves a sharper story.";
  const styleLabel = mockToneMap[style] ?? "balanced";
  return `${base} This version leans into a ${styleLabel} tone with a crisp hook and a stronger CTA.`;
}

export function translateCaptionMock(caption: string, language: CaptionLanguage): string {
  const fallback = caption.trim() || "Your content is ready for a fresh audience.";
  const translations: Record<string, string> = {
    English: fallback,
    Urdu: `یہ متن آپ کے نیا سامعین کے لیے تیار ہے: ${fallback}`,
    Spanish: `Este texto está listo para una nueva audiencia: ${fallback}`,
    French: `Ce texte est prêt pour une nouvelle audience : ${fallback}`,
    German: `Dieser Text ist bereit für ein neues Publikum: ${fallback}`,
  };

  return translations[language] ?? fallback;
}

export async function saveCaptionHistory(user: User, payload: Omit<CaptionHistoryEntry, "userId" | "createdAt" | "favorite">): Promise<void> {
  await addDoc(collection(db, "captionHistory"), {
    userId: user.uid,
    ...payload,
    createdAt: new Date().toISOString(),
    favorite: false,
  });
}

export async function listCaptionHistory(userId: string): Promise<CaptionHistoryEntry[]> {
  const historyQuery = query(
    collection(db, "captionHistory"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(historyQuery);
  return snapshot.docs.map((document) => ({ id: document.id, ...(document.data() as CaptionHistoryEntry) }));
}

export async function toggleCaptionFavorite(entryId: string, favorite: boolean): Promise<void> {
  await updateDoc(doc(db, "captionHistory", entryId), { favorite });
}

export async function deleteCaptionHistory(entryId: string): Promise<void> {
  await deleteDoc(doc(db, "captionHistory", entryId));
}
