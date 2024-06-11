import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const { id } = useParams();

  const { data: surveys, isLoading, error } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/surveys`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  const currentSurvey = surveys?.find((survey) => survey._id === id);

  if (!currentSurvey) {
    return <div className="p-4">Survey not found</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden card-body border ">
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-3">{currentSurvey.title}</h1>
        <p className="text-gray-700 text-base mb-2">{currentSurvey.description}</p>
        <p className="text-gray-600 text-sm mb-1">Category: {currentSurvey.category}</p>
        <p className="text-gray-600 text-sm mb-1">Votes: {currentSurvey.voteCount}</p>
        <p className="text-gray-600 text-sm">Created At: {new Date(currentSurvey.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default SurveyDetails;
