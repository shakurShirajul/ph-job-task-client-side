import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import LessonsTable from "../ManageLessons/LessonsTable";
import { ToastContainer } from "react-toastify";

const CreateLessons = () => {

    const { user, successToast, errorToast } = useContext(AuthContext);

    const handleCreateLessonsForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const lesson_title = form.title.value.trim();
        const lesson_number = form.number.value.trim();

        if (isNaN(lesson_number) || lesson_number <= 0) {
            errorToast("Lesson number must be a positive number.");
            return;
        }

        try {
            const response = await axios.post(
                `https://japanese-language-app.vercel.app/create-lesson`,
                {
                    email: user.user_email,
                    lesson_title,
                    lesson_number,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                successToast("Lesson created successfully.");
                refetch(); 
                form.reset();
            } else {
                errorToast("Failed to create the lesson. Please try again.");
            }
        } catch (error) {
            console.error("Error creating lesson:", error);
            if (error.response && error.response.data && error.response.data.message) {
                errorToast(error.response.data.message);
            } else {
                errorToast("An unexpected error occurred while creating the lesson.");
            }
        } finally {
            // 
        }
    };


    const { data: lessons = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['lessons', user?.user_email],
        queryFn: async () => {
            const res = await axios.get(`https://japanese-language-app.vercel.app/lessons?email=${user?.user_email}`, {
                withCredentials: true,
            });
            return res.data;
        },
    });

    // Handle Edit Lesson Title
    const handleEditLessonTitle = async (lesson_title, id) => {
        const response = await axios.patch(`https://japanese-language-app.vercel.app/edit-lesson?email=${user.user_email}`, { id, lesson_title }, { withCredentials: true, });
        // console.log(response.data);
        refetch();
    }

    // Handle Edit Lesson Number
    const handleEditLessonNumber = async (lesson_number, id) => {
        try {
            const response = await axios.patch(
                `https://japanese-language-app.vercel.app/edit-lesson?email=${user.user_email}`,
                { id, lesson_number },
                { withCredentials: true }
            );
            console.log("Lesson updated successfully:", response.data);
            refetch();
        } catch (error) {
            console.error("Failed to update lesson:", error.response?.data || error.message);
        }
    };
    return <>
        <div>
            <div>
                <div className="space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold">Create New Lesson</h1>
                    </div>
                    <form onSubmit={handleCreateLessonsForm}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <label htmlFor="" className="space-y-2">
                                    <h1 className="font-semibold">Lesson Name:</h1>
                                    <input type="text" name="title" placeholder="e.g. Greetings" className="input input-bordered w-full focus:outline-none" />
                                </label>
                                <label htmlFor="" className="space-y-2">
                                    <h1 className="font-semibold">Lesson Number:</h1>
                                    <input type="text" name="number" placeholder="e.g. 0" className="input input-bordered w-full focus:outline-none" />
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <input type="submit" value={"Create Lesson"} className="btn btn-success text-base text-white" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    </>
}
export default CreateLessons;