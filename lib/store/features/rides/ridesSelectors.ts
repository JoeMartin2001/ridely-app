// features/rides/ridesSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { ridesApi } from "../../../services/rides/ridesApi";

// Combine API data with UI state
export const selectFilteredRides = createSelector(
  [ridesApi.endpoints.getRides.select("userId"), (state) => state.ridesUI],
  (ridesResult, ridesUI) => {
    const rides = ridesResult.data || [];

    return rides.filter((ride) => {
      const matchesSearch = ride.id
        .toLowerCase()
        .includes(ridesUI.searchQuery.toLowerCase());
      //  ||
      // ride.dropoffLocation
      //   .toLowerCase()
      //   .includes(ridesUI.searchQuery.toLowerCase());
      const matchesFilter =
        ridesUI.filters.status === "all" ||
        ride.status === ridesUI.filters.status;

      return matchesSearch && matchesFilter;
    });
  }
);

export const selectSelectedRide = createSelector(
  [
    ridesApi.endpoints.getRides.select("userId"),
    (state) => state.ridesUI.selectedRideId,
  ],
  (ridesResult, selectedRideId) => {
    const rides = ridesResult.data || [];
    return rides.find((ride) => ride.id === selectedRideId);
  }
);
