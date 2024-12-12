import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Admin = () => {

    const activeButton = "border border-green-600 font-semibold";
    // const axiosSecure = useAxiosSecure();

    // const { user } = useContext(AuthContext);

    // const { data: role = [], isPending, isLoading } = useQuery({
    //     queryKey: ['role'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/role?email=${user.email}`, { withCredentials: true })
    //         return res.data;
    //     }
    // })

    const { user, logout } = useContext(AuthContext);

    const adminSide = <>
        <li><NavLink to='/dashboard/adminprofile' className={({ isActive }) => isActive && activeButton}>Dashboard</NavLink></li>
        <li><NavLink to='/dashboard/adminprofile' className={({ isActive }) => isActive && activeButton}>Lessons</NavLink></li>
        <li><NavLink to='/dashboard/createlessons' className={({ isActive }) => isActive && activeButton}>Add Lessons</NavLink></li>
        <li><NavLink to='/dashboard/createvocabularies' className={({ isActive }) => isActive && activeButton}>Add Vocabularies</NavLink></li>
        <li><NavLink to='/dashboard/manageusers' className={({ isActive }) => isActive && activeButton}>Manage Users</NavLink></li>
        <li><NavLink to='/dashboard/managelessons' className={({ isActive }) => isActive && activeButton}>Lesson Mangement</NavLink></li>
        <li><NavLink to='/dashboard/managevocabularies' className={({ isActive }) => isActive && activeButton}>Vocabulary Mangement</NavLink></li>
    </>


    return (
        <div className='p-5 lg:p-0'>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-80'>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mb-5 lg:hidden">
                                {/* <MenuOpenIcon /> */}
                            </label>
                        </div>

                        <div className="drawer-side z-[10]">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                            <ul className="menu p-4 w-80 h-screen bg-white text-base-content border-r">
                                {
                                    adminSide
                                }
                                <div className="divider"></div>
                                <li>
                                    <button onClick={() => { logout() }}>Logout</button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex-1 lg:p-10 overflow-y-auto'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Admin;