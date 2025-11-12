export interface IVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  seats: number;
  comfortLevel: ComfortLevel;
  amenities: Amenity[];
  photos: string[];
}

export enum ComfortLevel {
  BASIC = "basic",
  COMFORT = "comfort",
  BUSINESS = "business",
}

export enum Amenity {
  AIR_CONDITIONING = "air_conditioning",
  WIFI = "wifi",
  PET_FRIENDLY = "pet_friendly",
  SMOKING_ALLOWED = "smoking_allowed",
  LUGGAGE_SPACE = "luggage_space",
}
