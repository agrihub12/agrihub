"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { logger } from "@/lib/logger";
import type { User, UserRole } from "@/shared/types";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location?: string;
};

const getFirebaseClients = (): { authClient: Auth; dbClient: Firestore } => {
  if (!isFirebaseConfigured || !auth || !db) {
    logger.error(
      "auth/firebaseAuthHelpers",
      "Firebase client requested without configuration",
    );
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
  }

  logger.debug("auth/firebaseAuthHelpers", "Firebase clients resolved");
  return { authClient: auth, dbClient: db };
};

const writeSessionCookie = (uid: string) => {
  document.cookie = `agrihub_uid=${uid}; Path=/; Max-Age=604800; SameSite=Lax`;
};

const clearSessionCookie = () => {
  document.cookie = "agrihub_uid=; Path=/; Max-Age=0; SameSite=Lax";
};

export const createUserDoc = async (
  uid: string,
  data: Omit<User, "uid" | "createdAt" | "updatedAt">,
) => {
  logger.info("auth/firebaseAuthHelpers", "Creating user profile document", { uid });
  const { dbClient } = getFirebaseClients();
  const ref = doc(dbClient, "users", uid);
  await setDoc(ref, {
    uid,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  logger.debug("auth/firebaseAuthHelpers", "User profile document created", { uid });
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  userData: Omit<SignupPayload, "email" | "password">,
): Promise<UserCredential> => {
  logger.info("auth/firebaseAuthHelpers", "Signing up with email", { email });
  const { authClient } = getFirebaseClients();
  const credential = await createUserWithEmailAndPassword(
    authClient,
    email,
    password,
  );

  await updateProfile(credential.user, { displayName: userData.name });
  await createUserDoc(credential.user.uid, {
    name: userData.name,
    email,
    role: userData.role,
    location: userData.location,
    photoURL: credential.user.photoURL,
  });

  writeSessionCookie(credential.user.uid);
  logger.info("auth/firebaseAuthHelpers", "Signup completed", {
    uid: credential.user.uid,
    role: userData.role,
  });
  return credential;
};

export const signInWithEmail = async (email: string, password: string) => {
  logger.info("auth/firebaseAuthHelpers", "Signing in with email", { email });
  const { authClient } = getFirebaseClients();
  const credential = await signInWithEmailAndPassword(
    authClient,
    email,
    password,
  );
  writeSessionCookie(credential.user.uid);
  logger.info("auth/firebaseAuthHelpers", "Email sign-in completed", {
    uid: credential.user.uid,
  });
  return credential;
};

export const signInWithGoogle = async () => {
  logger.info("auth/firebaseAuthHelpers", "Signing in with Google");
  const { authClient, dbClient } = getFirebaseClients();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(authClient, provider);
  const ref = doc(dbClient, "users", credential.user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    logger.debug("auth/firebaseAuthHelpers", "No profile for Google user, creating one", {
      uid: credential.user.uid,
    });
    await createUserDoc(credential.user.uid, {
      name: credential.user.displayName ?? "Google User",
      email: credential.user.email ?? "",
      role: "buyer",
      location: "",
      photoURL: credential.user.photoURL,
    });
  }

  writeSessionCookie(credential.user.uid);
  logger.info("auth/firebaseAuthHelpers", "Google sign-in completed", {
    uid: credential.user.uid,
  });
  return credential;
};

export const signOut = async () => {
  logger.info("auth/firebaseAuthHelpers", "Signing out current user");
  const { authClient } = getFirebaseClients();
  await firebaseSignOut(authClient);
  clearSessionCookie();
  logger.debug("auth/firebaseAuthHelpers", "Sign out completed");
};
