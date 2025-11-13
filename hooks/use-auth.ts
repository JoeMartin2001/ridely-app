import {
  useGetCurrentUserQuery,
  useSendPhoneOTPMutation,
  useSignInMutation,
  useSignOutMutation,
  useVerifyPhoneAndLoginMutation,
} from "@/lib/services/auth/authApi";

export const useAuth = () => {
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();
  const [signOut, { isLoading: signOutLoading }] = useSignOutMutation();
  const [sendPhoneOTP, { isLoading: sendPhoneOTPLoading }] =
    useSendPhoneOTPMutation();
  const [verifyPhoneAndLogin, { isLoading: verifyPhoneAndLoginLoading }] =
    useVerifyPhoneAndLoginMutation();
  const { data: user, isLoading: userLoading } = useGetCurrentUserQuery();

  return {
    user,
    signIn: (email: string, password: string) => signIn({ email, password }),
    signOut: () => signOut(),
    sendPhoneOTP: (phoneNumber: string) => sendPhoneOTP({ phoneNumber }),
    verifyPhoneAndLogin: (phoneNumber: string, otpCode: string) =>
      verifyPhoneAndLogin({ phoneNumber, otpCode }),
    isLoading:
      signInLoading ||
      signOutLoading ||
      userLoading ||
      sendPhoneOTPLoading ||
      verifyPhoneAndLoginLoading,
  };
};
