import { useContext, useEffect, useState } from "react";
import Cource from "./Cource";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseContext } from "../../../context/CourseProvider";
import { LoginContext } from "../../../context/Context";
import { URI } from "../../../../env";

function InstructorDashboard() {
    const [addedCource, setAddedCource] = useState(null);
    const [currCource, setCurrCource] = useState(null);
    const { courses, setCourses, error } = useContext(CourseContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        images: null,
    });

    console.log(courses);
    // Update currCourses when courses change
    useEffect(() => {
        if (courses?.length > 0) {
            const filteredCourses = courses.filter(
                (course) => course?.instructorId?._id === loginData?._id
            );
            setCurrCource(filteredCourses);
        }
    }, [courses, loginData]);

    // Handle file changes for images and videos
    const handleImageChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            images: Array.from(e.target.files), // Store image files
        }));
    };

    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        // Create a new FormData instance
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);

        // Append images if they exist
        if (formData.images) {
            formData.images.forEach((image, index) => {
                formDataToSend.append("images", image);
            });
        }

        try {
            const response = await axios.post(
                `${URI}/createcource`,
                formDataToSend, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setAddedCource(response?.data?.newCourse);
            const newCourse = response?.data?.newCourse;
            setCourses((prev) => [newCourse, ...prev]); // Update courses
            // Update currCource directly
            console.log(newCourse?.instructorId);
            console.log(loginData?._id);

            if (newCourse?.instructorId === loginData?._id) {
                setCurrCource((prev) => {
                    const updatedCource = [newCourse, ...(prev || [])];
                    console.log("Updated currCource:", updatedCource); // Logs the updated value
                    return updatedCource;
                });
            }
            toast.success(response.data?.message);
            setIsModalOpen(false);

        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="instructHome">
            <div className="homemain">
                <div className="homeHeader flex items-center justify-between mb-4">
                    <p className="text-2xl font-medium">Courses</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#f48c06] text-white h-[45px] w-[128px] rounded-lg font-medium"
                    >
                        New Course
                    </button>
                </div>
                <div className="itesHomeBody flex flex-col gap-[1rem]">
                    {
                        currCource?.length > 0 ? (
                            currCource
                                // .filter((course) => course?.instructorId?._id === loginData?._id)
                                .map((course) => (
                                    <Cource key={course._id} course={course} />
                                ))
                        ) : (
                            <p>No courses available, Create new</p>
                        )
                    }
                </div>
                {isModalOpen && (
                    <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="modal-box bg-white rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-4">Add your Course</h3>
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                {/* Form Fields */}
                                <div>
                                    <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="textarea w-full textarea-bordered onfocus:border"
                                            placeholder="Title"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="textarea w-full textarea-bordered onfocus:border"
                                            placeholder="Description"
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label htmlFor="images" className="block text-sm/6 font-medium text-gray-900">
                                        Image
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

                                {/* Price and Category */}
                                <div>
                                    <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="textarea w-full textarea-bordered onfocus:border"
                                            placeholder="Price"
                                            name="price"
                                            id="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                                        Category
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="select w-full select-bordered"
                                            name="category"
                                            id="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Select Category</option> {/* Default disabled option */}
                                            <option value="Development">Development</option>
                                            <option value="Design">Design</option>
                                            <option value="CyberSecurity">CyberSecurity</option>
                                            <option value="Blockchain">Blockchain</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    {loading ? (
                                        <button
                                            type="button"
                                            className="w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-gray-300 text-gray-700"
                                            disabled
                                        >
                                            Creating...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[#F48C06] text-white"
                                        >
                                            Create Course
                                        </button>
                                    )}
                                </div>
                            </form>
                            <button
                                onClick={() => setIsModalOpen(false)} // Close modal
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InstructorDashboard;
