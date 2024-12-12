const LessonsTable = ({ lesson, handleDeleteLesson, handleEditLesson }) => {
    console.log("Here Gto", lesson);
    return <>
        <tr className="font-mulish">
            <td>{lesson.lesson_title}</td>
            <td>{lesson.lesson_number}</td>
            <td>{lesson.lesson_vocabularies.length}</td>
            <td>
                <div className="space-x-2">
                    <button className="btn btn-primary border-none text-white" onClick={() => handleEditLesson(lesson)}>Edit</button>
                    <button className="btn bg-red-600 border-none text-white" onClick={() => { handleDeleteLesson(lesson._id) }}>Delete</button>
                </div>
            </td>
        </tr>
    </>
}
export default LessonsTable;