import React from 'react';

const videoData = [
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Introduction to Japanese" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Japanese Alphabets - Hiragana" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Japanese Alphabets - Katakana" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Basic Japanese Grammar" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Japanese Greetings and Phrases" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Counting in Japanese" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Days and Months in Japanese" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Japanese Sentence Structure" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Japanese Verbs and Tenses" },
    { url: "https://www.youtube.com/embed/gkVfTjkfV-c?si=acnpXBKnD6Bf-BCm", title: "Practical Conversations in Japanese" },
];

const Tutorials = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Learn Japanese Language</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoData.map((video, index) => (
                    <div key={index} className="border rounded overflow-hidden">
                        <iframe
                            src={video.url}
                            title={video.title}
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
    );
};

export default Tutorials;
