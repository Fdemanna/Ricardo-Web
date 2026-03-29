import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Inicialización diferida de Analytics para mejorar el rendimiento (Web Vitals)
let analytics = null;
if (typeof window !== 'undefined') {
    // Retrasamos la inicialización hasta que el hilo principal esté libre
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            analytics = getAnalytics(app);
        });
    } else {
        setTimeout(() => {
            analytics = getAnalytics(app);
        }, 3000);
    }
}

export { db, auth };

