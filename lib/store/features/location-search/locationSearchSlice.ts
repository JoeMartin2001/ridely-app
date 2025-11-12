import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationSearchState = {
  searchQuery: string;
};

const initialState: LocationSearchState = {
  searchQuery: "",
};

export const locationSearchSlice = createSlice({
  name: "locationSearch",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = locationSearchSlice.actions;

export default locationSearchSlice.reducer;
