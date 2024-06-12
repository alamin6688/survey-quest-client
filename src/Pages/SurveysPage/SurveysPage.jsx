import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    // Fetch surveys from the API
    axios
      .get("http://localhost:5000/surveys")
      .then((response) => {
        console.log(response.data);
        setSurveys(response.data);
        setFilteredSurveys(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the surveys!", error);
      });
  }, []);

  // Filter surveys by category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    filterSurveys(e.target.value, sortOption);
  };

  // Sort surveys by vote count or date
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    filterSurveys(category, e.target.value);
  };

  const filterSurveys = (category, sortOption) => {
    let filtered = [...surveys];

    if (category) {
      filtered = filtered.filter((survey) => survey.category === category);
    }

    if (sortOption === "votes") {
      filtered.sort((a, b) => b.voteCount - a.voteCount);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredSurveys(filtered);
  };

  return (
    <div className="mb-12">
      <div className="filters md:flex flex-col text-center justify-center items-center gap-2 mt-4 mb-6 md:text-xl font-bold">
        <div>
          <select value={category} onChange={handleCategoryChange}>
            <option value="" className="text-center">
              All Categories
            </option>
            <option value="category1">Employee Engagement Survey</option>
            <option value="category2">Product Feedback Survey</option>
            <option value="category3">Website Usability Survey</option>
            <option value="category4">Market Research Survey</option>
            <option value="category5">Health and Wellness Survey</option>
            <option value="category6">Customer Satisfaction Survey</option>
          </select>
        </div>

        <div>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="latest" className="text-center">
              Latest
            </option>
            <option value="votes">Most Voted</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 rounded-lg px-4 md:px-0">
        {filteredSurveys?.map((survey) => (
          <div key={survey._id} className="border-2 rounded-xl shadow-xl space-y-2 p-4">
            <img src={survey.image} alt="Survey img" className="w-full h-[250px] object-cover"/>
            <h2 className="text-2xl font-bold pt-4 h-[75px]">{survey.title}</h2>
            <p>{survey.description}</p>
            <p>Votes: {survey.voteCount}</p>
            <Link to={`/survey-details/${survey._id}`} className="btn btn-ghost bg-green-500 text-white font-bold hover:bg-green-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysPage;
