import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  authUser: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user ?? null);
        setLoading(false); // just in case this event fires before initial getSession finishes
      }
    );

    // Clean up the subscription
    return () => {
      subscription.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
