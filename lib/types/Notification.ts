export type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  autoHide?: boolean;
  duration?: number;
};
