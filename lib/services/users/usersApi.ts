// services/users/usersApi.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { usersService } from "..";
import { UpdateUser, User } from "./usersService";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({
      queryFn: async (userId) => {
        try {
          const data = await usersService.getProfile(userId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, userId) =>
        result ? [{ type: "User", id: userId }] : ["User"],
    }),

    updateProfile: builder.mutation<
      User,
      { userId: string; updates: UpdateUser }
    >({
      queryFn: async ({ userId, updates }) => {
        try {
          const data = await usersService.updateProfile(userId, updates);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    searchUsers: builder.query<User[], string>({
      queryFn: async (query) => {
        try {
          const data = await usersService.searchUsers(query);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useSearchUsersQuery,
} = usersApi;
