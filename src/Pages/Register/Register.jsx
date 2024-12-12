import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { register, successToast, errorToast } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState([]);
    const [passwordError, setPasswordError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRegistrationForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user_name = form.name.value;
        const user_email = form.email.value;
        const user_password = form.password.value;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~]).{6,}$/;

        if (!passwordRegex.test(user_password)) {
            setPasswordError(true); // Show error message
            let errorMessages = [];

            if (user_password.length < 6) errorMessages.push("Password must be at least 6 characters long");
            if (!/[A-Z]/.test(user_password)) errorMessages.push("Password must contain at least one uppercase letter");
            if (!/\d/.test(user_password)) errorMessages.push("Password must contain at least one number");
            if (!/[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~]/.test(user_password)) errorMessages.push("Password must contain at least one special symbol");

            setErrorMessage(errorMessages);
            return;
        }

        setPasswordError(false);
        setErrorMessage([]);

        let imageUrl = '';
        try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const imageResponse = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            imageUrl = imageResponse.data.data.display_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            errorToast("Image upload failed");
            return;
        }

        register(user_name, user_email, user_password, imageUrl)
            .then(response => {
                successToast("Registration Successful");
                form.reset();
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch(error => {
                errorToast(error.response.data.message);
                console.error(error);
            });
    };

    return (
        <>
            <div className="h-screen">
                <div className="flex justify-center items-center h-full font-ubuntu">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegistrationForm} className="card-body border rounded-md">
                            <h1 className="text-4xl font-bold">Register Now</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Full Name:</span>
                                </label>
                                <input type="text" placeholder="John Doe" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email:</span>
                                </label>
                                <input type="email" placeholder="example@gmail.com" name="email" className="input input-bordered" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Profile Photo:</span>
                                </label>
                                <div className="flex">
                                    <input type="file" id="files" name="image" className="w-full" onChange={handleFileChange} required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password:</span>
                                </label>
                                <input type="password" placeholder="****************" name="password" className="input input-bordered" required />
                            </div>

                            {passwordError && (
                                <div className="text-red-500 text-sm mt-2">
                                    <ul>
                                        {errorMessage.length && <li>- Password must be at least 6 characters long</li>}
                                        {errorMessage.includes("Password must contain at least one uppercase letter") && <li>- Password must contain at least one uppercase letter</li>}
                                        {errorMessage.includes("Password must contain at least one number") && <li>- Password must contain at least one number</li>}
                                        {errorMessage.includes("Password must contain at least one special symbol") && <li>- Password must contain at least one special symbol</li>}
                                    </ul>
                                </div>
                            )}

                            <div className="form-control mt-6">
                                <button className="btn btn-primary font-ubuntu text-white font-semibold text-lg">Create Account</button>
                            </div>
                            <div className="text-xs text-center">
                                <p>Already Have an Account? <span className="text-blue-700 font-bold"><Link to={'/login'}>Login</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Register;


