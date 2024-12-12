import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import ShowVocabulary from "./ShowVocabulary";
import Confetti from "react-confetti";

const LessonDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const itemsPerPage = 1;

    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/lessons?email=${user.user_email}`, { withCredentials: true });
            return response.data.lessons;
        }
    });

    const { data: vocabularies = [] } = useQuery({
        queryKey: ["vocabularies"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/vocabularies?email=${user.user_email}`, { withCredentials: true });
            return response.data;
        }
    });

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

    const selectedVocabularies = vocabularies?.filter(vocabulary => vocabulary.vocabulary_lesson.includes(id));
    const numberOfPages = Math.ceil(selectedVocabularies.length / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const vocabulariesToDisplay = selectedVocabularies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    useEffect(() => {
        refetch();
    }, [currentPage]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleComplete = () => {
        setShowConfetti(true);
        setTimeout(() => {
            navigate("/");
        }, 3000); 
    };

    return (
        <>
            <div>
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                <div className="max-w-7xl mx-auto min-h-screen font-ubuntu">
                    <div className="my-5">
                        <h1 className="text-2xl font-semibold">Lesson Name: {lesson.lesson_title}</h1>
                        <h1 className="text-2xl font-semibold">Lesson No: {lesson.lesson_number}</h1>
                        <h1 className="text-xl">Total Vocabularies: {lesson.lesson_vocabularies.length}</h1>
                    </div>

                    <div>
                        {vocabulariesToDisplay.length > 0 ? (
                            <ul>
                                {vocabulariesToDisplay.map((vocab, index) => (
                                    <ShowVocabulary key={vocab._id} vocab={vocab} index={index} />
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
                                    checked={currentPage === page ? "checked" : undefined}
                                />
                            ))}
                            <button onClick={handleNextPage} type="button" className="btn btn-square">
                                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {currentPage === pages.length - 1 && (
                        <div className="flex justify-center mt-5">
                            <button onClick={handleComplete} className="btn btn-success text-white">
                                Complete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LessonDetails;
