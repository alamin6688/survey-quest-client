import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateSurvey = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [currentSurvey, setCurrentSurvey] = useState(null);

  const {
    data: surveys = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/surveys`);
      return res.data;
    },
  });

  useEffect(() => {
    if (surveys.length) {
      const survey = surveys.find((survey) => survey._id === id);
      setCurrentSurvey(survey);
    }
  }, [surveys, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading survey: {error.message}</div>;
  }

  if (!currentSurvey) {
    return <div>No survey found</div>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const deadline = form.deadline.value;

    const survey = {
      image,
      title,
      description,
      category,
      deadline,
    };

    axiosPublic.patch(`/surveys/${currentSurvey._id}`, survey).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-full bg-base-200 rounded-xl mt-6 mb-16 py-8 px-4">
      <h2 className="text-3xl text-center font-extrabold mb-6">
        Update Survey
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="w-full">
          <label className="text-black font-bold">Survey Title</label>
          <input
            type="text"
            name="title"
            defaultValue={currentSurvey.title}
            placeholder="Enter your survey title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Description</label>
          <input
            type="text"
            name="description"
            defaultValue={currentSurvey.description}
            placeholder="Enter Description"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Category</label>
          <select
            name="category"
            defaultValue={currentSurvey.category}
            className="input input-bordered w-full"
          >
            <option value="">Select a category</option>
            <option value="Employee Engagement Survey">
              Employee Engagement Survey
            </option>
            <option value="Product Feedback Survey">
              Product Feedback Survey
            </option>
            <option value="Website Usability Survey">
              Website Usability Survey
            </option>
            <option value="Market Research Survey">
              Market Research Survey
            </option>
            <option value="Health and Wellness Survey">
              Health and Wellness Survey
            </option>
            <option value="Customer Satisfaction Survey">
              Customer Satisfaction Survey
            </option>
          </select>
        </div>
        <div className="w-full">
          <label className="text-black font-bold outline-none">
            Survey Deadline
          </label>
          <input
            type="date"
            name="deadline"
            defaultValue={currentSurvey.deadline}
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={currentSurvey.image}
            placeholder="Enter your survey image URL"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded text-xl hover:bg-green-600 font-bold"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSurvey;
