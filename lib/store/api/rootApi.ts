import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});

export const enhancedApi = rootApi.enhanceEndpoints({
  addTagTypes: ["Auth", "User", "Ride"],
});
