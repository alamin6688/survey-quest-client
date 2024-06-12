import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/admin/${user.email}`);
      return res.data.admin;
    },
    enabled: !!user?.email, // Ensure the query runs only if user.email is available
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
