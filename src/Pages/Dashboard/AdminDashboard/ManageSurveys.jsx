import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: surveys = [], refetch } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosSecure.get("/surveys");
      return res.data;
    },
  });

  const handlePublish = (id) => {
    axiosPublic.patch(`/surveys/${id}/publish`).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status Updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };
  const handleUnpublish = (id) => {
    axiosPublic.patch(`/surveys/${id}/unpublish`).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status Updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  return (
    <div>
      <h2>Manage Surveys</h2>
      <div>
        <table className="table ho w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys?.map((survey, index) => (
              <tr key={survey._id}>
                <td>{index + 1}</td>
                <td>
                  <span>{survey.title}</span>
                </td>

                <td>
                  <span>{survey.status}</span>
                </td>
                <td>
                  {survey.status === "publish" ? (
                    <button
                      onClick={() => handleUnpublish(survey._id)}
                      className="btn"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(survey._id)}
                      className="btn"
                    >
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSurveys;
