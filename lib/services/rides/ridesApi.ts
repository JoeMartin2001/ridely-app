import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ridesService } from "..";
import { CreateRide, Ride, UpdateRide } from "./ridesService";

export const ridesApi = createApi({
  reducerPath: "ridesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Ride"],
  endpoints: (builder) => ({
    getRide: builder.query<Ride, string>({
      queryFn: async (id) => {
        try {
          const data = await ridesService.getRide(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Ride", id }] : ["Ride"],
    }),
    getRides: builder.query<Ride[], string>({
      queryFn: async (userId) => {
        try {
          const data = await ridesService.getRides(userId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (result, error, userId) =>
        result ? [{ type: "Ride", id: userId }] : ["Ride"],
    }),
    createRide: builder.mutation<Ride, CreateRide>({
      queryFn: async (ride) => {
        try {
          const data = await ridesService.createRide(ride);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Ride", id }],
    }),
    updateRide: builder.mutation<Ride, UpdateRide>({
      queryFn: async (ride) => {
        try {
          const data = await ridesService.updateRide(ride);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Ride", id }],
    }),
    deleteRide: builder.mutation<boolean, string>({
      queryFn: async (id) => {
        try {
          const data = await ridesService.deleteRide(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Ride", id }],
    }),
  }),
});

export const {
  useGetRideQuery,
  useGetRidesQuery,
  useCreateRideMutation,
  useUpdateRideMutation,
  useDeleteRideMutation,
} = ridesApi;
