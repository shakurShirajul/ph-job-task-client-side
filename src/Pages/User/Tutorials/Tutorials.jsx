import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';

const Tutorials = () => {
    const { user } = useContext(AuthContext);
    const { data: tutorialsData = [], isLoading } = useQuery({
        queryKey: ['tutorialsData'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/tutorials?email=${user.user_email}`, { withCredentials: true })
            return response.data;
        }
    })
    console.log("---------------", tutorialsData);
    return (
        <div className="my-5">
            <div className='max-w-7xl mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tutorialsData.map((video, index) => (
                        <div key={index} className="border rounded overflow-hidden">
                            <iframe
                                src={video.tutorial_link}
                                title={video.tutorial_title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-64"
                            />
                            <div className="p-2 bg-gray-100">
                                <h2 className="text-lg font-medium">{video.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
