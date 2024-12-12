import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import VocabularyTable from "./VocabularyTable";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const ManageVocabularies = () => {
    const { user, updateToast, successToast, errorToast } = useContext(AuthContext);
    const [selectedLesson, setSelectedLesson] = useState("");

    const { data: vocabularies = [], isLoading, refetch } = useQuery({
        queryKey: ["vocabularies"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/vocabularies?email=${user.user_email}`, { withCredentials: true });
            return response.data;
        },
    });

    const { data: lessons = [] } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/lessons?email=${user.user_email}`, { withCredentials: true });
            return response.data.lessons;
        },
    });

    const handleDeleteVocabulary = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to delete this vocabulary?",
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
                `http://localhost:5000/delete-vocabulary?id=${id}&email=${user?.user_email}`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                successToast("Vocabulary deleted successfully.");
                refetch();
            } else {
                errorToast("Failed to delete the vocabulary. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting the vocabulary:", error);
            errorToast("An error occurred while deleting the vocabulary. Please try again later.");
        }
    };



    const filteredVocabularies = useMemo(() => {
        if (!selectedLesson) return vocabularies;
        return vocabularies.filter((vocab) => vocab.vocabulary_lesson[0] === selectedLesson);
    }, [selectedLesson, vocabularies]);



    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    const findLessonNumber = (lessonID) => {
        const query = lessons.find(lesson => lesson._id === lessonID);
        if (query) return query.lesson_number
    }

    return (
        <div>
            <div className="border rounded-lg p-4">
                <div className="mb-4 flex justify-between items-center border-b pb-1">
                    <label className="w-full" htmlFor="lessonFilter">
                        <span>Filter by Lesson: </span>
                        <select
                            id="lessonFilter"
                            className="input input-bordered focus:outline-none w-1/4"
                            onChange={(event) => setSelectedLesson(event.target.value)}
                        >
                            <option value="">All Lessons</option>
                            {lessons.map((lesson) => (
                                <option value={lesson._id} key={lesson._id}>
                                    Lesson No {lesson.lesson_number}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <table className="table">
                    <thead className="text-base">
                        <tr>
                            <th>Word</th>
                            <th>Meaning</th>
                            <th>Pronunciation</th>
                            <th>When to Say</th>
                            <th>Lesson No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVocabularies.map((vocabulary) => (
                            <VocabularyTable
                                key={vocabulary._id}
                                vocabulary={vocabulary}
                                findLessonNumber={findLessonNumber}
                                handleDeleteVocabulary={handleDeleteVocabulary}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ManageVocabularies;
