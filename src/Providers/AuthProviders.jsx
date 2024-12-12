import { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import Cookies from 'js-cookie';
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const register = (user_name, user_email, user_password, user_image) => {
        console.log(user_image);
        setLoader(true);
        return axios.post('http://localhost:5000/register', { user_name, user_email, user_password, user_image })
    }

    const login = async (user_email, user_password) => {
        setLoader(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { user_email, user_password }, { withCredentials: true });
            if (response.data.length !== 0) {
                const token = await axios.post('http://localhost:5000/jwt', { email: response.data.userData.user_email }, { withCredentials: true });
            }
            setUser(response.data.userData);
            return true;
        } catch (error) {
            errorToast("Email or Password Doesn't Matched");
        } finally {
            setLoader(false);
        }
    }

    const logout = () => {
        setUser(null);
        axios.post(`http://localhost:5000/logout`, {}, { withCredentials: true })
    }

    useEffect(() => {
        console.log("Useeffect", user);
        axios.post(`http://localhost:5000/validate-token`, {}, { withCredentials: true })
            .then((response) => {
                setUser(response.data[0]);
            })
            .catch((error) => { })
        setLoader(false);
    }, [])

    const updateToast = (toastMessage) => {
        toast.info(toastMessage, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const successToast = (toastMessage) => {
        toast.success(toastMessage, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const errorToast = (toastMessage) => {
        toast.error(toastMessage, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const authInfo = {
        register,
        login,
        logout,
        user,
        setUser,
        loader,
        updateToast,
        successToast,
        errorToast
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProviders;