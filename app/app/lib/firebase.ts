import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhZw0ziJitaFlo2LavvbtXya_dhHEp2Qc",
  authDomain: "tiktok-scheduler-20502.firebaseapp.com",
  projectId: "tiktok-scheduler-20502",
  storageBucket: "tiktok-scheduler-20502.firebasestorage.app",
  messagingSenderId: "414120237186",
  appId: "1:414120237186:web:9384e0ec47dd0337507c9b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);