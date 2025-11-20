import { IChatMessage } from "./ChatMessage";
import { IUser } from "./User";

export interface IChatRoom {
  id: string;
  rideId: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ChatRoomStatus;
  isRead: boolean;

  messages?: IChatMessage[];

  sender?: IUser;
}

export enum ChatRoomStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}
