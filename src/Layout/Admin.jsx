import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { FaUserCog } from "react-icons/fa";
import { TbVocabulary, TbVocabularyOff } from "react-icons/tb";
import { MdDashboard, MdOutlinePlayLesson, MdPlayLesson, MdMenuOpen } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Admin = () => {

    const activeButton = "bg-white font-semibold";

    const { user, logout } = useContext(AuthContext);

    const adminSide = <>
        <li><NavLink to='/dashboard' className={({ isActive }) => isActive && activeButton}><MdDashboard />Dashboard</NavLink></li>
        <li><NavLink to='/dashboard/adminprofile' className={({ isActive }) => isActive && activeButton}><MdPlayLesson />Lessons</NavLink></li>
        <li><NavLink to='/dashboard/createlessons' className={({ isActive }) => isActive && activeButton}><MdOutlinePlayLesson />Add Lessons</NavLink></li>
        <li><NavLink to='/dashboard/createvocabularies' className={({ isActive }) => isActive && activeButton}><TbVocabulary /> Add Vocabularies</NavLink></li>
        <li><NavLink to='/dashboard/manageusers' className={({ isActive }) => isActive && activeButton}><FaUserCog /> Manage Users</NavLink></li>
        <li><NavLink to='/dashboard/managelessons' className={({ isActive }) => isActive && activeButton}><MdPlayLesson /> Lesson Mangement</NavLink></li>
        <li><NavLink to='/dashboard/managevocabularies' className={({ isActive }) => isActive && activeButton}><TbVocabularyOff /> Vocabulary Mangement</NavLink></li>
    </>


    return (
        <div>
            <div className='p-5 lg:p-0 font-ubuntu'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='lg:w-80'>
                        <div className="drawer lg:drawer-open">
                            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer-2" className="btn btn-success drawer-button mb-5 lg:hidden">
                                    <MdMenuOpen className="text-xl text-white font-bold" />
                                </label>
                            </div>

                            <div className="drawer-side z-[10]">
                                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                                <ul className="menu p-4 w-80 h-full text-base text-neutral font-medium bg-white  border-r space-y-5">
                                    <div className="bg-neutral-content p-2 rounded-lg ">
                                        <div className="flex items-center gap-5">
                                            <div className="avatar">
                                                <div className="w-16 rounded-full">
                                                    <img src={user.user_image} />
                                                </div>
                                            </div>
                                            <div>
                                                <h1>{user.user_name}</h1>
                                                <p className="capitalize text-xs">{user.user_role}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-content p-2 rounded-lg ">
                                        {
                                            adminSide
                                        }
                                    </div>
                                    <div className="bg-neutral-content p-2 rounded-lg">
                                        <li>

                                            <button onClick={() => { logout() }}><IoLogOut />Logout</button>
                                        </li>
                                    </div>


                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 lg:p-10 overflow-y-auto'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;