import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import LessonsTable from "./LessonsTable";

const CreateLessons = () => {

    const { user } = useContext(AuthContext);
    const handleCreateLessonsForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const lesson_title = form.title.value;
        const lesson_number = form.number.value;
        const response = await axios.post(`http://localhost:5000/create-lesson`, { email: user.user_email, lesson_title, lesson_number }, { withCredentials: true, });
        console.log(response.data);
        console.log(lesson_title, lesson_number);
        refetch();
        form.reset();
    }

    const { data: lessons = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['lessons', user?.user_email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/lessons?email=${user?.user_email}`, {
                withCredentials: true,
            });
            return res.data;
        },
    });

    // Handle Delete Lesson
    const handleDeleteLesson = async (id) => {
        const response = await axios.delete(`http://localhost:5000/delete-lesson?id=${id}&email=${user?.user_email}`, { withCredentials: true, });
        console.log(response.data);
        refetch();
    }

    // Handle Edit Lesson Title
    const handleEditLessonTitle = async (lesson_title, id) => {
        const response = await axios.patch(`http://localhost:5000/edit-lesson?email=${user.user_email}`, { id, lesson_title }, { withCredentials: true, });
        // console.log(response.data);
        refetch();
    }

    // Handle Edit Lesson Number
    const handleEditLessonNumber = async (lesson_number, id) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/edit-lesson?email=${user.user_email}`,
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
            <div className="flex justify-end">
                <button className="btn btn-success text-white" onClick={() => document.getElementById('my_modal_1').showModal()}>Create Lessons</button>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleCreateLessonsForm}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title">
                                        <span className="font-bold">Lesson Title:</span><br />
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Greetings"
                                            className="input input-bordered focus:outline-none w-full"
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="number">
                                        <span className="font-bold">Lesson Number:</span><br />
                                        <input
                                            pattern="^[0-9]+$"
                                            title="Only numbers are allowed. Please enter a valid number."
                                            type="text"
                                            name="number"
                                            placeholder="0"
                                            className="input input-bordered focus:outline-none w-full"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-success text-white" type="submit">Create</button>
                                <button
                                    className="btn btn-error text-white"
                                    type="button"
                                    onClick={() => document.getElementById('my_modal_1').close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            <div>
                <div className="font-mulish border rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-base">
                                <tr>
                                    <th>Lesson Title</th>
                                    <th>Lesson Number</th>
                                    <th>Vocabulary Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map((lesson, index) => (
                                    <LessonsTable key={index}
                                        lesson={lesson}
                                        handleDeleteLesson={handleDeleteLesson}
                                        handleEditLessonTitle={handleEditLessonTitle}
                                        handleEditLessonNumber={handleEditLessonNumber}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default CreateLessons;