// services/auth/authService.ts
import { BaseService } from "@/lib/services/base/BaseService";
import { Database, IUser } from "@/lib/types";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

export type SendPhoneOTPResponse = { message: string };

type SessionResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export type TelegramAuthData = {
  id: string;
  first_name: string;
  username: string | null;
  photo_url: string | null;
  auth_date: string;
  hash: string;
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
  ): Promise<Session | null> {
    const data = await this.invokeEdgeFunction<SessionResponse>(
      "verifyPhoneAndLogin",
      "POST",
      { phoneNumber, code }
    );

    return this.setAuthSession(data.accessToken, data.refreshToken);
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

  async setAuthSession(
    accessToken: string,
    refreshToken: string
  ): Promise<Session | null> {
    const { error: sessionError, data: sessionData } =
      await this.supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError)
      throw new AuthError(sessionError.message, sessionError.status);

    return sessionData.session;
  }

  async signInWithTelegram(): Promise<Session | null> {
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: "ridelyapp",
      path: "auth",
    });

    const origin = "https://www.ridely.uz/auth/telegram-login";
    const botId = process.env.EXPO_PUBLIC_TELEGRAM_BOT_ID;

    if (!origin || !botId) {
      throw new Error(
        "Missing required Telegram OAuth configuration. Please set EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_TELEGRAM_BOT_ID, and EXPO_PUBLIC_TELEGRAM_BOT_USERNAME environment variables."
      );
    }

    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&embed=1&request_access=write&return_to=${redirectUrl}`;

    const res = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

    if (res.type === "success") {
      const queryString = res.url.includes("?") ? res.url.split("?")[1] : "";

      const urlParams = new URLSearchParams(queryString);

      const authData: TelegramAuthData = {
        id: urlParams.get("id") || "",
        first_name: urlParams.get("first_name") || "",
        username: urlParams.get("username"),
        photo_url: urlParams.get("photo_url"),
        auth_date: urlParams.get("auth_date") || "",
        hash: urlParams.get("hash") || "",
      };

      console.log("Telegram Auth Data:", authData);

      const data = await this.invokeEdgeFunction<SessionResponse>(
        "signInWithTelegram",
        "POST",
        authData
      );

      return this.setAuthSession(data.accessToken, data.refreshToken);
    } else {
      throw new Error("Failed to sign in with Telegram");
    }
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
