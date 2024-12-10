import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const Register = () => {

    const { register } = useContext(AuthContext);
    const handleRegistrationForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const user_name = form.name.value;
        const user_email = form.email.value;
        // const user_image = form.photo.value;
        const user_password = form.password.value;

        console.log(user_email, user_name,  user_password);

        register(user_name, user_email,  user_password)
            .then(response => {
                console.log(response.data);
                // successToast("Registration Successfull")
            })
            .catch(error => {

            });

    }
    return (
        <>
            <div className="h-screen">
                <div className="flex justify-center items-center h-full">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegistrationForm} className="card-body border rounded-md">
                            <h1 className="text-3xl font-bold">Register Now</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="John Doe" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="example@gmail.com" name="email" className="input input-bordered" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <div className="flex">
                                    <input type="file" id="files" name="image" className="w-full" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="****************" name="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="text-xs text-center">
                                <p>Already Have an Account? <span className="text-blue-700 font-bold"><Link to={'/Login'}>Login</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Register;