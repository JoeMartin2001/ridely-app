import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { regionsService } from "..";
import { Region } from "./regionsService";

export const regionsApi = createApi({
  reducerPath: "regionsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Region"],
  endpoints: (builder) => ({
    getRegion: builder.query<Region, string>({
      queryFn: async (id) => {
        try {
          const data = await regionsService.getRegion(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Region", id }] : ["Region"],
    }),
    getRegionsByName: builder.query<Region[], string>({
      queryFn: async (name) => {
        try {
          const data = await regionsService.getRegionsByName(name);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, name) =>
        result ? [{ type: "Region", name }] : ["Region"],
    }),
  }),
});

export const { useGetRegionQuery, useGetRegionsByNameQuery } = regionsApi;
