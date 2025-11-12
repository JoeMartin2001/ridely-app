import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authApi } from "@/lib/services/auth/authApi";
import { districtsApi } from "@/lib/services/districts/regionsApi";
import { regionsApi } from "@/lib/services/regions/regionsApi";
import { ridesApi } from "@/lib/services/rides/ridesApi";
import { usersApi } from "@/lib/services/users/usersApi";

import favouritesReducer from "./features/favourites";
import findTripReducer from "./features/find-trip/findTripSlice";
import menuItemsReducer from "./features/menu-items";
import userReducer from "./features/user";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ridesApi.reducerPath]: ridesApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [districtsApi.reducerPath]: districtsApi.reducer,

    favourites: favouritesReducer,
    menuItems: menuItemsReducer,
    user: userReducer,
    findTrip: findTripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      ridesApi.middleware,
      regionsApi.middleware,
      districtsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
