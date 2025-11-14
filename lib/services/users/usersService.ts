// services/users/usersService.ts
import type { Database } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "../base/BaseService";

type UserTable = Database["public"]["Tables"]["users"];

export type User = UserTable["Row"];
export type CreateUser = UserTable["Insert"];
export type UpdateUser = UserTable["Update"];

export class UsersService extends BaseService<"users"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "users");
  }

  async getProfile(userId: string): Promise<User> {
    const result = await this.supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return this.handleError(result);
  }

  async updateProfile(userId: string, updates: UpdateUser): Promise<User> {
    const result = await this.supabase
      .from("users")
      .update(updates as never)
      .eq("id", userId)
      .select()
      .single();

    return this.handleError(result);
  }
  async searchUsers(query: string): Promise<User[]> {
    const result = await this.supabase
      .from("users")
      .select("*")
      .ilike("username", `%${query}%`);

    return this.handleError(result);
  }
}
