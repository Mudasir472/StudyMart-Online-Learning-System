import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../../context/CourseProvider";
import { deleteCourse } from "../../../Services/CourceServices.js";
function Cource({ course }) {
    const { courses, setCourses } = useContext(CourseContext);
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = async (courceId) => {
        const token = localStorage.getItem("token");
        await deleteCourse(courceId, token, setCourses, setIsModalOpen);
    };

    // Calculate ratings distribution
    useEffect(() => {
        const counts = [0, 0, 0, 0, 0];
        course?.reviews?.forEach((review) => {
            counts[review.rating - 1] += 1; // Assuming `review.rating` is 1-5
        });

        // Convert counts to percentages
        const total = course?.reviews?.length || 1; // Avoid division by zero
        const percentages = counts.map((count) => (count / total) * 100);
        setRatings(percentages);
    }, [course?.reviews]);
    return (<>
        <div className="cource bg-white rounded-lg p-[13px]">
            <div className="courceMain flex items-center gap-[3rem]">
                <div className="courceImgg">
                    <img className="h-[144px] w-[166px] rounded-lg" src={course?.images[0]?.url} alt="" />
                </div>
                <div className="courceBdy  w-[44%] gap-[0.7rem] flex flex-col">
                    <div className="tags flex gap-[1rem] items-center">
                        <span class="inline-flex items-center rounded-md bg-[#F48C06] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-yellow-600/20">{course?.price === 0 ? ("Free") : ("Paid")}</span>
                        <span class="inline-flex items-center rounded-md bg-[#65DAFF] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-yellow-600/20">Public</span>
                    </div>
                    <p className="font-medium text-xl">{course?.title}</p>
                </div>
                <div className="courceEarning gap-[1rem] flex items-center">
                    <div className="earned bg-[#fff2e1] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>Earned</p>
                        <h2 className="font-medium">
                            {course.price === 0 ? (
                                <span>Free</span>
                            ) : (
                                <h2>{`$${(course?.price * course?.enrolled?.length).toFixed(2)}`}</h2>
                            )}
                        </h2>
                    </div>
                    <div className="enroll bg-[#bcbfff] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>Enrollments</p>
                        <h2>{course?.enrolled?.length}</h2>
                    </div>
                    <div className="ratings bg-[#98e6ff] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>rating</p>
                        <h2>{(ratings.reduce((sum, rating, index) => sum + (rating / 100) * (index + 1), 0)).toFixed(1)}</h2>
                    </div>
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl text-[#FF0000] cursor-pointer" onClick={() => setIsModalOpen(true)}><i class="bi bi-trash3"></i></span>
                        <Link to={`cource-update/${course?._id}`}>
                            <span className="text-xl text-[#007BFF] cursor-pointer"><i class="bi bi-pencil-square"></i></span>
                        </Link>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="modal-box bg-white rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-4">Are you sure to delete this Cource</h3>
                            <button
                                type="submit"
                                className="w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[#F48C06] text-white"
                                onClick={() => { handleDelete(course?._id) }}
                            >
                                Parmanently Delete
                            </button>
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
    </>);
}

export default Cource;