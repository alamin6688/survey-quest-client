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
      const res = await axios.get(`https://survey-quest-server.vercel.app/surveys`);
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
    <div className="mt-10 bg-base-200 pt-10 pb-12 rounded-xl">
      <div>
        <h2 className="text-4xl font-extrabold text-center">Latest Surveys</h2>
        <p className="w-full md:w-3/4 mx-auto text-center mt-4 text-lg text-black">
        We value your feedback on our services and products to improve your experience. Stay updated with us for more things.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4">
        {recentSurveys?.map((survey) => (
          <div
            key={survey._id}
            className="border-2 rounded-xl shadow-2xl space-y-2 p-4 pb-8"
          >
            <img
              src={survey.image}
              alt="Survey img"
              className="w-full h-[250px] object-cover"
            />
            <h2 className="text-2xl font-semibold pt-4 pb-4">{survey.title}</h2>
            <p className="text-gray-700 text-[18px]">
              <span className="font-bold">Description:</span>{" "}
              {survey.description}
            </p>
            <p className="text-gray-700 text-[18px]">
              <span className="font-bold">Category:</span> {survey.category}
            </p>
            <p className="text-gray-700 text-[18px]">
              <span className="font-bold">Votes:</span> {survey.voteCount}
            </p>
            <p className="text-gray-700 text-[18px]">
              <span className="font-bold">Created At:</span>{" "}
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSurveys;
