import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RidesUIState {
  selectedRideId: string | null;
  filters: {
    status: "active" | "completed" | "cancelled";
    dateRange: { start: Date; end: Date } | null;
  };
  sortBy: "date" | "price" | "distance";
  searchQuery: string;
  isMapView: boolean;
}

const initialState: RidesUIState = {
  selectedRideId: null,
  filters: {
    status: "active",
    dateRange: null,
  },
  sortBy: "date",
  searchQuery: "",
  isMapView: false,
};

export const ridesSlice = createSlice({
  name: "ridesUI",
  initialState,
  reducers: {
    selectRide: (state, action: PayloadAction<string>) => {
      state.selectedRideId = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<RidesUIState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleView: (state) => {
      state.isMapView = !state.isMapView;
    },
    clearSelection: (state) => {
      state.selectedRideId = null;
    },
  },
});

export const {
  selectRide,
  setFilters,
  setSearchQuery,
  toggleView,
  clearSelection,
} = ridesSlice.actions;

export default ridesSlice.reducer;
