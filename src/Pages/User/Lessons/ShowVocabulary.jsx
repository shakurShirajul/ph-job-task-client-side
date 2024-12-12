import { GiSpeaker } from "react-icons/gi";
const ShowVocabulary = ({ vocab, index }) => {
    function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ja-JP'; // Japanese
        window.speechSynthesis.speak(utterance);
    }
    return <>
        <div>
            <div className="border rounded-xl p-5">
                <div className="space-y-5">
                    <h1 className="text-xl font-semibold">Vocabulary No: {index + 1}</h1>
                    <div className="grid grid-cols-3 text-base">
                        <h1 className="flex items-center gap-2"><span className="font-semibold">Word: </span> {vocab.vocabulary_word} <span><GiSpeaker className="text-4xl cursor-pointer" onClick={() => { pronounceWord(vocab.vocabulary_word) }} /></span></h1>
                        <h1><span className="font-semibold">Pronunciation: </span> {vocab.vocabulary_pronunciation}</h1>
                        <h1><span className="font-semibold">When to Say: </span> {vocab.vocabulary_whenToSay}</h1>
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default ShowVocabulary;