import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddSurvey = () => {
  const {user}=useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const axiosPublic=useAxiosPublic()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleRadioChange = (event) => {
    setCount(event.target.value === "yes" ? 1 : 0);
  };

  const validateForm = () => {
    if (!title || !description || !category || !deadline) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const survey = {
      image,
      title,
      description,
      category,
      deadline,
      status: "publish",
      createdAt: new Date().toISOString().split('T')[0],
      voteCount: count,
      surverior: user.email,
    };

    // Send formData to your server endpoint
  axiosPublic.post('/surveys', survey)
  };

  return (
    <div className="w-full bg-base-200 rounded-xl mt-6 mb-16 py-8 px-4">
      <h2 className="text-3xl text-center font-extrabold mb-6">Add New Survey</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full">
          <label className="text-black font-bold">Survey Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter your survey title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter Description"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="input input-bordered w-full"
          >
            <option value="">Select a category</option>
            <option value="Employee Engagement Survey">Employee Engagement Survey</option>
            <option value="Product Feedback Survey">Product Feedback Survey</option>
            <option value="Website Usability Survey">Website Usability Survey</option>
            <option value="Market Research Survey">Market Research Survey</option>
            <option value="Health and Wellness Survey">Health and Wellness Survey</option>
            <option value="Customer Satisfaction Survey">Customer Satisfaction Survey</option>
          </select>
        </div>
        <div className="w-full">
          <label className="text-black font-bold outline-none">Survey Deadline</label>
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-black font-bold">Survey Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleImageChange}
            placeholder="Enter your survey image URL"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4 space-y-4">
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2">Is this Survey helpful?</p>
            <div className="flex items-center">
              <input
                type="radio"
                name="radio-1"
                value="yes"
                className="radio"
                onChange={handleRadioChange}
              />
              <label className="ml-2">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="radio-1"
                value="no"
                className="radio"
                onChange={handleRadioChange}
              />
              <label className="ml-2">No</label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded text-xl hover:bg-green-600 font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSurvey;
