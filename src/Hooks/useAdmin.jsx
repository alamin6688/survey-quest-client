import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useMemo } from "react";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/admin/${user.email}`);
      return res.data.admin;
    },
    enabled: !!user?.email,
  });

  return useMemo(() => [isAdmin, isAdminLoading], [isAdmin, isAdminLoading]);
};

export default useAdmin;
