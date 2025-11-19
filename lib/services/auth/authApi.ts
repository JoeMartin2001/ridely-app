// services/auth/authApi.ts
import { EdgeFns } from "@/lib/types/edge-functions";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { authService } from "..";
import { usersApi } from "../users/usersApi";

type QueryError = {
  status: number | string;
  data: {
    message: string;
    name: string;
  };
};

const formatError = (error: unknown): QueryError => {
  const status =
    typeof (error as AuthError | undefined)?.status !== "undefined"
      ? (error as AuthError).status ?? "AUTH_ERROR"
      : "UNKNOWN_ERROR";

  if (error instanceof Error) {
    return {
      status,
      data: {
        message: error.message,
        name: error.name,
      },
    };
  }

  return {
    status,
    data: {
      message: "An unknown error occurred",
      name: "UnknownError",
    },
  };
};

const toVoidSuccess = () => ({ data: null as unknown as void });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    /**
     * sendPhoneOTP to send a phone OTP
     * @param phoneNumber Phone number to send OTP to
     * @returns SendPhoneOTPResponse
     */
    sendPhoneOTP: builder.mutation<
      EdgeFns.SendPhoneOtpOutput,
      { phoneNumber: string },
      { phoneNumber: string }
    >({
      queryFn: async ({ phoneNumber }) => {
        try {
          const result = await authService.sendPhoneOTP(phoneNumber);

          return { data: result };
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      extraOptions: { retry: false },
    }),

    /**
     * verifyPhoneAndLogin to verify phone and login
     * @param phoneNumber Phone number to verify
     * @param otpCode OTP code to verify
     * @returns Session or null if failed to verify phone and login
     */
    verifyPhoneAndLogin: builder.mutation<
      EdgeFns.VerifyPhoneOtpOutput,
      { phoneNumber: string; otpCode: string }
    >({
      queryFn: async ({ phoneNumber, otpCode }) => {
        try {
          const session = await authService.verifyPhoneAndLogin(
            phoneNumber,
            otpCode
          );
          return { data: session };
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      extraOptions: { retry: false },
    }),

    /**
     * signIn with email and password
     * @param email Email to sign in with
     * @param password Password to sign in with
     * @returns Session
     */
    signIn: builder.mutation<Session, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const data = await authService.signIn(email, password);
          return { data };
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      invalidatesTags: ["Auth"],
      extraOptions: { retry: false },
    }),

    /**
     * signUp with email and password
     * @param email Email to sign up with
     * @param password Password to sign up with
     * @param userData User data to sign up with
     * @returns void
     */
    signUp: builder.mutation<
      void,
      { email: string; password: string; userData: any }
    >({
      queryFn: async ({ email, password, userData }) => {
        try {
          await authService.signUp(email, password, userData);
          return toVoidSuccess();
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      extraOptions: { retry: false },
    }),

    /**
     * signOut to sign out the user
     * @returns void
     */
    signOut: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }) => {
        try {
          await authService.signOut();

          // Invalidate and reset user queries to clear cached data
          dispatch(usersApi.util.invalidateTags(["User"]));
          dispatch(usersApi.util.resetApiState());

          return toVoidSuccess();
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      invalidatesTags: ["Auth"],
      extraOptions: { retry: false },
    }),

    /**
     * getCurrentUser to get the current user
     * @returns User or null if failed to get current user
     */
    getCurrentUser: builder.query<User | null, void>({
      queryFn: async () => {
        try {
          const data = await authService.getCurrentUser();
          return { data };
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      providesTags: ["Auth"],
      extraOptions: { retry: false },
    }),

    /**
     * signInWithTelegram to sign in with Telegram
     * @returns Session or null if failed to sign in with Telegram
     */
    signInWithTelegram: builder.mutation<
      EdgeFns.SignInWithTelegramOutput,
      void
    >({
      queryFn: async () => {
        try {
          const session = await authService.signInWithTelegram();
          return { data: session };
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      extraOptions: { retry: false },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetCurrentUserQuery,
  useSendPhoneOTPMutation,
  useVerifyPhoneAndLoginMutation,
  useSignInWithTelegramMutation,
} = authApi;
