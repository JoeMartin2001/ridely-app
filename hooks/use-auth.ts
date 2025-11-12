// hooks/useAuth.ts
import {
  useGetCurrentUserQuery,
  useSignInMutation,
  useSignOutMutation,
} from "@/lib/services/auth/authApi";

export const useAuth = () => {
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();
  const [signOut, { isLoading: signOutLoading }] = useSignOutMutation();
  const { data: user, isLoading: userLoading } = useGetCurrentUserQuery();

  return {
    user,
    signIn: (email: string, password: string) => signIn({ email, password }),
    signOut: () => signOut(),
    isLoading: signInLoading || signOutLoading || userLoading,
  };
};
