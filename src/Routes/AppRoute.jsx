


import { createBrowserRouter } from "react-router-dom";


import Layout from "../Components/Layout/MainLayout";
import HomePage from "../Pages/ComonPages/Home";
import UserLogin from "../Pages/UserPages/UserLogin";
import About from "../Pages/ComonPages/About";
import Contact from "../Pages/ComonPages/Contact";
import Github from "../Pages/ComonPages/Github";
import GamePlay from "../Pages/ComonPages/GamePlay";
import Dashboard from "../Pages/UserPages/Dashboard";
import Signup from "../Pages/UserPages/UserSignUp";
import Profile from "../Pages/UserPages/UserProfile";
import ChatPage from "../Pages/UserPages/UserChat";
import ProtectedRoute from "../Store/ProtectedRoute/ProtectedRoute";
import SearchPage from "../Pages/ComonPages/SearchPage";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [

            // PUBLIC
            {
                index: true,
                element: <HomePage />
            },

            // PROTECTED PAGES
            {
                element: <ProtectedRoute />,

                children: [
                    {
                        path: "about",
                        element: <About />
                    },
                    {
                        path: "contact",
                        element: <Contact />
                    },
                    {
                        path: "gameplay",
                        element: <GamePlay />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    },
                ]
            }
        ]
    },

    // PUBLIC
    {
        path: "/github",
        element: <Github />
    },

    {
        path: "/signup",
        element: <Signup />
    },

    {
        path: "/login",
        element: <UserLogin />
    },

    // PROTECTED
    {
        element: <ProtectedRoute />,

        children: [
            {
                path: "/chatpage",
                element: <ChatPage />
            }
        ]
    },
    {
        element: <ProtectedRoute />,

        children: [
            {
                path: "/searchpage",
                element: < SearchPage />
            }
        ]
    }
]);
export default Router;




