import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const User = () => {
    const noNavbarRoutes = ["/login", "/register"];
    return (
        <>
            <div className="max-w-5xl mx-auto">
                {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
                <Outlet />
                {!noNavbarRoutes.includes(location.pathname) && <Footer />}
            </div>
        </>
    );
};
export default User;