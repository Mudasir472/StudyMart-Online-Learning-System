import Cource from "./Cource";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CourseContext } from "../../context/CourseProvider";




function AllCources() {
    // Get cource from the context
    const { courses, loading, error } = useContext(CourseContext);

    return (<>
        <div className="cources">
            <div className="courcesMain container mx-auto">
                <div className="heading flex flex-col items-center justify-center mx-auto w-[55%] text-center">
                    <h2 className="mb-3 font-medium text-2xl"><span className="voilet">Featured</span> <span className="orange">Cources</span></h2>
                    <p className="mb-3">Learning often happens in classrooms but it doesn’t have to. Use Eduflow to facilitate learning experiences no matter the context</p>
                </div>
                <div className="allCources mb-[4rem]">
                    <h2 className="mb-3 font-medium">Get choice of your course</h2>
                    <div className="flex items-center  flex-wrap gap-[1rem]">
                        {
                            loading ? (<>
                                <div className="flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>

                            </>) : (<>
                                {courses.slice(0,4).map((course, index) => (
                                    <Link className="w-[24%]" to={`/allcources/${course._id}`}>
                                        <Cource
                                            key={index}
                                            img={course?.images?.[0]?.url || ""}
                                            title={course.title}
                                            description={course.description}
                                            duration={course.duration}
                                            instructor={course.instructorId?.fullname}
                                            instructorLogo={course?.instructorId?.image?.url}
                                            type={course.category}
                                            price={course?.price === 0 ? 'Free' : `$${course?.price}`}
                                        />
                                    </Link>
                                ))}
                            </>)
                        }
                        {
                            error ? (<><h2>An error occured while fetching the cource data</h2></>) : (<>{""}</>)
                        }

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AllCources;