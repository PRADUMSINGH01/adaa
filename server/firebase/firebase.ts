import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string
);

let db: Firestore;

if (!getApps().length) {
  const app: App = initializeApp({
    credential: cert(serviceAccount),
  });
  db = getFirestore(app);
} else {
  db = getFirestore();
}

export { db, FieldValue };
