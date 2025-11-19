import { User } from "../services/users/usersService";

export namespace EdgeFns {
  export interface TelegramAuthInput {
    hash: string;
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    auth_date: number;
  }

  export type SessionResponse = {
    accessToken: string;
    refreshToken: string;
    user?: User | null;
  };

  export interface SendPhoneOtpInput {
    phoneNumber: string;
  }

  export interface SendPhoneOtpOutput {
    message: string;
  }

  export type VerifyPhoneOtpInput = {
    phoneNumber: string;
    code: string;
  };

  export type VerifyPhoneOtpOutput = SessionResponse;

  export type SignInWithTelegramInput = TelegramAuthInput;

  export type SignInWithTelegramOutput = SessionResponse;
}

export type FnMap = {
  sendPhoneOtp: {
    input: EdgeFns.SendPhoneOtpInput;
    output: EdgeFns.SendPhoneOtpOutput;
  };
  verifyPhoneAndLogin: {
    input: EdgeFns.VerifyPhoneOtpInput;
    output: EdgeFns.VerifyPhoneOtpOutput;
  };
  signInWithTelegram: {
    input: EdgeFns.SignInWithTelegramInput;
    output: EdgeFns.SignInWithTelegramOutput;
  };
};
