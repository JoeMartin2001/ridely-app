import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "../base/BaseService";

type RegionsTable = Database["public"]["Tables"]["regions"];
export type Region = RegionsTable["Row"];
export type CreateRegion = RegionsTable["Insert"];
export type UpdateRegion = RegionsTable["Update"];

export class RegionsService extends BaseService<"regions"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "regions");
  }

  async getRegion(id: string): Promise<Region> {
    const result = await this.supabase
      .from("regions")
      .select("*")
      .eq("id", id)
      .single();

    return this.handleError(result);
  }

  /**
   * Get regions by name
   */
  async getRegionsByName(name: string): Promise<Region[]> {
    const normalized = name.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    const wildcard = `*${normalized}*`;

    const result = await this.supabase
      .from("regions")
      .select("*")
      .or(
        ["name_uz", "name_ru", "name_oz"]
          .map((column) => `${column}.ilike.${wildcard}`)
          .join(",")
      );

    return this.handleError(result);
  }
}
