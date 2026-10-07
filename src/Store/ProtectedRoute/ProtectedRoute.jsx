
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfile } from "../UserAuth/UserAuth";
 import LoadingPage from "../../Pages/ComonPages/LodingPage";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await UserProfile();

                setIsAuthenticated(true);

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <LoadingPage message="Loading..."/>
    }

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" replace />;
};

export default ProtectedRoute;