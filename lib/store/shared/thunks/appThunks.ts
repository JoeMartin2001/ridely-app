// shared/thunks/appThunks.ts
import { authService, usersService } from "@/lib/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeAppThunk = createAsyncThunk(
  "app/initialize",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Multiple initialization steps
      const user = await authService.getCurrentUser();

      if (user) {
        // You can dispatch other thunks if needed
        await dispatch(loadUserProfileThunk(user.id)).unwrap();
        // await dispatch(loadAppSettingsThunk()).unwrap();
      }

      return { user, initializedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const loadUserProfileThunk = createAsyncThunk(
  "app/loadUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const [profile] = await Promise.all([
        usersService.getProfile(userId),
        // usersService.getPreferences(userId),
        // usersService.getSettings(userId),
      ]);

      return { profile };
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);
