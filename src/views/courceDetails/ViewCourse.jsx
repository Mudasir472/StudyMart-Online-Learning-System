import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { URI } from "../../../env";

function ViewCourse() {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const { courseId } = useParams();
    useEffect(() => {
        const token = localStorage.getItem("token");

        // Fetch course videos from the backend
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `${URI}/api/courses/${courseId}/videos`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setVideos(response.data.videos);
                    setCurrentVideo(response.data.videos[0]);
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error);
                toast.error(error?.response?.data?.message || "Error in fetching videos");
            }
        };

        fetchVideos();
    }, [courseId]);
    console.log(videos);

    return (
        <div className="flex container mx-auto p-3">
            {
                videos?.length > 0 ? (<>
                    {/* Left Section: Video Player */}
                    <div className="flex  w-[70%]">
                        {currentVideo ? (
                            <video
                                controls
                                className="w-[53rem] h-[37rem] rounded-lg"
                                src={currentVideo.videoPath}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p className="text-center">Select a video to play</p>
                        )}
                    </div>

                    {/* Right Section: Video List */}
                    <div className="p-5 flex flex-col gap-[0.7rem] bg-white border-l w-[30%]">
                        <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                        <ul className="space-y-2 flex flex-col gap-[0.5rem]">
                            {videos && videos.map((video, index) => (
                                <li
                                    key={video._id}
                                    className={`h-[41px] flex items-center justify-content p-3 rounded-lg cursor-pointer ${currentVideo?._id === video._id ? "bg-[#F48C06] text-white" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setCurrentVideo(video)}
                                >
                                    <p><span>{`${index+1}. `}</span>{video.title.split('.')[0]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>) : (<>
                    <h2>Lectures has not been uploaded yet</h2>
                </>)
            }
        </div>
    );
}

export default ViewCourse;
