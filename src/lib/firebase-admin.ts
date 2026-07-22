import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

let _adminAuth: Auth | null = null;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin SDK environment variables. " +
        "Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env file.",
    );
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      // The private key comes from the service account JSON.
      // In .env files the newlines are escaped as \n, so we
      // need to replace them with actual newline characters.
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Lazily initialize and return Firebase Admin Auth.
 * This avoids crashing at import time when env vars aren't set.
 */
export function getAdminAuth(): Auth {
  if (!_adminAuth) {
    _adminAuth = getAuth(getAdminApp());
  }
  return _adminAuth;
}
