import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";

export abstract class BaseService<
  T extends keyof Database["public"]["Tables"]
> {
  protected supabase: SupabaseClient<Database>;
  protected tableName: T;

  constructor(supabase: SupabaseClient<Database>, tableName: T) {
    this.supabase = supabase;
    this.tableName = tableName;
  }

  protected handleError(error: Error): never {
    console.error(`Service error for ${this.tableName}:`, error);

    throw new Error(error.message || "An error occurred");
  }
}
