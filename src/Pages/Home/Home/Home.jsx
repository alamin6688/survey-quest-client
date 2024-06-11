import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import LatestSurveys from "../LatestSurveys/LatestSurveys";
import HowItWorks from "../HowItWorks/HowItWorks";


const Home = () => {
    return (
        <div>
        <Helmet>
          <title>Survey Quest</title>
        </Helmet>
            <Banner></Banner>
            <FeaturedSurveys></FeaturedSurveys>
            <LatestSurveys></LatestSurveys>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;