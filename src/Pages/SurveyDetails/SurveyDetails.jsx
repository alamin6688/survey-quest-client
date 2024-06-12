import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useProUser from "../../Hooks/useProUser";

const SurveyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isProUser] = useProUser();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInfo = {
      voteCount: currentSurvey.vote.voteCount + 1,
      votedUser: user.email,
      id: currentSurvey._id,
    };
    console.log(newInfo);

    axiosPublic.put(`/surveys`, newInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
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
      comment,
      commentedUser: user.email,
      id: currentSurvey._id,
    };
    console.log(newData);
    axiosPublic.put(`/surveys/comment`, newData).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleReport = () => {
    const newReport = {
      reportedUser: user.email,
      id: currentSurvey._id,
    };
    console.log(newReport);
    axiosPublic.put(`/surveys/report`, newReport).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-4xl text-center font-bold mb-4">Enter Your Survey</h2>
      <div className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <label className="text-black font-bold">Survey Title</label>
            <input
              type="text"
              name="title"
              defaultValue={currentSurvey?.title}
              className="w-full"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="text-black font-bold">Survey Description</label>
            <input
              type="text"
              name="description"
              defaultValue={currentSurvey?.description}
              className="w-full"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="text-black font-bold">Survey Category</label>
            <input
              type="text"
              name="category"
              defaultValue={currentSurvey?.category}
              className="w-full"
              readOnly
            />
          </div>
          <div className="flex justify-evenly">
            <div className="w-full">
              <label className="text-black font-bold outline-none">
                Created At
              </label>
              <input
                defaultValue={formatDateForInput(currentSurvey?.createdAt)}
                className="w-full"
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="text-black font-bold">Vote Count</label>
              <input
                defaultValue={currentSurvey?.vote.voteCount}
                className=" w-full"
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            {user ? (
              <div>
                {currentSurvey.vote.votedUser === user.email ? (
                  <>
                    {" "}
                    <button
                      disabled
                      type="submit"
                      value="Already voted"
                      className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
                    >
                      Alredy Voted
                    </button>
                  </>
                ) : (
                  <input
                    type="submit"
                    value="Vote Now"
                    className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
                  />
                )}
              </div>
            ) : (
              <Link
                to={`/login`}
                className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
              >
                Login to Vote
              </Link>
            )}
          </div>
        </form>
        {isProUser && (
          <form onSubmit={handleSubmitComment}>
            {isProUser ? (
              <>
                <div className="w-full mt-14">
                  <label className="text-black font-bold">Add Comment</label>
                  <input
                    type="text"
                    name="comment"
                    placeholder="Add your comment...."
                    className="input input-bordered w-full h-24"
                  />
                </div>
                <>
                  {currentSurvey.comments.commentedUser === user.email ? (
                    <div className="w-full mt-14">
                      <input
                        type="submit"
                        disabled
                        value="Alredy Commented"
                        className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
                      />
                    </div>
                  ) : (
                    <div className="w-full mt-14">
                      <input
                        type="submit"
                        value="Post Comment"
                        className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
                      />
                    </div>
                  )}
                </>
              </>
            ) : (
              ""
            )}
          </form>
        )}
        <div>
          {user ? (
            <form onSubmit={handleReport}>
              <div className="w-full mt-14">
              {
                currentSurvey.reports.reportedUser===user.email?
                 <input
                 type="submit"
                 disabled
                 value="Reported"
                 className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
               />
               :
               <input
               type="submit"
               value="Report"
               className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600 "
             />
               }
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
