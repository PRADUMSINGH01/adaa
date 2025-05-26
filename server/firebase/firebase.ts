// server/firebase/firebase.ts
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";
import { getAuth, Auth } from "firebase-admin/auth";

// Service account interface matching Firebase's JSON structure
interface ServiceAccount {
  project_id: string;
  client_email: string;
  private_key: string;
}

// Environment variable validation
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is missing");
}

// Parse service account with proper typing
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
) as ServiceAccount;

let app: App;
let db: Firestore;
let storage: Storage;
let auth: Auth;

if (!getApps().length) {
  try {
    app = initializeApp({
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw new Error("Failed to initialize Firebase services");
  }
} else {
  app = getApps()[0];
}

// Initialize services
db = getFirestore(app);
storage = getStorage(app);
auth = getAuth(app);

// Configure Firestore settings if needed
db.settings({
  ignoreUndefinedProperties: true,
});

// Export core services and utilities
export { db, storage, auth, FieldValue };
export type { Firestore, Storage, Auth };
