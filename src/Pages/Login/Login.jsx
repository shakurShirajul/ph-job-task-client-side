import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="h-screen">
            <div className="flex justify-center items-center h-full">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body border rounded-md">
                        <h1 className="text-3xl font-bold">Login Now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="text-xs text-center">
                            <p>Don't have an account? <span className="text-blue-700 font-bold"><Link to={'/register'}>Register</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;