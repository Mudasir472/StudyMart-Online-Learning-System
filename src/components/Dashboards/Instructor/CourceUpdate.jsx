import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseContext } from "../../../context/CourseProvider";
import { useParams } from "react-router-dom";
import { URI } from "../../../../env";

function CourceUpdate() {
    const { courseId } = useParams();
    const [showPhotos, setShowPhotos] = useState(false);
    const [currCource, setCurrCource] = useState(null);
    const { courses, setCourses, error } = useContext(CourseContext);
    const [loading, setLoading] = useState(false);
    console.log(currCource);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
        videos: [],
    })
    useEffect(() => {
        if (currCource) {

            setFormData({
                title: currCource?.title,
                description: currCource?.description,
                price: currCource?.price,
                category: currCource?.category,
                images: currCource?.images || [],
                videos: currCource?.videos || [],
            });
        }
    }, [currCource]);
    useEffect(() => {
        const foundCourse = courses?.find((item) => item?._id === courseId);
        setCurrCource(foundCourse);
    }, [courses, courseId]);

    // Handle file changes for images and videos
    const handleImageChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            images: Array.from(e.target.files), // Store image files
        }));
    };

    const handleVideoChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            videos: Array.from(e.target.files), // Store video files
        }));
    };

    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };
    const handleRemoveVideo = async (videoId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:5000/removeVideo/${courseId}/${videoId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Update the local state to reflect the removal
            setCurrCource((prev) => ({
                ...prev,
                videos: prev.videos.filter((video) => video._id !== videoId),
            }));

            toast.success(response.data.message || "Video removed successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Failed to remove video.");
        }
    };
    const handleRemoveImage = async (imageId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `${URI}/removeImage/${courseId}/${imageId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Update the local state to reflect the removal
            setCurrCource((prev) => ({
                ...prev,
                images: prev.images.filter((image) => image._id !== imageId),
            }));

            toast.success(response.data.message || "Image removed successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Failed to remove image.");
        }
    };



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const token = localStorage.getItem("token");
        // Create a new FormData instance
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);

        // Append images if they exist
        if (formData?.images) {
            formData?.images?.forEach((image, index) => {
                formDataToSend.append("images", image);
            });
        }


        if (formData?.videos) {
            formData?.videos?.forEach((video, index) => {
                formDataToSend.append("videos", video);
            });
        }


        try {
            const response = await axios.put(
                `${URI}/updateCource/${courseId}`,
                formDataToSend, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            setCourses((prev) =>
                prev.map((course) =>
                    course?._id === courseId ? response?.data?.updatedCource : course
                )
            );
            toast.success(response.data?.message);
            console.log(formDataToSend);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false)
        }
    };
    console.log(formData);
    return (<>
        <div className="courceupdate">
            <div className="updateMain">
                <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                    <div className="flex flex-col  h-[89%] w-full  rounded-lg ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-[4rem]" encType="multipart/form-data">
                            <div className="flex gap-[3rem]">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 w-[64%] gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                id="title"
                                                name="title"
                                                type="text"
                                                autoComplete="title"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                id="description"
                                                name="description"
                                                type="text"
                                                autoComplete="description"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                id="price"
                                                name="price"
                                                type="text"
                                                autoComplete="price"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                id="category"
                                                name="category"
                                                type="text"
                                                autoComplete="category"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="images" className="block text-sm/6 font-medium text-gray-900">
                                            Upload Images
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                multiple
                                                type="file"
                                                className="textarea w-full"
                                                id="images"
                                                name="images"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="videos" className="block text-sm/6 font-medium text-gray-900">
                                            Upload Videos
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                multiple
                                                type="file"
                                                className="textarea w-full"
                                                id="videos"
                                                name="videos"
                                                accept="video/*"
                                                onChange={handleVideoChange}
                                            />
                                        </div>
                                    </div>


                                </div>
                                {/* Existing videos */}
                                <div className="mt-10 sm:col-span-6 w-[30%]">
                                    <div className=" bg-[#fff2e1] p-[30px] rounded-lg">
                                        <label className="block mb-3 text-sm font-medium text-gray-900">
                                            Existing Video Lectures
                                        </label>
                                        <ul className="mt-2 space-y-2">
                                            {currCource?.videos && currCource?.videos?.length > 0 ? (
                                                currCource?.videos.map((video,index) => (
                                                    <li
                                                        key={video?._id}
                                                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                                                    >
                                                        <span className="text-sm text-gray-800">{`${index + 1}. `}{video?.title}</span>
                                                        <div className="flex items-center gap-2">
                                                            <i onClick={() => handleRemoveVideo(video?._id)} class="bi bi-trash3 text-red-500 text-xl cursor-pointer"></i>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No videos available.</p>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-[2rem]">
                                    {/* Existing photos */}
                                    <label className="block text-sm font-medium text-gray-900">
                                        Existing Images
                                    </label> {showPhotos ? (
                                        <i onClick={() => { setShowPhotos(false) }} class="bi bi-eye-slash-fill text-2xl cursor-pointer text-[#6c757d] hover:text-[#495057]"></i>

                                    ) : (
                                        <i onClick={() => { setShowPhotos(true) }} class="bi bi-eye-fill text-2xl cursor-pointer text-[#6c757d] hover:text-[#495057]"></i>

                                    )}
                                </div>
                                {
                                    showPhotos ? (<><div className="sm:col-span-6 w-[100%]">

                                        <ul className="mt-2 space-y-2 flex items-center gap-[1rem] flex-wrap">
                                            {currCource?.images && currCource?.images?.length > 0 ? (
                                                currCource?.images.map((image, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center justify-between  p-2 rounded"
                                                    >
                                                        <img
                                                            src={image?.url} // Ensure the image object has a `url` property
                                                            alt={`Course Image ${index + 1}`}
                                                            className="w-20 h-20 object-cover rounded h-[125px] w-[125px] "
                                                        />
                                                        <i onClick={() => handleRemoveImage(image?._id)} class="bi bi-x-lg text-xl cursor-pointer relative top-[-50px] right-[24px]" ></i>

                                                        {/* <div className="flex items-center gap-2">
                                                    </div> */}
                                                    </li>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No images available.</p>
                                            )}
                                        </ul>
                                    </div></>) : (<>

                                        <span className="text-[#6b7280]">click the icon to show uploaded images</span>
                                    </>)
                                }
                            </div>

                            <div className="flex items-center justify-center">
                                {loading ? (
                                    <button
                                        type="button"
                                        className=" w-[18%] justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-gray-300 text-gray-700"
                                        disabled
                                    >
                                        <div className="flex items-center justify-center">Updating<span className="loading loading-dots loading-md"></span></div>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-[18%] justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[#F48C06] text-white"
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default CourceUpdate;