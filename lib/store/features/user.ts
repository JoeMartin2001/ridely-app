import { tempUser } from "@/lib/temp/temp-user";
import { IUser } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLoading: boolean;
  user: IUser | null;
};

const initialState: InitialState = {
  isLoading: false,
  user: tempUser,
  //   user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchUser.pending, (state) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(fetchUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.user = action.payload;
  //     });
  //   },
});

export default userSlice.reducer;
