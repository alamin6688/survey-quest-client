import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import useSurveyor from "../../../Hooks/useSurveyor";
import useProUser from "../../../Hooks/useProUser";
import useUser from "../../../Hooks/useUser";

const Navbar = () => {
  const [isAdmin] = useAdmin();
  const [isProUser] = useProUser();
  const [isSurveyor] = useSurveyor();
  const [isUser] = useUser();

  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <Link to="/" className="font-bold text-green-500">
          Home
        </Link>
      </li>
      <li>
        <Link to="/surveys-page" className="font-bold">
          Surveys
        </Link>
      </li>
      <li>
        <Link to="/addSurvey" className="font-bold">
          Add Survey
        </Link>
      </li>

      <li>
        <Link to="/payment" className="font-bold">
          Payment
        </Link>
      </li>

      {user ? (
        <>
          {isAdmin && (
            <li>
              <Link to="dashboard/admin/users" className="font-bold">
                Dashboard
              </Link>
            </li>
          )}
          {isProUser && (
            <li>
              <Link to="dashboard/surveys-page" className="font-bold">
                Dashboard
              </Link>
            </li>
          )}
          {isSurveyor && (
            <li>
              <Link to="dashboard/SurveyorDashboard" className="font-bold">
                Dashboard
              </Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="dashboard/surveys-page" className="font-bold">
                Dashboard
              </Link>
            </li>
          )}
        </>
      ) : null}
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-4 shadow space-y-1 bg-gray-200 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost font-bold text-2xl md:text-4xl pl-0"
          >
            Survey <span className="text-green-500">Quest</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link
              onClick={handleLogout}
              className="btn bg-red-500 hover:bg-green-600 text-white border-none hover:font-bold"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn bg-green-500 hover:bg-green-600 text-white border-none hover:font-bold"
            >
              Login{" "}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
