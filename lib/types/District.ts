import { IRegion } from "./Region";

export interface IDistrict {
  id: string;
  oldIntId: number;
  soatoId: string;
  nameUz: string;
  nameRu: string;
  nameOz: string;
  regionId: string;

  region?: IRegion;
}
