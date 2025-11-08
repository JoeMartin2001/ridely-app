import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import favouritesReducer from "./features/favourites";
import menuItemsReducer from "./features/menu-items";
import userReducer from "./features/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favourites: favouritesReducer,
    menuItems: menuItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
