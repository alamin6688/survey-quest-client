import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSurveyor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isSurveyor, isLoading: isSurveyorLoading } = useQuery({
    queryKey: [user?.email, 'isSurveyor'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/surveyor/${user.email}`);
      return res.data.surveyor; // Assuming 'proUser' is the correct key in the response
    },
    enabled: !!user?.email, // Ensure the query runs only if user.email is available
  });

  return [isSurveyor, isSurveyorLoading];
};

export default useSurveyor;
