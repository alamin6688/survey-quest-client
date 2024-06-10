import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {

  const {user, logOut} = useAuth();

  const handleLogout = () =>{
    logOut()
      .then(()=>{})
      .catch(error => console.error(error))
  }

  const navLinks = (
    <>
      <li><Link to="/" className="font-bold">Home</Link></li>
      {
      user? <>
      <li><Link onClick={handleLogout} className="font-bold">Logout</Link></li>
      </> : 
      <>
      <li><Link to="/login" className="font-bold">Login  </Link></li>
      </>
    }
      <li><Link to="/signup" className="font-bold">Sign Up</Link></li>

    </>
  );

  return (
    <>
      <div className="navbar bg-base-200">
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
          <Link to="/" className="btn btn-ghost font-bold text-2xl md:text-4xl">
            Survey <span className="text-green-500">Quest</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn bg-green-500 hover:bg-green-600 text-white border-none hover:font-bold">
            <Link to="">Get Started</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
