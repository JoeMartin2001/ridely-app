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
    resetPublishTrip: (state) => {
      state.from = { id: "", name: "" };
      state.to = { id: "", name: "" };
      state.date = moment().format("YYYY-MM-DD");
    },
  },
});

export const { setFromDistrict, setToDistrict, setDate, resetPublishTrip } =
  publishTripSlice.actions;

export default publishTripSlice.reducer;
