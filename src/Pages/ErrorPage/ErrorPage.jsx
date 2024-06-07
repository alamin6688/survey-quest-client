import { Link } from "react-router-dom";
import errorImg from '../../assets/images/404.png'

const ErrorPage = () => {
    return (
        <div className="text-center min-h-screen bg-base-200 pt-32 space-y-4">
            <img src={errorImg} alt="" className="mx-auto mb-6"/>
          <Link to="/">
            <button className="btn bg-green-500  hover:bg-green-700 text-white text-2xl font-bold">
              Go Back
            </button>
          </Link>
      </div>
    );
};

export default ErrorPage;