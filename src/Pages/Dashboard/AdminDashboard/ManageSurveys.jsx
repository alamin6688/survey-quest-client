
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageSurveys = () => {
  const axiosSecure = useAxiosSecure();

  const { data: surveys, isLoading } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      const res = await axiosSecure.get('/surveys');
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Manage Surveys</h2>
      <ul>
        {surveys.map(survey => (
          <li key={survey._id}>{survey.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSurveys;
