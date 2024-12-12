const VocabularyTable = ({ vocabulary, findLessonNumber, handleDeleteVocabulary, handleEditVocabulary }) => {
    return (
        <tr className="font-mulish">
            <td>
                <h1>{vocabulary.vocabulary_word}</h1>
            </td>
            <td>
                <h1>{vocabulary.vocabulary_meaning}</h1>
            </td>
            <td>
                <h1>{vocabulary.vocabulary_pronunciation}</h1>
            </td>
            <td>
                <h1>{vocabulary.vocabulary_whenToSay}</h1>
            </td>
            <td>
                <h1>{findLessonNumber(vocabulary.vocabulary_lesson[0])}</h1>
            </td>
            <td>
                <div className="flex justify-start items-center gap-2">
                    <button className="btn btn-primary border-none text-white" onClick={() => handleEditVocabulary(vocabulary)}>Edit</button>
                    <button className="btn bg-red-600 border-none text-white" onClick={() => handleDeleteVocabulary(vocabulary._id)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}
export default VocabularyTable;