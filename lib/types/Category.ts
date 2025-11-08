import { BaseEntity } from "./BaseEntity";

export interface Category extends BaseEntity {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  isDeleted: boolean;
}
