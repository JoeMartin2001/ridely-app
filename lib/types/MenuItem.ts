import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

export interface MenuItem extends BaseEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  /**
   * Whether the item is in stock
   */
  isInStock: boolean;

  categoryId: string;

  category?: Category;
}
