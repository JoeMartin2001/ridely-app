import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface FindTripState {
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  date: string;
  passengersCount: number;
}

const initialState: FindTripState = {
  from: {
    id: "",
    name: "",
  },
  to: {
    id: "",
    name: "",
  },
  date: moment().format("YYYY-MM-DD"),
  passengersCount: 1,
};

export const findTripSlice = createSlice({
  name: "findTrip",
  initialState,
  reducers: {
    setFromDistrict: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.from = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
    setToDistrict: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.to = {
        id: action.payload.id,
        name: action.payload.name,
      };
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
  setFromDistrict,
  setToDistrict,
  setDate,
  incrementPassengersCount,
  decrementPassengersCount,
} = findTripSlice.actions;

export default findTripSlice.reducer;
