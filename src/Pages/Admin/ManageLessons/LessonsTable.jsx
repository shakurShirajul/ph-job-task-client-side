// import { useContext } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { AuthContext } from "../../../Providers/AuthProviders";
// import axios from "axios";
// const LessonsTable = ({ lesson, handleDeleteLesson, handleEditLessonTitle, handleEditLessonNumber }) => {
//     const handleEditNumber = async (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const lesson_number = form.number.value;
//         handleEditLessonNumber(lesson_number, lesson._id);
//         form.reset();
//         document.getElementById(`edit-title-modal-${lesson._id}`).close()
//     };

//     const handleEditTitle = async (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const lesson_title = form.title.value;
//         handleEditLessonTitle(lesson_title, lesson._id);
//         form.reset();
//         document.getElementById(`edit-title-modal-${lesson._id}`).close()
//     };

//     return (
//         <>
//             <tr className="font-mulish">
//                 <td>
//                     <div className="flex items-center gap-3">
//                         <div className="flex justify-center items-center gap-2">
//                             <h1 className="font-bold">{lesson.lesson_title}</h1>
//                             <button onClick={() => document.getElementById(`edit-title-modal-${lesson._id}`).showModal()}>
//                                 <FaRegEdit />
//                             </button>
//                             <dialog id={`edit-title-modal-${lesson._id}`} className="modal">
//                                 <div className="modal-box">
//                                     <form onSubmit={handleEditTitle}>
//                                         <label htmlFor="title" className="space-y-2">
//                                             <div className="font-bold">Edit Lesson Title:</div>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     name="title"
//                                                     placeholder="Greetings"
//                                                     className="input input-bordered focus:outline-none w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                         </label>
//                                         <div className="modal-action">
//                                             <button className="btn btn-success text-white" type="submit">
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="btn"
//                                                 onClick={() => document.getElementById(`edit-title-modal-${lesson._id}`).close()}
//                                             >
//                                                 Close
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </dialog>
//                         </div>
//                     </div>
//                 </td>
//                 <td>
//                     <div className="flex items-center gap-3">
//                         <div className="flex justify-center items-center gap-2">
//                             <h1 className="font-bold">{lesson.lesson_number}</h1>
//                             <button onClick={() => document.getElementById(`edit-number-modal-${lesson._id}`).showModal()}>
//                                 <FaRegEdit />
//                             </button>
//                             <dialog id={`edit-number-modal-${lesson._id}`} className="modal">
//                                 <div className="modal-box">
//                                     <form onSubmit={handleEditNumber}>
//                                         <label htmlFor="title" className="space-y-2">
//                                             <div className="font-bold">Edit Lesson Number:</div>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     name="number"
//                                                     placeholder="Lesson Number Must Be Unique"
//                                                     className="input input-bordered focus:outline-none w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                         </label>
//                                         <div className="modal-action">
//                                             <button className="btn btn-success text-white" type="submit">
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="btn"
//                                                 onClick={() => document.getElementById(`edit-number-modal-${lesson._id}`).close()}
//                                             >
//                                                 Close
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </dialog>
//                         </div>
//                     </div>
//                 </td>
//                 <td>
//                     <div>
//                         <div className="font-bold">{lesson.lesson_vocabularies.length}</div>
//                     </div>
//                 </td>
//                 <td>
//                     <div>
//                         <button
//                             onClick={() => handleDeleteLesson(lesson._id)}
//                             className="btn btn-error text-white"
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </td>
//                 <td>
//                     <div>
//                         <h1>{lesson._id}</h1>
//                     </div>
//                 </td>
//             </tr>
//         </>
//     );
// };

// export default LessonsTable;
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