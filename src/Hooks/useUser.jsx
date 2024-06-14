import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isUser, isLoading: isUserLoading } = useQuery({
    queryKey: [loggedInUser?.email, 'isUser'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/user/${loggedInUser.email}`);
      return res.data.user;
    },
    enabled: !!loggedInUser?.email, // Ensure the query runs only if user.email is available
  });

  return [isUser, isUserLoading];
};

export default useUser;
