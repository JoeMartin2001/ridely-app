import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUIState {
  loginForm: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  isLoading: boolean;
  error: string | null;
  biometricsEnabled: boolean;
}

const initialState: AuthUIState = {
  loginForm: { email: "", password: "", rememberMe: false },
  isLoading: false,
  error: null,
  biometricsEnabled: false,
};

export const authSlice = createSlice({
  name: "authUI",
  initialState,
  reducers: {
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
      state.loginForm = { email: "", password: "", rememberMe: false };
      state.error = null;
    },
  },
});

export const { updateLoginForm, setAuthLoading, setAuthError, clearAuthForm } =
  authSlice.actions;

export default authSlice.reducer;
