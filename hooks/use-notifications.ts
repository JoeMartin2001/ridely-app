import { useAppDispatch } from "@/lib/store";
import { notificationsSlice } from "@/lib/store/shared/slices/notificationsSlice";
import { Notification } from "@/lib/types/Notification";
import { useCallback } from "react";

// Custom hook for notifications
export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const showNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      dispatch(notificationsSlice.actions.addNotification(notification));
    },
    [dispatch]
  );

  return { showNotification };
};
