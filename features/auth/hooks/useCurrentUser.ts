"use client";

import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { db } from "@/lib/firebase";
import { logger } from "@/lib/logger";
import type { User } from "@/shared/types";

export const useCurrentUser = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  return useQuery({
    queryKey: ["user", uid],
    enabled: Boolean(uid && db),
    queryFn: async () => {
      if (!uid || !db) {
        logger.debug("auth/useCurrentUser", "Skipping current user query due to missing uid/db", {
          uid,
        });
        return null;
      }

      logger.info("auth/useCurrentUser", "Fetching current user profile", { uid });
      const snapshot = await getDoc(doc(db, "users", uid));
      const exists = snapshot.exists();
      logger.debug("auth/useCurrentUser", "Current user profile fetch completed", {
        uid,
        exists,
      });
      return exists ? (snapshot.data() as User) : null;
    },
  });
};
