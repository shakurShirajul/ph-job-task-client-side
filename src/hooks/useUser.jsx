import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";


const useUser = () => {
    const { user, loading } = useContext(AuthContext);
    const { data: isUser, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://japanese-language-app.vercel.app/users/checking?role=user&email=${user.user_email}`, { withCredentials: true });
            return res.data?.validation;
        }
    })
    return [isUser, isUserLoading]
};
export default useUser;