// utils/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase config (use environment variables for production)
const firebaseConfig = {
  apiKey: "AIzaSyBaPiXsgPWkuvrUuWpI42hQySxzPFuNGpU",
  authDomain: "rubbyroomchatpro.firebaseapp.com",
  projectId: "rubbyroomchatpro",
  storageBucket: "rubbyroomchatpro.appspot.com", // 🛠️ fixed: should be .app**spot**.com
  messagingSenderId: "1492747967",
  appId: "1:1492747967:web:a4ad38ddacfff008ff280a",
  measurementId: "G-M7GRGHTE6Z"
};

// 🔥 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔗 Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
