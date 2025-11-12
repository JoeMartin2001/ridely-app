import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { districtsService } from "..";
import { District } from "./regionsService";

export const districtsApi = createApi({
  reducerPath: "districtsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["District"],
  endpoints: (builder) => ({
    getDistrict: builder.query<District, string>({
      queryFn: async (id) => {
        try {
          const data = await districtsService.getDistrict(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "District", id }] : ["District"],
    }),
    getDistrictsByName: builder.query<District[], string>({
      queryFn: async (name) => {
        try {
          const data = await districtsService.getDistrictsByName(name);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, name) =>
        result ? [{ type: "District", name }] : ["District"],
    }),
  }),
});

export const { useGetDistrictQuery, useGetDistrictsByNameQuery } = districtsApi;
