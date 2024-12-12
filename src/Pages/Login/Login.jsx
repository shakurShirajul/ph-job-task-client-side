import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user_email = form.email.value;
        const user_password = form.password.value;

        try {
            setIsLoading(true);
            setTimeout(async () => {
                const response = await login(user_email, user_password);

                if (response) {
                    if (user && user.user_role === 'admin') {
                        navigate('/dashboard');
                    } else if (user && user.user_role === 'user') {
                        navigate('/');
                    } else {
                        console.error("Unknown user role");
                    }
                } else {
                    console.error("Login failed");
                }
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Error during login:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.user_role === 'admin') {
                navigate('/dashboard/createlesson');
            } else if (user.user_role === 'user') {
                navigate('/');
            }
        }
    }, [user, navigate]);

    return (
        <div className="h-screen">
            <div className="flex justify-center items-center h-full font-ubuntu">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLoginForm} className="card-body border rounded-md">
                        <h1 className="text-4xl font-bold">Login Now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email:</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password:</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary font-ubuntu text-white font-semibold text-lg">
                                Login
                            </button>
                        </div>
                        <div className="text-xs text-center">
                            <p>Don&apos;t have an account? <span className="text-blue-700 font-bold"><Link to={'/register'}>Register</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && (
                <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Login;
