import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LatestSurveys = () => {
  const {
    data: surveys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/surveys`);
      return res.data;
    },
  });

  // Sort surveys by creation date and get the most recent 6
  const recentSurveys = surveys
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading surveys: {error.message}</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold text-center">Latest Surveys</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {recentSurveys?.map((survey) => (
          <div key={survey._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
            <p className="text-gray-700 text-base mb-2">{survey.description}</p>
            <p className="text-gray-600 text-sm mb-1">
              Category: {survey.category}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Votes: {survey.voteCount}
            </p>
            <p className="text-gray-600 text-sm">
              Created At: {new Date(survey.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSurveys;
