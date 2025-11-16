import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { clearSession, setSession } from "../store/features/auth/authSlice";

SplashScreen.preventAutoHideAsync();

type AuthContextType = {
  authUser: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.authUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setSession(session));
      }

      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          dispatch(setSession(session));
        } else {
          dispatch(clearSession());
        }

        setLoading(false); // just in case this event fires before initial getSession finishes
      }
    );

    // Clean up the subscription
    return () => {
      subscription.subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

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
