import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useMemo } from "react";

const useProUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isProUser, isLoading: isProUserLoading } = useQuery({
    queryKey: [user?.email, 'isProUser'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/proUser/${user.email}`);
      return res.data.proUser;
    },
    enabled: !!user?.email,
  });

  return useMemo(() => [isProUser, isProUserLoading], [isProUser, isProUserLoading]);
};

export default useProUser;
