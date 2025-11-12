import type { IPaymentMethod } from "./Payment";
import { IVehicle } from "./Vehicle";

// User account
export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date | null;

  password?: string;
  username: string;
  authProvider: IUserAuthProvider;
  googleId?: string;
  bio?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  emailVerifiedAt: Date | null;
  type: IUserType;

  createdAt: Date;
  updatedAt: Date;
}

export enum IUserType {
  DRIVER = "driver",
  PASSENGER = "passenger",
}

export enum IUserAuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
  PHONE = "phone",
}

export interface IDriver extends IUser {
  driverLicense?: string;
  licensePlate?: string;
  carDetails?: IVehicle;
  totalTrips: number;
  rating: number;
  isOnline: boolean;
  verificationStatus: IVerificationStatus;
}

export interface IPassenger extends IUser {
  preferredPaymentMethod: IPaymentMethod;
  totalTrips: number;
  rating: number;
}

export enum IVerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}
