import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Payments from "../Pages/Payments/Payments";
import SurveysPage from "../Pages/SurveysPage/SurveysPage";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import ManageSurveys from "../Pages/Dashboard/AdminDashboard/ManageSurveys";
import PaymentsAndResponses from "../Pages/Dashboard/AdminDashboard/PaymentsAndResponses";
import SurveyorDashboard from "../Pages/SurveyorDashboard/SurveyorDashboard";
import AddSurvey from "../Pages/SurveyorDashboard/AddSurvey";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/payment",
        element: <Payments />,
      },
      {
        path: "/surveyor-dashboard",
        element: <SurveyorDashboard />,
      },
      {
        path: "/addSurvey",
        element: <AddSurvey />,
      },
      {
        path: "/surveys-page",
        element: <SurveysPage />,
      },
      {
        path: "/survey-details/:id",
        element: <SurveyDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin/users",
        element: <ManageUsers />,
      },
      {
        path: "admin/surveys",
        element: <ManageSurveys />,
      },
      {
        path: "admin/payments",
        element: <PaymentsAndResponses />,
      },
    ],
  },
]);
