import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Payments from "../Pages/Payments/Payments";
import SurveysPage from "../Pages/SurveysPage/SurveysPage";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <Signup></Signup>
        },
        {
            path: '/payment',
            element: <Payments></Payments>
        },
        {
            path: '/surveys-page',
            element: <SurveysPage></SurveysPage>
        },
        {
            path: '/survey-details/:id',
            element: <SurveyDetails></SurveyDetails>
        },
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
      
      ]
    }
  ]);