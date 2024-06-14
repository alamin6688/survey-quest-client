import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useProUser from "../../Hooks/useProUser";
import useAdmin from "../../Hooks/useAdmin";
import Swal from "sweetalert2";

const SurveyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isProUser] = useProUser();
  const [isAdmin] = useAdmin();
  //   const [selectedOption, setSelectedOption] = useState('');

  const {
    data: surveys,
    isLoading,
    error,
    refetch,
  } = useQuery({
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

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    const newVote = {
      voteCount: currentSurvey.voteCount + 1,
    };
    axiosPublic.put(`/surveys/${currentSurvey._id}/vote`, newVote)
    .then((res) => {
      console.log(res.data)
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Vote Added",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const newData = {
      commentedText:comment,
      commentedUser: user.email,
      surveyId: currentSurvey._id,
    };
    console.log(newData);
    axiosPublic.post(`/comments`, newData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Comment Added",
          showConfirmButton: false,
          timer: 1500
        });
        e.target.reset();
        refetch();
      }
    });
  };

  const handleReport = (e) => {
    e.preventDefault();
    const report = e.target.report.value;
    const newReport = {
      reportedText:report,
      reportedUser: user.email,
      surveyId: currentSurvey._id,
    };
    console.log(newReport);
    axiosPublic.post(`/reports`, newReport).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reported",
          showConfirmButton: false,
          timer: 1500
        });
        e.target.reset();
        refetch();
      }
    });
  };

  return (
    <div className="mt-10 bg-base-200 shadow-lg rounded-lg overflow-hidden pt-8 pb-4 md:px-8 mb-16">
      <h2 className="text-4xl text-center font-bold mb-4">Enter Your Survey</h2>
      <div className="p-5">
        <form onSubmit={handleVoteSubmit} className="space-y-4">
          <div className="w-full">
            <label className="text-black font-bold">Survey Title</label>
            <input
              type="text"
              name="title"
              defaultValue={currentSurvey?.title}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="text-black font-bold">Survey Description</label>
            <input
              type="text"
              name="description"
              defaultValue={currentSurvey?.description}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="text-black font-bold">Survey Category</label>
            <input
              type="text"
              name="description"
              value={currentSurvey?.category}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="flex gap-4 justify-evenly">
            <div className="w-full">
              <label className="text-black font-bold">Vote Count</label>
              <input
                defaultValue={currentSurvey?.voteCount}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="text-black font-bold outline-none">
                Created At
              </label>
              <input
                defaultValue={formatDateForInput(currentSurvey?.createdAt)}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            {user ? (
              <div>
                <input
                  type="submit"
                  value="Vote Now"
                  className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600"
                />
              </div>
            ) : (
              <Link
                to={`/login`}
                className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600"
              >
                Login to Vote
              </Link>
            )}
          </div>
        </form>
        {(isProUser || isAdmin) && (
          <form onSubmit={handleSubmitComment}>
            <div className="w-full mt-4">
              <label className="text-black font-bold">Comment</label>
              <input
                type="text"
                name="comment"
                placeholder="Add your comment..."
                className="input input-bordered w-full h-24"
              />
            </div>
            <div className="w-full mt-4">
              <input
                type="submit"
                value="Post Comment"
                className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600"
              />
            </div>
          </form>
        )}
        <div>
          {(isProUser || isAdmin) && (
            <form onSubmit={handleReport}>
              <div className="w-full mt-4 space-y-3">
              <div className="w-full mt-4">
              <label className="text-black font-bold">Report</label>
              <input
                type="text"
                name="report"
                placeholder="Add your report..."
                className="input input-bordered w-full h-24"
              />
            </div>

                <input
                  type="submit"
                  value="Report"
                  className="btn btn-ghost bg-red-500 text-white font-bold hover:bg-red-600"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
