import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Reemplaza esto con la configuración de tu propio proyecto de Firebase.
// Puedes obtener estos datos al crear un proyecto en la consola web de Firebase
// y agregar una aplicación web (</>).
const firebaseConfig = {
  apiKey: "AIzaSyDawOl-BcwFwkA7EnhM1nfXhq37_vNl_yY",
  authDomain: "ricardo-web-7701b.firebaseapp.com",
  projectId: "ricardo-web-7701b",
  storageBucket: "ricardo-web-7701b.firebasestorage.app",
  messagingSenderId: "964906485774",
  appId: "1:964906485774:web:c367f1762a9234a172d45f",
  measurementId: "G-82BF3S2JL8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

