// services/auth/authApi.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Session, User } from "@supabase/supabase-js";
import { authService } from "..";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signIn: builder.mutation<Session, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const data = await authService.signIn(email, password);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: ["Auth"],
    }),

    signUp: builder.mutation<
      void,
      { email: string; password: string; userData: any }
    >({
      queryFn: async ({ email, password, userData }) => {
        try {
          await authService.signUp(email, password, userData);
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),

    signOut: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await authService.signOut();
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: ["Auth"],
    }),

    getCurrentUser: builder.query<User | null, void>({
      queryFn: async () => {
        try {
          const data = await authService.getCurrentUser();
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetCurrentUserQuery,
} = authApi;
