import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const CreateVocabularies = () => {

    const { user } = useContext(AuthContext);
    const handleCreateVocabulariesForm = (event) => {
        event.preventDefault();
        const form = event.target;
        form.reset();
    }

    const { data: lessons = [], isPending, isLoading } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/lessons?email=${user.user_email}`, { withCredentials: true })
            return res.data;
        }
    })

    console.log("vocabularies ", lessons);

    return <>
        <div>
            <forms onSubmit={handleCreateVocabulariesForm}>
                <div className="space-y-5">
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="">
                                <h1>Word:</h1>
                                <input type="text" className="input input-bordered w-full focus:outline-none" name="word" placeholder='e.g.,"こんにちは"' />
                            </label>
                            <label className="">
                                <h1>Pronunciation:</h1>
                                <input type="text" className="input input-bordered w-full focus:outline-none" name="pronunciation" placeholder='e.g.,"Konnichiwa"' />
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex-1">
                                <h1>When to Say:</h1>
                                <input type="text" className="input input-bordered w-full focus:outline-none" name="whenToSay" placeholder='e.g.,"Usedfor
 greeting"' />
                            </label>
                            <label className="flex-1">
                                <h1>Lesson No:</h1>
                                <select className="input input-bordered focus:outline-none w-full">
                                    <option disabled selected value="">e.g.,Lesson1</option>
                                    {lessons.map(lesson => <option value={lesson._id} key={lesson._id}>Lesson No {lesson.lesson_number}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-success text-white">Add New Vocabularies</button>
                    </div>
                </div>
            </forms>
        </div>
    </>
}
export default CreateVocabularies;