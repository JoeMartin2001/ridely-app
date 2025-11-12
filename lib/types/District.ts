import { IRegion } from "./Region";

export interface IDistrict {
  id: string;
  old_int_id: number;
  soato_id: string;
  name_uz: string;
  name_ru: string;
  name_oz: string;
  region_id: string;

  region?: IRegion;
}
