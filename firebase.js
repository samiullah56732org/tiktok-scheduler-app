// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBhZw0ziJitaFlo2LavvbtXya_dhHEp2Qc",
    authDomain: "tiktok-scheduler-20502.firebaseapp.com",
    projectId: "tiktok-scheduler-20502",
    storageBucket: "tiktok-scheduler-20502.firebasestorage.app",
    messagingSenderId: "414120237186",
    appId: "1:414120237186:web:9384e0ec47dd0337507c9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
