// services/index.ts
import { supabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/Database.types";
import { AuthService } from "./auth/authService";
import { BaseService } from "./base/BaseService";
import { DistrictsService } from "./districts/regionsService";
import { RegionsService } from "./regions/regionsService";
import { RidesService } from "./rides/ridesService";
import { UsersService } from "./users/usersService";

export class ServiceFactory {
  private services: Map<string, BaseService<any>> = new Map();

  constructor(private supabase: SupabaseClient<Database>) {}

  getService<T>(
    ServiceClass: new (supabase: SupabaseClient<Database>) => T
  ): T {
    const key = ServiceClass.name;

    // Validate service creation
    if (!this.isValidService(ServiceClass)) {
      throw new Error(`Invalid service class: ${key}`);
    }

    if (!this.services.has(key)) {
      this.services.set(
        key,
        new ServiceClass(this.supabase) as unknown as BaseService<any>
      );
    }

    return this.services.get(key) as unknown as T;
  }

  private isValidService(ServiceClass: any): boolean {
    return (
      typeof ServiceClass === "function" &&
      ServiceClass.prototype instanceof BaseService
    );
  }
}

export const serviceFactory = new ServiceFactory(supabase);

export const authService = serviceFactory.getService(AuthService);
export const usersService = serviceFactory.getService(UsersService);
export const ridesService = serviceFactory.getService(RidesService);
export const regionsService = serviceFactory.getService(RegionsService);
export const districtsService = serviceFactory.getService(DistrictsService);
