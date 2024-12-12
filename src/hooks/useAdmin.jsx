import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log("HERE I AM IS")
            const res = await axios.get(`https://japanese-language-app.vercel.app/users/checking?role=admin&email=${user.user_email}`,{ withCredentials: true });
            return res.data?.validation;
        }
    })
    return [isAdmin, isAdminLoading]
};
export default useAdmin;