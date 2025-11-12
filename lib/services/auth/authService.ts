// services/auth/authService.ts
import { BaseService } from "@/lib/services/base/BaseService";
import { Database } from "@/lib/types";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";

export class AuthService extends BaseService<"users"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "users");
  }

  async signIn(email: string, password: string): Promise<Session> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AuthError(error.message, error.status);
    if (!data.session) throw new Error("No session returned");

    return data.session;
  }

  async signUp(email: string, password: string, userData: any): Promise<void> {
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) throw new AuthError(error.message, error.status);
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new AuthError(error.message, error.status);
  }

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();
    if (error) throw new AuthError(error.message, error.status);
    return user;
  }
}
