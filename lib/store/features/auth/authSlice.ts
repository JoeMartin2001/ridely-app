import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface AuthUIState {
  loginForm: {
    phoneNumber: string;
    otpCode: string;
  };
  isLoading: boolean;
  error: string | null;
  biometricsEnabled: boolean;

  session: Session | null;
  authUser: User | null;
}

const initialState: AuthUIState = {
  loginForm: { phoneNumber: "", otpCode: "" },
  isLoading: false,
  error: null,
  biometricsEnabled: false,

  authUser: null,
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
      state.authUser = action.payload.user ?? null;
    },
    clearSession: (state) => {
      state.session = null;
      state.authUser = null;
    },

    updateLoginForm: (
      state,
      action: PayloadAction<Partial<AuthUIState["loginForm"]>>
    ) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuthForm: (state) => {
      state.loginForm = { phoneNumber: "", otpCode: "" };
      state.error = null;
    },
  },
});

export const {
  updateLoginForm,
  setAuthLoading,
  setAuthError,
  clearAuthForm,
  setSession,
  clearSession,
} = authSlice.actions;

export default authSlice.reducer;
