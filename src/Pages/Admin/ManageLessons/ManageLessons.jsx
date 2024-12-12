import { useContext, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Providers/AuthProviders";
import axios from "axios";
import LessonsTable from "./LessonsTable";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageLessons = () => {

    const { user, successToast, errorToast } = useContext(AuthContext);
    const [editLesson, setEditLesson] = useState(null);

    const editLessonModalRef = useRef(null);


    // Get Lessons
    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axios.get(`https://japanese-language-app.vercel.app/lessons?email=${user.user_email}`, { withCredentials: true });
            return res.data.lessons;
        },
    })


    // Delete Lesson
    const handleDeleteLesson = async (id) => {
        try {

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to delete this lesson?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });
            if (!result.isConfirmed) return;
            await Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
            const response = await axios.delete(
                `https://japanese-language-app.vercel.app/delete-lesson?email=${user.user_email}&id=${id}`, { withCredentials: true });

            if (response.status === 200) {
                successToast("Vocabulary deleted successfully.");
                refetch();
            } else {
                throw new Error(response.data?.message || "Failed to delete the lesson.");
            }
        } catch (error) {
            console.error("Error deleting the vocabulary:", error);
            errorToast("Failed to delete the vocabulary. Please try again.");
        }
    };

    // Edit Lesson
    const handleEditLesson = (lesson) => {
        setEditLesson(lesson);
        if (editLessonModalRef.current) {
            editLessonModalRef.current.showModal();
        }
    }

    // Handle Edit Form
    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const updateLesson = {
            lesson_title: form.title.value || editLesson.lesson_title,
            lesson_number: form.number.value || editLesson.lesson_number,
        }

        try {
            const response = await axios.patch(`
                https://japanese-language-app.vercel.app/edit-lesson?email=${user.user_email}&id=${editLesson._id}`, updateLesson, {
                withCredentials: true
            });
            if (response.status === 200) {
                successToast("Lesson Updated Successfully");
                refetch();
                setEditLesson(null);
                if (editLessonModalRef.current) {
                    editLessonModalRef.current.close();
                }
            } else {
                errorToast("Failed to update the Lesson. Please try again.");
            }
        } catch (error) {
            console.error("Error updating Lesson:", error);
            errorToast("An error occurred while updating the Lesson.");
        }

    }

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return <>
        <div>
            <div>
                <div className="space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold">Manage Lessons</h1>
                    </div>
                    <div>
                        <table className="table">
                            <thead className="text-base">
                                <tr>
                                    <th>Lesson Title</th>
                                    <th>Lesson Number</th>
                                    <th>Vocabulary Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lessons.map(lesson =>
                                        <LessonsTable key={lesson._id} lesson={lesson}
                                            handleDeleteLesson={handleDeleteLesson}
                                            handleEditLesson={handleEditLesson}
                                        />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <dialog ref={editLessonModalRef} className="modal">
                {
                    editLesson && (
                        <form onSubmit={handleEditFormSubmit} className="modal-box">
                            <h3 className="font-bold text-lg">Edit Lesson</h3>
                            <div className="form-control">
                                <label>Lesson Name: </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g.,'BasicGreetings'"
                                    defaultValue={editLesson.lesson_title}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="">Lesson Number:</label>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="(e.g.,1,2,3)"
                                    defaultValue={editLesson.lesson_number}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success border-none text-white text-md">
                                    Save Changes
                                </button>
                                <button type="button"
                                    onClick={() => {
                                        setEditLesson(null);
                                        if (editLessonModalRef.current) {
                                            editLessonModalRef.current.close();
                                        }
                                    }}
                                    className="btn bg-blue-600 border-none text-white text-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
            </dialog>
            <ToastContainer />
        </div>
    </>
}
export default ManageLessons;