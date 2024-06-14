import { Link, NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { RiSurveyFill } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaCommentDollar, FaHistory } from "react-icons/fa";
import useAdmin from "../../Hooks/useAdmin";
import useProUser from "../../Hooks/useProUser";
import useSurveyor from "../../Hooks/useSurveyor";
import useUser from "../../Hooks/useUser";

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
      <div className="flex flex-row md:flex-col justify-between md:justify-start md:w-64 md:min-h-screen bg-blue-400">
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
          {isProUser && (
            <div>
              <ul className="menu  flex flex-col md:gap-5 ">
                <li>
                  <NavLink to={`my-profile`}>
                    <IoHome />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`make-payment`}>
                    <MdPayments />
                    Make Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`payment-history`}>
                    <FaHistory />
                    Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`announcements`}>
                    <GrAnnounce />
                    Announcements
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
                <NavLink to={`/SurveyorDashboard`}>
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
          {isUser && (
            <div>
              <ul className="menu  flex flex-col md:gap-5 ">
                <li>
                  <NavLink to={`/surveys-page`}>
                    <IoHome />
                    Participate in Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to={``}>
                    <GrAnnounce />
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
      </div>
    </div>
  );
};

export default Dashboard;
