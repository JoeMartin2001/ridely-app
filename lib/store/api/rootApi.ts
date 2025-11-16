import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fakeBaseQuery(),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.EXPO_PUBLIC_API_URL, // or your backend
  //   prepareHeaders: (headers, { getState }) => {
  //     const session = (getState() as RootState).auth.session;

  //     if (session?.access_token) {
  //       headers.set("Authorization", `Bearer ${session.access_token}`);
  //     }
  //     return headers;
  //   },
  // }),
  endpoints: () => ({}),
});

export const enhancedApi = rootApi.enhanceEndpoints({
  addTagTypes: ["Auth", "User", "Ride"],
});
