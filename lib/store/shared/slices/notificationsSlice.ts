import { Notification } from "@/lib/types/Notification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      const id = Math.random().toString(36).substr(2, 9);

      state.items.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.items = [];
    },
  },
});

export const { addNotification, removeNotification, clearAllNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
