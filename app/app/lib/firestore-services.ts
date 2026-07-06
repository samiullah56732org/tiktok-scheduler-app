import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export type FeedbackEntry = {
  id?: string;
  userId: string;
  message: string;
  createdAt?: unknown;
};

export type NotificationEntry = {
  id?: string;
  userId: string;
  title: string;
  description: string;
  createdAt?: unknown;
  read?: boolean;
};

export async function saveFeedback(userId: string, message: string): Promise<void> {
  await setDoc(doc(collection(db, "feedback")), {
    userId,
    message,
    createdAt: serverTimestamp(),
  });
}

export async function listNotifications(userId: string): Promise<NotificationEntry[]> {
  const q = query(collection(db, "notifications"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({ id: document.id, ...(document.data() as NotificationEntry) }));
}

export async function upsertNotification(userId: string, title: string, description: string): Promise<void> {
  await setDoc(doc(collection(db, "notifications")), {
    userId,
    title,
    description,
    createdAt: serverTimestamp(),
    read: false,
  });
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await updateDoc(doc(db, "notifications", notificationId), { read: true });
}
