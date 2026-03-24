import {
  doc,
  getDoc as fbGetDoc,
  setDoc as fbSetDoc,
  updateDoc as fbUpdateDoc,
  collection,
  query as fbQuery,
  where as fbWhere,
  type DocumentData,
  type Firestore,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { logger } from "@/lib/logger";

const getDbClient = (): Firestore => {
  if (!db) {
    logger.error("lib/firestore", "Firestore requested without configuration");
    throw new Error(
      "Firebase Firestore is not configured. Add NEXT_PUBLIC_FIREBASE_* values.",
    );
  }
  logger.debug("lib/firestore", "Firestore client resolved");
  return db;
};

export const getDocRef = (path: string) => doc(getDbClient(), path);

export const getDoc = async <T>(path: string): Promise<T | null> => {
  logger.info("lib/firestore", "Reading document", { path });
  const snapshot = await fbGetDoc(getDocRef(path));
  const exists = snapshot.exists();
  logger.debug("lib/firestore", "Read document result", { path, exists });
  return exists ? (snapshot.data() as T) : null;
};

export const setDoc = async <T extends DocumentData>(
  path: string,
  data: T,
) => {
  logger.info("lib/firestore", "Writing document", { path });
  await fbSetDoc(getDocRef(path), data);
  logger.debug("lib/firestore", "Write document completed", { path });
};

export const updateDoc = async <T extends DocumentData>(
  path: string,
  data: Partial<T>,
) => {
  logger.info("lib/firestore", "Updating document", { path });
  await fbUpdateDoc(getDocRef(path), data as DocumentData);
  logger.debug("lib/firestore", "Update document completed", { path });
};

export const getCollection = (path: string) => collection(getDbClient(), path);

export const query = (path: string, ...constraints: QueryConstraint[]) =>
  fbQuery(getCollection(path), ...constraints);

export const where = fbWhere;
