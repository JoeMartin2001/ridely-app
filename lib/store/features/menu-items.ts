import { MenuItem } from "@/lib/types/MenuItem";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLoading: boolean;
  menuItems: MenuItem[];
};

const initialState: InitialState = {
  isLoading: false,
  menuItems: [],
};

export const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //     builder.addCase(fetchMenuItems.pending, (state) => {
  //         state.isLoading = true;
  //     });
  //     builder.addCase(fetchMenuItems.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.menuItems = action.payload;
  //     });
  // },
});

export default menuItemsSlice.reducer;
