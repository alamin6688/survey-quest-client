import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isProUser, isLoading: isProUserLoading } = useQuery({
    queryKey: [user?.email, 'isProUser'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/proUser/${user.email}`);
      return res.data.proUser; // Assuming 'proUser' is the correct key in the response
    },
    enabled: !!user?.email, // Ensure the query runs only if user.email is available
  });

  return [isProUser, isProUserLoading];
};

export default useProUser;
