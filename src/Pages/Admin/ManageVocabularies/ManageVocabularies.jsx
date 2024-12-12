import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import VocabularyTable from "./VocabularyTable";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const ManageVocabularies = () => {
    const { user, successToast, errorToast } = useContext(AuthContext);
    const [selectedLesson, setSelectedLesson] = useState("");
    const [editVocabulary, setEditVocabulary] = useState(null);

    const editModalRef = useRef(null);

    // Get Vocabularies
    const { data: vocabularies = [], isLoading, refetch } = useQuery({
        queryKey: ["vocabularies"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5000/vocabularies?email=${user.user_email}`,
                { withCredentials: true }
            );
            return response.data;
        },
    });

    // Get Lessons
    const { data: lessons = [] } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5000/lessons?email=${user.user_email}`,
                { withCredentials: true }
            );
            return response.data.lessons;
        },
    });

    // Delete Vocabulary
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
            // console.error("Error deleting the vocabulary:", error);
            errorToast("An error occurred while deleting the vocabulary. Please try again later.");
        }
    };

    // Edit Vocabulary
    const handleEditVocabulary = (vocabulary) => {
        setEditVocabulary(vocabulary);
        if (editModalRef.current) {
            editModalRef.current.showModal();
        }
    };

    // Handle Edit Form
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const updatedVocabulary = {
            vocabulary_word: form.word.value || editVocabulary.vocabulary_word,
            vocabulary_meaning: form.meaning.value || editVocabulary.vocabulary_meaning,
            vocabulary_pronunciation: form.pronunciation.value || editVocabulary.vocabulary_pronunciation,
            vocabulary_whenToSay: form.whenToSay.value || editVocabulary.vocabulary_whenToSay,
            vocabulary_lessonId: form.lessonId.value || editVocabulary.vocabulary_lesson[0],
        };

        try {
            const response = await axios.patch(
                `http://localhost:5000/edit-vocabulary?email=${user.user_email}&id=${editVocabulary._id}`,
                updatedVocabulary,
                { withCredentials: true }
            );

            if (response.status === 200) {
                successToast("Vocabulary updated successfully.");
                refetch();
                setEditVocabulary(null);
                if (editModalRef.current) {
                    editModalRef.current.close();
                }
            } else {
                errorToast("Failed to update the vocabulary. Please try again.");
            }
        } catch (error) {
            // console.error("Error updating vocabulary:", error);
            errorToast("An error occurred while updating the vocabulary.");
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
        const query = lessons.find((lesson) => lesson._id === lessonID);
        if (query) return query.lesson_number;
    };

    return (
        <div>
            <div className="border rounded-lg p-4 font-ubuntu">
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
                                handleEditVocabulary={handleEditVocabulary}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <dialog ref={editModalRef} className="modal">
                {editVocabulary && (
                    <form onSubmit={handleEditSubmit} className="modal-box">
                        <h3 className="font-bold text-lg">Edit Vocabulary</h3>
                        <div className="form-control">
                            <label>Word: </label>
                            <input
                                type="text"
                                name="word"
                                placeholder="Enter new word"
                                defaultValue={editVocabulary.vocabulary_word}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>Meaning</label>
                            <input
                                type="text"
                                name="meaning"
                                placeholder="Enter new meaning"
                                defaultValue={editVocabulary.vocabulary_meaning}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>Pronunciation</label>
                            <input
                                type="text"
                                name="pronunciation"
                                placeholder="Enter new pronunciation"
                                defaultValue={editVocabulary.vocabulary_pronunciation}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>When to Say</label>
                            <input
                                type="text"
                                name="whenToSay"
                                placeholder="Enter new usage"
                                defaultValue={editVocabulary.vocabulary_whenToSay}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>Lesson</label>
                            <select
                                name="lessonId"
                                defaultValue={editVocabulary.vocabulary_lesson[0]}
                                className="input input-bordered"
                            >
                                {lessons.map((lesson) => (
                                    <option value={lesson._id} key={lesson._id}>
                                        Lesson No {lesson.lesson_number}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success border-none text-white text-md">
                                Save Changes
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => {
                                    setEditVocabulary(null);
                                    if (editModalRef.current) {
                                        editModalRef.current.close();
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
    );
};

export default ManageVocabularies;
