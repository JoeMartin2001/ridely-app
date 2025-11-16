// services/auth/authApi.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { authService } from "..";
import { SendPhoneOTPResponse } from "./authService";

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
    sendPhoneOTP: builder.mutation<
      SendPhoneOTPResponse,
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

    verifyPhoneAndLogin: builder.mutation<
      Session | null,
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

    signOut: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await authService.signOut();
          return toVoidSuccess();
        } catch (error) {
          return { error: formatError(error) };
        }
      },
      invalidatesTags: ["Auth"],
      extraOptions: { retry: false },
    }),

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

    signInWithTelegram: builder.mutation<Session | null, void>({
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
