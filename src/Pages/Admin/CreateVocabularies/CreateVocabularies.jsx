import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const CreateVocabularies = () => {
    const { user, successToast, errorToast } = useContext(AuthContext);
    const [selectedLesson, setSelectedLesson] = useState("");

    const handleCreateVocabulariesForm = async (event) => {
        event.preventDefault();

        try {
            const form = event.target;
            const vocabulary_word = form.word.value;
            const vocabulary_pronunciation = form.pronunciation.value;
            const vocabulary_whenToSay = form.whenToSay.value;
            const vocabulary_meaning = form.meaning.value;
            const vocabulary_lessonId = selectedLesson;

            const response = await axios.post(
                `https://japanese-language-app.vercel.app/create-vocabulary?email=${user.user_email}`,
                {
                    vocabulary_word,
                    vocabulary_pronunciation,
                    vocabulary_meaning,
                    vocabulary_whenToSay,
                    vocabulary_lessonId,
                },
                { withCredentials: true }
            );
            successToast("Vocabulary added successfully.");
            form.reset();
            setSelectedLesson("");
        } catch (error) {
            console.error("Error creating vocabulary:", error);
            errorToast("Failed to add vocabulary. Please try again.");
        }
    };


    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const res = await axios.get(`https://japanese-language-app.vercel.app/lessons?email=${user.user_email}`, { withCredentials: true });
            return res.data.lessons;
        },
    });

    if (isLoading) {
        return <div>Loading lessons...</div>;
    }

    return (
        <div>
            <div>
                <div className="space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold">Add New Vocabulary</h1>
                    </div>
                    <form onSubmit={handleCreateVocabulariesForm}>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <label>
                                        <h1 className="font-semibold">Word:</h1>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full focus:outline-none"
                                            name="word"
                                            placeholder='e.g., "こんにちは"'
                                            required
                                        />
                                    </label>
                                    <label>
                                        <h1 className="font-semibold">Pronunciation:</h1>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full focus:outline-none"
                                            name="pronunciation"
                                            placeholder='e.g., "Konnichiwa"'
                                            required
                                        />
                                    </label>
                                    <label>
                                        <h1 className="font-semibold">Meaning:</h1>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full focus:outline-none"
                                            name="meaning"
                                            placeholder='e.g., "Hello"'
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <label className="flex-1">
                                        <h1 className="font-semibold">When to Say:</h1>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full focus:outline-none"
                                            name="whenToSay"
                                            placeholder='e.g., "Used for greeting"'
                                            required
                                        />
                                    </label>
                                    <label className="flex-1">
                                        <h1 className="font-semibold">Lesson No:</h1>
                                        <select
                                            className="input input-bordered focus:outline-none w-full"
                                            value={selectedLesson}
                                            onChange={(event) => setSelectedLesson(event.target.value)}
                                            required
                                        >
                                            <option disabled value="">
                                                e.g., Lesson1
                                            </option>
                                            {lessons.map((lesson) => (
                                                <option value={lesson._id} key={lesson._id}>
                                                    Lesson No {lesson.lesson_number}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <input
                                    type="submit"
                                    value="Add New Vocabularies"
                                    className="btn btn-success text-base text-white"
                                />
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateVocabularies;
