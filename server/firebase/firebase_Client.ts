// lib/firebase-client.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwYndAcB0_w_pgSdII9AEUMwQ3E_HfCdg",
  authDomain: "adda-fa1b0.firebaseapp.com",
  projectId: "adda-fa1b0",
  storageBucket: "adda-fa1b0.firebasestorage.app",
  messagingSenderId: "9961055320",
  appId: "1:9961055320:web:dbd73f9e034483c38d162d",
  measurementId: "G-938PTMHXB7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
async function signInWithGoogle(): Promise<{
  user?: User;
  token?: string;
  error?: string;
}> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Verify token with backend
async function verifyTokenWithBackend(token: string): Promise<any> {
  try {
    const response = await fetch("https://wkv6mt-3000.csb.app/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Verification error: ${(error as Error).message}`);
  }
}

export { auth, signInWithGoogle, verifyTokenWithBackend };
