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

  /**
   * signIn with email and password
   * @param email Email to sign in with
   * @param password Password to sign in with
   * @returns Session
   */
  async signIn(email: string, password: string): Promise<Session> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AuthError(error.message, error.status);
    if (!data.session) throw new Error("No session returned");

    return data.session;
  }

  /**
   * setAuthSession to set the auth session
   * @param accessToken Access token to set
   * @param refreshToken Refresh token to set
   * @returns Session or null if failed to set auth session
   */
  async setAuthSession(
    accessToken: string,
    refreshToken: string
  ): Promise<Session | null> {
    const { error, data: sessionData } = await this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      throw new AuthError(error.message, error.status);
    }

    return sessionData.session;
  }

  /**
   * signInWithTelegram edge function to sign in with Telegram
   * @returns Session or null if failed to sign in with Telegram
   */
  async signInWithTelegram(): Promise<Session | null> {
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: "ridelyapp",
      path: "auth",
    });

    const origin = process.env.EXPO_PUBLIC_TELEGRAM_ORIGIN || "";
    const botId = process.env.EXPO_PUBLIC_TELEGRAM_BOT_ID || "";

    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&embed=1&request_access=write&return_to=${redirectUrl}`;

    const res = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

    if (res.type !== "success") {
      throw new Error("Failed to sign in with Telegram");
    }

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

    const data = await this.invokeEdgeFunction<SessionResponse>(
      "signInWithTelegram",
      "POST",
      authData
    );

    return this.setAuthSession(data.accessToken, data.refreshToken);
  }

  /**
   * signUp with email and password
   * @param email Email to sign up with
   * @param password Password to sign up with
   * @param userData User data to sign up with
   * @returns void
   */
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

  /**
   * signOut to sign out the user
   * @returns void
   */
  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) throw new AuthError(error.message, error.status);
  }

  /**
   * getCurrentUser to get the current user
   * @returns User or null if failed to get current user
   */
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();
    if (error) throw new AuthError(error.message, error.status);
    return user;
  }
}
