import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isOnline: boolean;
  currentRoute: string | null;
  pendingActions: string[];
  deepLinkData: any;
}

const initialState: AppState = {
  isOnline: true,
  currentRoute: null,
  pendingActions: [],
  deepLinkData: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
    addPendingAction: (state, action: PayloadAction<string>) => {
      state.pendingActions.push(action.payload);
    },
    removePendingAction: (state, action: PayloadAction<string>) => {
      state.pendingActions = state.pendingActions.filter(
        (pendingAction) => pendingAction !== action.payload
      );
    },
  },
});

export const {
  setOnlineStatus,
  setCurrentRoute,
  addPendingAction,
  removePendingAction,
} = appSlice.actions;

export default appSlice.reducer;
