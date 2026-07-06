import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/app/lib/firebase";

export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt?: unknown;
  lastLogin?: unknown;
};

export type ScheduledPostStatus = "draft" | "scheduled" | "published";

export type ScheduledPost = {
  id?: string;
  userId: string;
  title: string;
  caption: string;
  hashtags: string;
  notes: string;
  scheduledDate: string;
  scheduledTime: string;
  status: ScheduledPostStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type ActivityEntry = {
  id?: string;
  userId: string;
  action: string;
  timestamp?: unknown;
};

export type UserSettings = {
  userId: string;
  theme: "light" | "dark";
  timezone: string;
  notifications: boolean;
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}

export async function ensureUserProfile(user: User): Promise<UserProfile> {
  const profileRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(profileRef);
  const existingProfile = snapshot.exists() ? (snapshot.data() as Partial<UserProfile>) : null;

  const profilePayload: UserProfile = {
    uid: user.uid,
    displayName: user.displayName ?? existingProfile?.displayName ?? "Creator",
    email: user.email ?? existingProfile?.email ?? "",
    photoURL: user.photoURL ?? existingProfile?.photoURL ?? "",
    createdAt: existingProfile?.createdAt ?? serverTimestamp(),
    lastLogin: serverTimestamp(),
  };

  await setDoc(profileRef, profilePayload, { merge: true });

  return profilePayload;
}

export async function ensureUserSettings(userId: string): Promise<UserSettings> {
  const settingsRef = doc(db, "settings", userId);
  const snapshot = await getDoc(settingsRef);

  if (snapshot.exists()) {
    return snapshot.data() as UserSettings;
  }

  const defaultSettings: UserSettings = {
    userId,
    theme: "light",
    timezone: "UTC",
    notifications: true,
  };

  await setDoc(settingsRef, defaultSettings, { merge: true });

  return defaultSettings;
}

export async function createScheduledPost(post: Omit<ScheduledPost, "id" | "createdAt" | "updatedAt">): Promise<ScheduledPost> {
  const docRef = await addDoc(collection(db, "scheduledPosts"), {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { ...post, id: docRef.id };
}

export async function listScheduledPosts(userId: string): Promise<ScheduledPost[]> {
  const postsQuery = query(
    collection(db, "scheduledPosts"),
    where("userId", "==", userId),
    orderBy("scheduledDate", "asc"),
    orderBy("scheduledTime", "asc")
  );

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<ScheduledPost, "id">),
  }));
}

export async function getScheduledPost(postId: string): Promise<ScheduledPost | null> {
  const snapshot = await getDoc(doc(db, "scheduledPosts", postId));

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...(snapshot.data() as Omit<ScheduledPost, "id">) };
}

export async function updateScheduledPost(postId: string, updates: Partial<ScheduledPost>): Promise<void> {
  await updateDoc(doc(db, "scheduledPosts", postId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteScheduledPost(postId: string): Promise<void> {
  await deleteDoc(doc(db, "scheduledPosts", postId));
}

export function subscribeToScheduledPosts(
  userId: string,
  callback: (posts: ScheduledPost[]) => void
): () => void {
  const postsQuery = query(
    collection(db, "scheduledPosts"),
    where("userId", "==", userId),
    orderBy("scheduledDate", "asc"),
    orderBy("scheduledTime", "asc")
  );

  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<ScheduledPost, "id">),
    }));

    callback(posts);
  });
}

export async function createActivity(userId: string, action: string): Promise<ActivityEntry> {
  const docRef = await addDoc(collection(db, "activities"), {
    userId,
    action,
    timestamp: serverTimestamp(),
  });

  return { id: docRef.id, userId, action };
}

export async function updateUserSettings(userId: string, updates: Partial<UserSettings>): Promise<void> {
  const settingsRef = doc(db, "settings", userId);
  await setDoc(settingsRef, updates, { merge: true });
}
