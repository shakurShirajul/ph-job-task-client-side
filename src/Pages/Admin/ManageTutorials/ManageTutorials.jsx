import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../Providers/AuthProviders";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ManageTutorials = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const tutorial_title = form.title.value;
        const tutorial_link = form.link.value;

        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://japanese-language-app.vercel.app/add-tutorial?email=${user.user_email}`,
                { tutorial_title, tutorial_link },
                { withCredentials: true }
            );
            toast.success("Tutorial added successfully!");
            form.reset(); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add tutorial.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto p-5">
                <div className="space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold">Manage Tutorials</h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmitForm} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <label>
                                        <h1 className="font-medium">Tutorial Title:</h1>
                                        <input
                                            type="text"
                                            className="input w-full input-bordered focus:outline-none"
                                            placeholder="(e.g. How To Speak In Japanese)"
                                            name="title"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <h1 className="font-medium">Embed Link:</h1>
                                        <input
                                            type="text"
                                            className="input w-full input-bordered focus:outline-none"
                                            placeholder="(e.g. youtube.com)"
                                            name="link"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className={`btn btn-success border-none text-white text-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Adding..." : "Add Tutorial"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default ManageTutorials;
