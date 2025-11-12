import type { IDistrict } from "./District";
import type { IPayment } from "./Payment";
import type { IRegion } from "./Region";
import type { IRide } from "./Ride";
import type { IUser } from "./User";
import type { IVehicle } from "./Vehicle";

type BaseTable<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: never[];
};

type PublicSchema = {
  Tables: {
    users: BaseTable<IUser, IUser, Partial<IUser>>;
    rides: BaseTable<IRide, IRide, Partial<IRide>>;
    payments: BaseTable<IPayment, IPayment, Partial<IPayment>>;
    vehicles: BaseTable<IVehicle, IVehicle, Partial<IVehicle>>;
    regions: BaseTable<IRegion, IRegion, Partial<IRegion>>;
    districts: BaseTable<IDistrict, IDistrict, Partial<IDistrict>>;
  };
  Views: Record<string, never>;
  Functions: Record<string, never>;
  Enums: Record<string, never>;
  CompositeTypes: Record<string, never>;
};

export type Database = {
  public: PublicSchema;
};
