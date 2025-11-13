// services/auth/authService.ts
import { BaseService } from "@/lib/services/base/BaseService";
import { Database } from "@/lib/types";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";

export class AuthService extends BaseService<"users"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "users");
  }

  /**
   * sendPhoneOTP edge function to send OTP to the phone number
   * @param phoneNumber Phone number to send OTP to
   */
  async sendPhoneOTP(phoneNumber: string): Promise<void> {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/sendPhoneOtp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Send phone OTP failed");

    return data;
  }

  /**
   * verifyPhoneAndLogin edge function to verify the OTP and login the user
   * @param phoneNumber Phone number to verify OTP for
   * @param otpCode OTP code to verify
   */
  async verifyPhoneAndLogin(
    phoneNumber: string,
    code: string
  ): Promise<Session> {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/verifyPhoneAndLogin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, code }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Verify phone and login failed");

    return data;
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
