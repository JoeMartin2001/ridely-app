import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PublishTripState {
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
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
    resetPublishTrip: (state) => {
      state.from = { id: "", name: "" };
      state.to = { id: "", name: "" };
    },
  },
});

export const {
  setFromDistrict,
  setToDistrict,
  resetPublishTrip,
} = publishTripSlice.actions;

export default publishTripSlice.reducer;

