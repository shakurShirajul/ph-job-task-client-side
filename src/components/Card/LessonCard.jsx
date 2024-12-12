import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
    return (
        <div>
            <div>
                <div className=" mx-auto max-w-xs p-6  rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900 border">
                    <div className="space-y-5">
                        <div className="space-y-5">
                            <div>
                                <h1 className="text-2xl font-medium">
                                    {lesson.lesson_title}
                                </h1>
                            </div>
                            <div>
                                <div>
                                    <h1>Lessons No:  {lesson.lesson_number}</h1>
                                </div>
                                <div>
                                    <h1>Vocabulary Count: {lesson.lesson_vocabularies.length}</h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to={`/lesson-details/${lesson._id}`}><button className="btn btn-info font-medium text-lg text-white w-full">Study Lesson</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LessonCard;