import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaDove } from "react-icons/fa";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const activeNavRoute = "text-primary font-semibold text-xl";

    const NavRoutes = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive && activeNavRoute}> Lessons</NavLink></li>
        <li><NavLink to={'/tutorials'} className={({ isActive }) => isActive && activeNavRoute}> Tutorials</NavLink></li>
    </>
    return (
        <div className="border-b">
            <div className="max-w-7xl mx-auto">
                <div className="navbar bg-base-100 font-ubuntu">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {
                                    NavRoutes
                                }
                            </ul>
                        </div>
                        <Link>
                            <div className="flex justify-center items-center gap-2">
                                <img src="https://i.ibb.co.com/NY20FBM/language-App.png" alt="" className="w-11 h-11w-11" />
                                <h1 className="text-xl font-semibold">Bento Learn</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-lg">
                            {
                                NavRoutes
                            }
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.user_image} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        {user?.user_name}
                                    </a>
                                </li>
                                <li><button onClick={() => logout()}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;