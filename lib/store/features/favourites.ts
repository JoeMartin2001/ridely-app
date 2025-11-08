import { tempFavourites } from "@/lib/temp/temp-favourites";
import { Favourite } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLoading: boolean;
  favourites: Favourite[];
};

const initialState: InitialState = {
  isLoading: false,
  favourites: tempFavourites,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //     builder.addCase(fetchFavourites.pending, (state) => {
  //         state.isLoading = true;
  //     });
  //     builder.addCase(fetchFavourites.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.favourites = action.payload;
  //     });
  // },
});

export default favouritesSlice.reducer;
