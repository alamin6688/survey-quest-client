import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeaturedSurveys = () => {
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

  // Sort surveys by vote count and get the top 6
  const topSurveys = surveys
    ?.sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 6);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="bg-base-200 pt-10 pb-12 rounded-xl">
      <div>
        <h2 className="text-4xl font-extrabold text-center">
          Featured Surveys
        </h2>
        <p className="w-full md:w-3/4 mx-auto text-center mt-4 text-lg text-black">
          We present significant research projects surveys, emphasizing crucial
          studies to engage participants and collect valuable insights.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8 px-4">
        {topSurveys?.map((survey) => (
          <div
            key={survey._id}
            className="border-2 rounded-xl shadow-2xl p-4 relative overflow-hidden"
            style={{
              backgroundImage: `url(${survey.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            {/* Gradient Overlay */}
            <div>
              <h2 className="absolute bottom-12 text-2xl text-white font-semibold bg-black bg-opacity-0 p-2 rounded">
                {survey.title}
              </h2>
              <p className="absolute bottom-0 left-4 text-white text-base bg-black bg-opacity-0 p-1 rounded">
                {survey.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSurveys;
