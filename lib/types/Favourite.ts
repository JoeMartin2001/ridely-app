import { BaseEntity } from "./BaseEntity";
import { MenuItem } from "./MenuItem";
import { User } from "./User";

export interface Favourite extends BaseEntity {
  userId: string;
  menuItemId: string;

  menuItem?: MenuItem;
  user?: User;
}
