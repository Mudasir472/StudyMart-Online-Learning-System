import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CourseContext } from "../../context/CourseProvider.jsx";
function CourcesMain({ course }) {
    const { courses, setCourses } = useContext(CourseContext);
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
    const [isModalOpen, setIsModalOpen] = useState(false);


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
        <div className="cource border-[2px] rounded-lg p-[13px]">
            <div className="courceMain flex items-center gap-[3rem]">
                <div className="courceImgg">
                    <img className="h-[144px] w-[166px] rounded-lg" src={course?.images[0]?.url} alt="" />
                </div>
                <div className="courceBdy  w-[44%] gap-[0.7rem] flex flex-col">
                    <div className="tags flex gap-[1rem] items-center">
                        <span class="inline-flex items-center rounded-md bg-[#F48C06] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-yellow-600/20">{course?.price === 0 ? ("Free") : ("Paid")}</span>
                    </div>
                    <Link to={`/allCources/${course?._id}`}>
                        <p className="font-medium text-xl hover:text-[#646464]">{course?.title}</p>
                    </Link>
                </div>
                <div className="courceEarning gap-[1rem] flex items-center">
                    <div className="earned bg-[#fff2e1] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>Price</p>
                        <h2 className="font-medium">
                            {course.price === 0 ? (
                                <span>Free</span>
                            ) : (
                                <h2>{course?.price}</h2>
                            )}
                        </h2>
                    </div>
                    <div className="enroll bg-[#bcbfff] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>Lectures</p>
                        <h2>{course?.videos?.length}</h2>
                    </div>
                    <div className="ratings bg-[#98e6ff] h-[78px] w-[120px] flex flex-col items-center justify-center rounded-lg">
                        <p>rating</p>
                        <h2>{(ratings.reduce((sum, rating, index) => sum + (rating / 100) * (index + 1), 0)).toFixed(1)}</h2>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default CourcesMain;