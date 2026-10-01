import { createBrowserRouter } from "react-router-dom";


import Layout from "../Components/Layout/MainLayout";
import Home from "../Pages/ComonPages/Home";
import UserLogin from "../Pages/UserPages/UserLogin";
import About from "../Pages/ComonPages/About";
import Contact from "../Pages/ComonPages/Contact";
import Github from  "../Pages/ComonPages/Github";
import GamePlay  from "../Pages/ComonPages/GamePlay";
import Dashboard from "../Pages/UserPages/Dashboard";
import Signup from "../Pages/UserPages/UserSignUp";
import Profile from "../Pages/UserPages/UserProfile";




const Router = createBrowserRouter([
    {
        path : "/",
        element : < Layout />,
      
        children : [
            {
                path : "",
                element : < Home />
            },
            {
                path : "/about",
                element : < About />
            },
            {
                path : "/contact",
                element : < Contact />
            },
            {
                path : "/github",
                element : < Github />
            },
            {
                path : "/gameplay",
                element : < GamePlay />
            },
            {
                path : "/login",
                element : < UserLogin />
            },
            {
                path : "/dashboard",
                element : < Dashboard />
            },
            {
                path : "/signup",
                element : < Signup />
            },
            {
                path : "/profile",
                element : < Profile />
            },
        ]
    }
])


export default Router;