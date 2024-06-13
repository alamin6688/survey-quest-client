import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const SurveyorDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/surveys");
        setSurveys(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/surveys/${id}`);
      setSurveys(surveys.filter((survey) => survey._id !== id));
    } catch (err) {
      console.error("Error deleting survey:", err);
    }
  };

  if (isLoading) {
    return <div>Loading surveys...</div>;
  }

  if (error) {
    return <div>Error loading surveys: {error}</div>;
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
        Add New Survey
        </h2>
        <Link to="/addSurvey" className="btn btn-ghost bg-gray-400 text-white font-bold hover:bg-green-500">
        <FaPlusCircle className="text-white"/>Add Survey
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surveys.map((survey) => (
          <div key={survey._id} className="bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">{survey.title}</h3>
            <p className="text-gray-600 mb-4">{survey.description}</p>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm mb-4">{survey.category}</p>
            <div className="flex justify-between">
              <Link
                to={`/surveys/edit/${survey._id}`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(survey._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyorDashboard;
