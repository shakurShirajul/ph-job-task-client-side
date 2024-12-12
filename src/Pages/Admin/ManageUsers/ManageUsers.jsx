import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import UsersTable from "./UsersTable";

const ManageUsers = () => {
    const { user } = useContext(AuthContext);

    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', user?.user_email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users?email=${user?.user_email}`, {
                withCredentials: true,
            });
            return res.data;
        },
    });

    // Update user role
    const updateUserRole = async (id, role) => {
        const response = await axios.patch(`http://localhost:5000/update-role`, { email: user.user_email, id, role }, { withCredentials: true, });
        refetch();
    }


    // Handle loading and error states
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>;
    }

    return (
        <div className="font-mulish">
            <div className="space-y-5">
                <div>
                    <h1 className="text-4xl font-bold ">Create New Lesson</h1>
                </div>
                <div className="overflow-x-auto border rounded-xl">
                    <table className="table">
                        <thead className="text-base">
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <UsersTable key={index} user={user} updateUserRole={updateUserRole} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
