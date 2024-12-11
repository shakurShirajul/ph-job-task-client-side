const LessonsTable = ({ lesson, handleDeleteLesson }) => {
    console.log(lesson);
    return (
        <>
            <tr className="font-mulish">
                <td>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="font-bold">{lesson.lesson_title}</h1>
                        </div>
                    </div>
                </td>

                <td>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="font-bold">{lesson.lesson_number}</h1>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <div className="font-bold">{lesson.lesson_vocabularies.length}</div>
                    </div>
                </td>
                <td>
                    <div>
                        <button className="btn btn-primary text-white">Edit</button>
                    </div>
                </td>
                <td>
                    <div>
                        <button onClick={() => handleDeleteLesson(lesson._id)} className="btn btn-error text-white">Delete</button>
                    </div>
                </td>
            </tr>
        </>
    )
}
export default LessonsTable;