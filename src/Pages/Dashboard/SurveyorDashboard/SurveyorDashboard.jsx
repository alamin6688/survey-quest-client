import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SurveyorDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();


  const { data: surveys = [] } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/surveys`);
      return res.data;
    },
  });

  const currentUserSurveys = surveys.filter(
    (survey) => survey.surverior === user?.email
  );



  return (
    <div className="w-full py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Add New Survey</h2>
        <Link
          to="/addSurvey"
          className="btn btn-ghost bg-gray-400 text-white font-bold hover:bg-green-500"
        >
          <FaPlusCircle className="text-white" />
          Add Survey
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUserSurveys.map((survey) => (
          <div
            key={survey._id}
            className="bg-white rounded-lg border p-5 shadow-xl"
          >
            <img src={survey.image} alt="" className="mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{survey.title}</h3>
            <p className="text-gray-600 mb-4">{survey.description}</p>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm mb-4">{survey.category}</p>
            <div className="flex justify-between">
              <Link
                to={`/surveys/edit/${survey._id}`}
                className="btn btn-secondary w-full"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyorDashboard;
