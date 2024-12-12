import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const User = () => {
    const location = useLocation(); // Use the hook to access the current location
    const noNavbarRoutes = ["/login", "/register"];
    const noFooterRoutes = ["/login", "/register"];

    return (
        <div className="">
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Outlet />
            {!noFooterRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
};

export default User;
