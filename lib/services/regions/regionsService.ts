import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CamelCaseKeys } from "../base/BaseService";
import { BaseService } from "../base/BaseService";

type RegionsTable = Database["public"]["Tables"]["regions"];
export type Region = CamelCaseKeys<RegionsTable["Row"]>;
export type CreateRegion = CamelCaseKeys<RegionsTable["Insert"]>;
export type UpdateRegion = Partial<CamelCaseKeys<RegionsTable["Update"]>>;

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
