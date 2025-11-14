// services/auth/authService.ts
import { BaseService } from "@/lib/services/base/BaseService";
import { Database, IUser } from "@/lib/types";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";

export type SendPhoneOTPResponse = { message: string };

export type SessionResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  };
};

export class AuthService extends BaseService<"users"> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, "users");
  }

  /**
   * sendPhoneOTP edge function to send OTP to the phone number
   * @param phoneNumber Phone number to send OTP to
   */
  async sendPhoneOTP(phoneNumber: string): Promise<{ message: string }> {
    const data = await this.invokeEdgeFunction<SendPhoneOTPResponse>(
      "sendPhoneOtp",
      "POST",
      { phoneNumber }
    );

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
  ): Promise<SessionResponse> {
    const data = await this.invokeEdgeFunction<SessionResponse>(
      "verifyPhoneAndLogin",
      "POST",
      { phoneNumber, code }
    );

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
