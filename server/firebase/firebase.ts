import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string
);

let db: Firestore;
let storage: Storage;

if (!getApps().length) {
  const app: App = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  db = getFirestore(app);
  storage = getStorage(app);
} else {
  db = getFirestore();
  storage = getStorage();
}

export { db, storage, FieldValue };
