import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/services/users/usersApi";

export const useUserProfile = (userId: string) => {
  const { data: profile, isLoading, error } = useGetProfileQuery(userId);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  return {
    profile,
    isLoading,
    error,
    updateProfile: (updates: any) => updateProfile({ userId, updates }),
    isUpdating,
  };
};
