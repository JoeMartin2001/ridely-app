import { BaseEntity } from "./BaseEntity";

export interface User extends BaseEntity {
  id: string;
  email: string;
  name: string;
  phone: string;
  walletBalance: number;
}
