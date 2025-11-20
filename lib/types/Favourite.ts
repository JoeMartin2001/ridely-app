import { BaseEntity } from "./BaseEntity";
import { MenuItem } from "./MenuItem";
import { IUser } from "./User";

export interface Favourite extends BaseEntity {
  userId: string;
  menuItemId: string;

  menuItem?: MenuItem;
  user?: IUser;
}
