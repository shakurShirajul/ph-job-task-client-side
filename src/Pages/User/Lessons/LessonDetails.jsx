import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const LessonDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 1;

    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/lessons?email=${user.user_email}`, { withCredentials: true })
            return response.data.lessons;
        }
    })

    const { data: vocabularies = [] } = useQuery({
        queryKey: ["vocabularies"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/vocabularies?email=${user.user_email}`, { withCredentials: true })
            return response.data;
        }
    })

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    const lesson = lessons?.find(lesson => lesson._id === id);

    if (!lesson) {
        return <div>Lesson not found!</div>;
    }

    // Filter vocabularies related to this lesson
    const selectedVocabularies = vocabularies?.filter(vocabulary => vocabulary.vocabulary_lesson.includes(id));

    // Calculate the total number of pages
    const numberOfPages = Math.ceil(selectedVocabularies.length / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    // Slice the vocabularies array to display only the items for the current page
    const vocabulariesToDisplay = selectedVocabularies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    useEffect(() => {
        refetch();
    }, [currentPage]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div>
                <div className="max-w-7xl mx-auto min-h-screen font-ubuntu">
                    <div className="my-5">
                        <div>
                            <h1 className="text-2xl font-semibold">Lesson Name: {lesson.lesson_title}</h1>
                            <h1 className="text-2xl font-semibold">Lesson No: {lesson.lesson_number}</h1>
                            <h1 className="text-xl">Total Vocabularies: {lesson.lesson_vocabularies.length}</h1>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Vocabularies:</h2>
                        {vocabulariesToDisplay.length > 0 ? (
                            <ul>
                                {vocabulariesToDisplay.map((vocab, index) => (
                                    
                                    <li key={index}>{vocab.vocabulary_word}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No vocabularies found for this lesson.</p>
                        )}
                    </div>

                    <div className="flex justify-center mt-10">
                        <div className="flex justify-center space-x-1 dark:text-gray-800">
                            <button onClick={handlePrevPage} type="button" className="btn btn-square">
                                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            {pages.map(page => (
                                <input
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className="join-item btn btn-square"
                                    type="radio"
                                    name="options"
                                    aria-label={page}
                                    checked={currentPage === page ? 'checked' : undefined}
                                />
                            ))}
                            <button onClick={handleNextPage} type="button" className="btn btn-square">
                                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonDetails;
