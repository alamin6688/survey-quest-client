import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const SurveyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [voted, setVoted] = useState(false); // State to track if user has voted
  const [voteError, setVoteError] = useState(null); // State to handle voting errors

  const { data: surveys, isLoading, error, refetch } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/surveys`);
      return res.data;
    },
  });

  const handleVote = async () => {
    try {
      // Simulate API call to vote (replace with actual API call)
      // Example: await axios.post(`/api/surveys/${id}/vote`, { userId: user.uid });
      setVoted(true); // Set voted to true
      await refetch(); // Refresh survey data after voting
    } catch (error) {
      setVoteError("Failed to vote. Please try again."); // Handle voting error
    }
  };

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
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-3">{currentSurvey.title}</h1>
        <p className="text-gray-700 text-base mb-2">{currentSurvey.description}</p>
        <p className="text-gray-600 text-sm mb-1">Category: {currentSurvey.category}</p>
        <p className="text-gray-600 text-sm mb-1">Votes: {currentSurvey.voteCount}</p>
        <p className="text-gray-600 text-sm mb-4">
          Created At: {new Date(currentSurvey.createdAt).toLocaleDateString()}
        </p>

        {/* Voting Section (Visible only to logged-in users) */}
        { !voted && (
         <div>
            {
            user?
            <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
            onClick={handleVote}
          >
            Vote
          </button>
          :
          <Link to={`/login`}  
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
          onClick={handleVote}
        >
          Login to Vote
        </Link>
         }
         </div>
        )}

        {/* Display voting error if any */}
        {voteError && <p className="text-red-500 mt-2">{voteError}</p>}

        {/* Pro-user comment section (Visible only to pro-users) */}
        {user?.role === "pro" && (
          <div className="mt-4">
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Add a comment..."
            ></textarea>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
            >
              Add Comment
            </button>
          </div>
        )}

        {/* Visual results section (To be implemented) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Survey Results</h2>
          <p className="text-gray-600">Visual representation of survey results will be displayed here.</p>
          {/* Replace with actual visual representation (charts, graphs, etc.) */}
        </div>

        {/* Report survey section (To be implemented) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Report Survey</h2>
          <p className="text-gray-600">Option to report inappropriate surveys will be added here.</p>
          {/* Implement report functionality */}
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
