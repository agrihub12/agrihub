"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logger } from "@/lib/logger";

type AuthContextValue = {
  user: FirebaseUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) {
      logger.warn("auth/useAuth", "Auth listener skipped because Firebase auth is unavailable");
      return;
    }

    logger.info("auth/useAuth", "Subscribing to auth state changes");
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      logger.debug("auth/useAuth", "Auth state changed", { uid: nextUser?.uid ?? null });
      setUser(nextUser);
      setLoading(false);
    });

    return () => {
      logger.info("auth/useAuth", "Unsubscribing from auth state changes");
      unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
