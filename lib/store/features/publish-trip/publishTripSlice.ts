import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface PublishTripState {
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
  seatPrice: number;
}

const initialState: PublishTripState = {
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
  seatPrice: 50000,
};

export const publishTripSlice = createSlice({
  name: "publishTrip",
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
    incrementSeatPrice: (state) => {
      state.seatPrice = state.seatPrice + 10000;
    },
    decrementSeatPrice: (state) => {
      if (state.seatPrice > 10000) {
        state.seatPrice = state.seatPrice - 10000;
      }
    },
    resetPublishTrip: (state) => {
      state.from = { id: "", name: "" };
      state.to = { id: "", name: "" };
      state.date = moment().format("YYYY-MM-DD");
      state.passengersCount = 1;
      state.seatPrice = 10000;
    },
  },
});

export const {
  setFromDistrict,
  setToDistrict,
  setDate,
  incrementPassengersCount,
  decrementPassengersCount,
  incrementSeatPrice,
  decrementSeatPrice,
  resetPublishTrip,
} = publishTripSlice.actions;

export default publishTripSlice.reducer;
