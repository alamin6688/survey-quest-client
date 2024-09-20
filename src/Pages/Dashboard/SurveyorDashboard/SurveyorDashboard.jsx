import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SurveyorDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // const abcd = user.displayName;
  // console.log(abcd);

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
      <div className="overflow-x-auto rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-200 md:text-lg font-bold text-black">
              <th className="px-4 py-2">Serial No</th>
              <th className="px-4 py-2">Survey Title</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Vote</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUserSurveys.map((cuurentSurveyor, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">
                  {cuurentSurveyor.title}
                </td>
                <td className="border px-4 py-2">
                  {cuurentSurveyor.surverior}
                </td>
                <td className="border px-4 py-2">
                  {cuurentSurveyor.voteCount}
                </td>
                <td className="border flex justify-start gap-2 px-4 py-2">
                  <Link to={`/surveys/edit/${cuurentSurveyor._id}`}>
                    <button className="btn btn-ghost text-white bg-blue-500 hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <Link
                    to={`participate-details/${cuurentSurveyor._id}`}
                    className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorDashboard;
