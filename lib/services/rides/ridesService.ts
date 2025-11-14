import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "../base/BaseService";

type RidesTable = Database["public"]["Tables"]["rides"];
export type Ride = RidesTable["Row"];
export type CreateRide = RidesTable["Insert"];
export type UpdateRide = RidesTable["Update"];

export class RidesService extends BaseService<"rides"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "rides");
  }

  async getRide(id: string): Promise<Ride> {
    const result = await this.supabase
      .from("rides")
      .select("*")
      .eq("id", id)
      .single();

    return this.handleError(result);
  }

  async getRides(userId: string): Promise<Ride[]> {
    const result = await this.supabase
      .from("rides")
      .select("*")
      .eq("user_id", userId);

    return this.handleError(result);
  }

  async createRide(ride: CreateRide): Promise<Ride> {
    const result = await this.supabase
      .from("rides")
      .insert(ride as never)
      .select()
      .single();

    return this.handleError(result);
  }

  async updateRide(ride: UpdateRide): Promise<Ride> {
    const result = await this.supabase
      .from("rides")
      .update(ride as never)
      .select()
      .single();

    return this.handleError(result);
  }

  async deleteRide(id: string): Promise<boolean> {
    const result = await this.supabase.from("rides").delete().eq("id", id);

    return this.handleErrorBoolean(result);
  }
}
