import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoginContext } from "../../context/Context";
import { CourseContext } from "../../context/CourseProvider";
import { Link, useNavigate } from 'react-router-dom'
import { URI } from "../../../env";

function RightPart({ courseId }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [isEnrolling, setIsEnrolling] = useState(false);
    const { loginData, setLoginData } = useContext(LoginContext);
    const { courses, setCourses, loading, error } = useContext(CourseContext);
    const [enrolled, setEnrolled] = useState(false);
    const [cource, setCourse] = useState([]);

    const [formData, setFormData] = useState({
        paymentMethod: "",
        amount: cource?.price
    });
const navigate = useNavigate()
    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        const foundCourse = courses.find((item) => item._id === courseId);
        setCourse(foundCourse);
    }, [courses, courseId]);
    useEffect(() => {
        if (loginData?.enrolledCourses) {
            setEnrolled(loginData.enrolledCourses.includes(courseId));
        }
    }, [loginData, courseId]);

    const handleEnroll = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (isEnrolling) return; // Prevent duplicate calls
        setIsEnrolling(true);
        try {
            const response = await axios.post(`${URI}/api/enroll`, { courseId, formData }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            if (response.status === 200) {
                toast.success("Successfully enrolled in the course!");
                // Update context and local state
                setCourses((prevCourses) =>
                    prevCourses.map((course) =>
                        course._id === courseId
                            ? {
                                ...course,
                                enrolled: Array.isArray(course.enrolled)
                                    ? [...course.enrolled, loginData?._id] // Append user ID to the array
                                    : [loginData?._id], // Initialize as an array with the user ID
                            }
                            : course
                    )
                );
                setEnrolled(true); // Update local state
                // Update the loginData's enrolledCourses
                setLoginData((prev) => ({
                    ...prev,
                    enrolledCourses: Array.isArray(prev.enrolledCourses)
                        ? [...prev.enrolledCourses, courseId] // Append the courseId
                        : [courseId], // Initialize as an array with the courseId
                }));
            } else {
                toast.error("Failed to enroll in the course.");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.response?.data?.error || "Error");
            if (error.response.status === 401) {
                navigate('/login')
            }
        }
        finally {
            setIsEnrolling(false);
            setIsModalOpen(false)
        }
    };
    return (<>
        <div className="right-part">
            <div>
                <div className="flex flex-col gap-[2rem] enroll border p-[34px] mt-[201px] rounded-lg">
                    {
                        enrolled ? (<>
                            <div className="enrolled flex flex-col gap-[2rem]">
                                <h2>Welcome!</h2>
                                <p>You have Enrolled In this cource</p>
                                <Link to={`/view-cource/${courseId}`}>
                                    <button className="bg-[#F48C06] h-[52px] w-[145px] text-white font-medium text-lg rounded-lg ">Visit Cource</button>
                                </Link>
                            </div>
                        </>) : (<><div className="top flex flex-col gap-[1rem]">
                            <p className="font-medium text-lg">{cource?.price === 0 ? "Free" : `$${cource?.price}`}</p>
                            <div className="flex items-center justify-center ">
                                <button onClick={cource?.price === 0 ? handleEnroll : () => setIsModalOpen(true)} className="w-[70%] h-[43px] bg-[#F48C06] text-white font-medium rounded-lg">Enroll Now</button>
                            </div>
                            <p className="text-center">Free access this cource</p>
                        </div>
                            <hr />
                            <div className="below flex flex-col gap-[1rem]">
                                <p><span className="me-3"><i class="bi bi-bar-chart"></i></span><span>Beginner</span></p>
                                <p><span className="me-3"><i className="bi bi-mortarboard"></i></span><span>{cource?.enrolled?.length === 0 ? "0" : Array.isArray(cource?.enrolled) && cource?.enrolled?.length} Total Enrolled</span></p>
                                <p><span className="me-3"><i class="bi bi-alarm"></i></span><span>15 hours 20 minutes Duration</span></p>
                                <p><span className="me-3"><i class="bi bi-arrow-clockwise"></i></span><span>Jan 10,2024 Last Updated</span></p>
                            </div></>)
                    }
                    {isModalOpen && (
                        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="modal-box bg-white rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4">Payment</h3>
                                <form onSubmit={handleEnroll} className="space-y-6">
                                    <div>
                                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-900">
                                            Payment Method
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="paymentMethod"
                                                name="paymentMethod"
                                                required
                                                value={formData.paymentMethod} // Bind to state
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled selected>
                                                    Select Method
                                                </option>
                                                <option value="card">Card</option>
                                                <option value="paypal">Paypal</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                                            Amount
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                disabled
                                                value={cource?.price} // Bind to state
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter Amount"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[#F48C06] text-white"
                                            disabled={isEnrolling}
                                        >
                                            Pay
                                        </button>
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
        </div>
    </>);
}

export default RightPart;