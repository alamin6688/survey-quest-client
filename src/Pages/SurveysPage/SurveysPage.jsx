import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SurveysPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [category, setCategory] = useState('');
    const [sortOption, setSortOption] = useState('latest');

    useEffect(() => {
        // Fetch surveys from the API
        axios.get('http://localhost:5000/surveys')
            .then(response => {
                console.log(response.data)
                setSurveys(response.data);
                setFilteredSurveys(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the surveys!', error);
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
            filtered = filtered.filter(survey => survey.category === category);
        }

        if (sortOption === 'votes') {
            filtered.sort((a, b) => b.voteCount - a.voteCount);
        } else {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredSurveys(filtered);
    };

    return (
        <div>
            <h1>All Surveys</h1>

            <div className="filters">
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more categories as needed */}
                </select>

                <select value={sortOption} onChange={handleSortChange}>
                    <option value="latest">Latest</option>
                    <option value="votes">Most Voted</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 rounded-lg">
                {filteredSurveys?.map(survey => (
                    <div key={survey._id} className="card-body border">
                        <h2>{survey.title}</h2>
                        <p>{survey.description}</p>
                        <p>Votes: {survey.voteCount}</p>
                        <Link to={`/survey-details/${survey._id}`} className='btn btn-info'>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveysPage;
