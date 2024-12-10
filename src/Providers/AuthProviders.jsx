import { useEffect, useState } from "react";
import { createContext } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import Cookies from 'js-cookie';
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const register = (user_name, user_email, user_password) => {
        setLoader(true);
        return axios.post('http://localhost:5000/register', { user_name, user_email, user_password})
    }

    const  login = async (user_email, user_password) => {
        setLoader(true);
        console.log("here")
        try {
            const response = await axios.post('http://localhost:5000/login', { user_email, user_password }, { withCredentials: true });
            if (response.data.length !== 0) {
                const token = await axios.post('http://localhost:5000/jwt', { email: response.data.userData.user_email }, { withCredentials: true });
                console.log(token);
            }
            console.log(response.data);
            setUser(response.data);
            return true;
        } catch (error) {
            // errorToast("Credintials Doesn't Matched");
        } finally {
            setLoader(false);
        }
    }

    const logout = () => {
        setUser(null);
        axios.post(`http://localhost:5000/logout`,{}, {withCredentials: true})
    }

    useEffect(() => {
        console.log("Useeffect", user);
        axios.post(`http://localhost:5000/validate-token`, {}, { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => { })
        setLoader(false);
    }, [])

    // const updateToast = (toastMessage) => {
    //     toast.info(toastMessage, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    // }

    // const successToast = (toastMessage) => {
    //     toast.success(toastMessage, {
    //         position: "top-center",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    // };

    // const errorToast = (toastMessage) => {
    //     toast.error(toastMessage, {
    //         position: "top-center",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    // };

    const authInfo = {
        // user,
        // setUser,
        // currentUser,
        // setCurrentUser,
        // loader,
        // setLoader,
        // register,
        // signIn,
        // logout,
        // successToast,
        // errorToast
        register,
        login,
        logout,
        user,
        setUser,
        loader,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProviders;