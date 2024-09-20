import { Link, NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { RiSurveyFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCommentDollar } from "react-icons/fa";
import useAdmin from "../../Hooks/useAdmin";
import useProUser from "../../Hooks/useProUser";
import useSurveyor from "../../Hooks/useSurveyor";
import useUser from "../../Hooks/useUser";
import { FaPeopleRobbery } from "react-icons/fa6";
import { MdReport } from "react-icons/md";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isProUser, isProUserLoading] = useProUser();
  const [isSurveyor, isSurveyorLoading] = useSurveyor();
  const [isUser, isUserLoading] = useUser();

  if (
    isProUserLoading ||
    isAdminLoading ||
    isSurveyorLoading ||
    isUserLoading
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg scale-110"></span>
      </div>
    );
  }
  console.log(isAdmin, isProUser, isUser);
  return (
    <div className="flex flex-col md:flex-row md:gap-5">
      {/* Dashboard sidebar */}
      <div className="flex flex-row md:flex-col font-semibold justify-between md:justify-start md:w-64 md:min-h-screen bg-[#262e42] text-white">
        <div>
          {isAdmin && (
            <div>
              <ul className="menu  flex flex-col md:gap-5 ">
                <li>
                  <NavLink to={`admin/users`}>
                    <IoHome />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`admin/surveys`}>
                    <BsFillPeopleFill />
                    Manage Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`admin/payments`}>
                    <FaCommentDollar />
                    Payments
                  </NavLink>
                </li>
              </ul>
              <hr className="w-full mx-auto md:my-5 hidden md:block" />
            </div>
          )}
        </div>

        <div>
          {isSurveyor && (
            <div>
            <ul className="menu  flex flex-col md:gap-5 ">
              <li>
                <NavLink to={`SurveyorDashboard`}>
                  <IoHome />
                  Manage My Survays
                </NavLink>
              </li>
            </ul>
            <hr className="w-full mx-auto md:my-5 hidden md:block" />
          </div>
          )}
        </div>

        <div>
          {
            isProUser &&(
              <div>
              <ul className="menu  flex flex-col md:gap-5 ">
                <li>
                  <NavLink to={`surveys-page`}>
                    <FaPeopleRobbery  />
                    Participate in Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`reported-surveys`}>
                    <MdReport  />
                    Reported Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`my-comments`}>
                    <MdReport  />
                    My Comments
                  </NavLink>
                </li>
              </ul>
              <hr className="w-full mx-auto md:my-5 hidden md:block" />
            </div>
            )
          }
        </div>


        <div>
          {isUser && (
            <div>
              <ul className="menu  flex flex-col md:gap-5 ">
                <li>
                  <NavLink to={`surveys-page`}>
                    <FaPeopleRobbery  />
                    Participate in Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`reported-surveys`}>
                    <MdReport  />
                    Reported Surveys
                  </NavLink>
                </li>
              </ul>
              <hr className="w-full mx-auto md:my-5 hidden md:block" />
            </div>
          )}
        </div>

        {/* Shared navlink */}
        <div>
          <ul className="menu pb-0 flex flex-col md:gap-2">
            <li>
              <Link to={`/`}>
                <IoHome /> HOME
              </Link>
            </li>
            <li>
              <Link to={`/surveys-page`}>
                <RiSurveyFill /> Surveys Page
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-2 md:p-5">
        <Outlet />
          <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
            <img src="https://i.postimg.cc/6q7vVRWf/rag-doll-near-white-board-with-color-chart.jpg" alt="" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600">
              Welcome To Dashboard!
            </h1>
            <p className="w-full md:w-3/4 mx-auto text-center">
              Explore insights and manage your tasks efficiently on your personalized dashboard!
            </p>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
