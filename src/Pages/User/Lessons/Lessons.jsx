import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import LessonCard from "../../../components/Card/LessonCard";

const Lessons = () => {
    const { user } = useContext(AuthContext);
    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axios.get(`https://japanese-language-app.vercel.app/lessons?email=${user.user_email}`, { withCredentials: true });
            return res.data.lessons;
        },
    })

    if (isLoading) {
        return <div className="max-w-7xl min-h-screen mx-auto flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>


    }
    return <>
        <div>
            <div className="max-w-7xl min-h-screen mx-auto font-ubuntu py-5">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {
                            lessons.map((lesson, index) =>
                                <LessonCard
                                    key={lesson._id}
                                    lesson={lesson}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Lessons;