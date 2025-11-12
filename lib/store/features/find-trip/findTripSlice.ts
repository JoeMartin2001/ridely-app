import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FindTripState {
  from: string;
  to: string;
  date: string;
  passengersCount: number;
}

const initialState: FindTripState = {
  from: "",
  to: "",
  date: new Date().toISOString().split("T")[0],
  passengersCount: 1,
};

export const findTripSlice = createSlice({
  name: "findTrip",
  initialState,
  reducers: {
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    incrementPassengersCount: (state) => {
      state.passengersCount = state.passengersCount + 1;
    },
    decrementPassengersCount: (state) => {
      state.passengersCount = state.passengersCount - 1;
    },
  },
});

export const {
  setFrom,
  setTo,
  setDate,
  incrementPassengersCount,
  decrementPassengersCount,
} = findTripSlice.actions;

export default findTripSlice.reducer;
