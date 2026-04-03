import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Мынаны қостық
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0kCMvcuAxvdj77lFxEP5zTXgBFpOofsI",
  authDomain: "ecolife-kz.firebaseapp.com",
  projectId: "ecolife-kz",
  storageBucket: "ecolife-kz.firebasestorage.app",
  messagingSenderId: "992070873905",
  appId: "1:992070873905:web:4eac38c5fb3c3d6a81b610"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Экспортқа дайындадық
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;