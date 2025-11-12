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
    const { data, error } = await this.supabase
      .from("rides")
      .select("*")
      .eq("id", id)
      .single();

    if (error) this.handleError(error);

    if (!data) this.handleError(new Error("Ride not found"));

    return data;
  }

  async getRides(userId: string): Promise<Ride[]> {
    const { data, error } = await this.supabase
      .from("rides")
      .select("*")
      .eq("user_id", userId);

    if (error) this.handleError(error);

    return data;
  }

  async createRide(ride: CreateRide): Promise<Ride> {
    const { data, error } = await this.supabase
      .from("rides")
      .insert(ride as never)
      .select()
      .single();

    if (error) this.handleError(error);

    return data;
  }

  async updateRide(ride: UpdateRide): Promise<Ride> {
    const { data, error } = await this.supabase
      .from("rides")
      .update(ride as never)
      .select()
      .single();

    if (error) this.handleError(error);

    return data;
  }

  async deleteRide(id: string): Promise<boolean> {
    const { error } = await this.supabase.from("rides").delete().eq("id", id);

    if (error) this.handleError(error);

    return true;
  }
}
