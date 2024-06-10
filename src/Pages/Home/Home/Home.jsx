import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";


const Home = () => {
    return (
        <div>
        <Helmet>
          <title>Survey Quest</title>
        </Helmet>
            <Banner></Banner>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;