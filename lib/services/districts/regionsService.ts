import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "../base/BaseService";

type DistrictsTable = Database["public"]["Tables"]["districts"];
export type District = DistrictsTable["Row"];
export type CreateDistrict = DistrictsTable["Insert"];
export type UpdateDistrict = DistrictsTable["Update"];

export class DistrictsService extends BaseService<"districts"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "districts");
  }

  async getDistrict(id: string): Promise<District> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) this.handleError(error);

    if (!data) this.handleError(new Error("District not found"));

    return data;
  }

  /**
   * Get districts by name
   */
  async getDistrictsByName(name: string): Promise<District[]> {
    const normalized = name.trim();

    if (!normalized) {
      return [];
    }

    const wildcard = `*${normalized}*`;

    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*, region:regions(id, name_uz, name_ru, name_oz)")
      .or(
        ["name_uz", "name_ru", "name_oz"]
          .map((column) => `${column}.ilike.${wildcard}`)
          .join(",")
      );

    if (error) this.handleError(error);

    return data || [];
  }
}
