// services/users/usersService.ts
import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CamelCaseKeys } from "../base/BaseService";
import { BaseService } from "../base/BaseService";

type UserTable = Database["public"]["Tables"]["users"];

export type User = CamelCaseKeys<UserTable["Row"]>;
export type CreateUser = CamelCaseKeys<UserTable["Insert"]>;
export type UpdateUser = Partial<CamelCaseKeys<UserTable["Update"]>>;

export class UsersService extends BaseService<"users"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "users");
  }

  async getProfile(userId: string) {
    const result = await this.supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return this.handleError(result);
  }

  async updateProfile(userId: string, updates: UpdateUser) {
    const result = await this.supabase
      .from("users")
      .update(this.toSnake(updates) as never)
      .eq("id", userId)
      .select()
      .single();

    return this.handleError(result);
  }

  async searchUsers(query: string) {
    const result = await this.supabase
      .from("users")
      .select("*")
      .ilike("username", `%${query}%`);

    return this.handleError(result);
  }
}
