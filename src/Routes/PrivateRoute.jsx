import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useUser from "../hooks/userUser";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isUser, isUserLoading] = useUser();
    const location = useLocation();
    if (loading || isUserLoading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    if (user && isUser) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;