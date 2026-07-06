import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
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
  caption: string;
  scheduledDate: string;
  status: ScheduledPostStatus;
  createdAt?: unknown;
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

export async function createScheduledPost(post: ScheduledPost): Promise<ScheduledPost> {
  const docRef = await addDoc(collection(db, "scheduledPosts"), {
    ...post,
    createdAt: serverTimestamp(),
  });

  return { ...post, id: docRef.id };
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
