import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../Providers/AuthProviders";
import axios from "axios";
import LessonsTable from "./LessonsTable";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageLessons = () => {

    const { user, successToast, errorToast } = useContext(AuthContext);

    const { data: lessons = [], refetch } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/lessons?email=${user.user_email}`, { withCredentials: true });
            return res.data.lessons;
        },
    })

    const handleDeleteLesson = async (id) => {
        console.log(id);
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
                `http://localhost:5000/delete-lesson?email=${user.user_email}&id=${id}`, {withCredentials: true});

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
                                        handleDeleteLesson={handleDeleteLesson} />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    </>
}
export default ManageLessons;