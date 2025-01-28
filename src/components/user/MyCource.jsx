import { useContext, useEffect, useState } from "react";
import CourcesMain from "./CourcesMain.jsx";
import { CourseContext } from "../../context/CourseProvider.jsx";
import { LoginContext } from "../../context/Context.jsx";


function MyCource() {
    const [currCource, setCurrCource] = useState(null);
    const { courses, setCourses, error } = useContext(CourseContext);
    const { loginData, setLoginData } = useContext(LoginContext);

    // Update currCourses when courses change
    useEffect(() => {
        if (courses?.length > 0 && Array.isArray(loginData?.enrolledCourses)) {
            const filteredCourses = courses.filter((course) =>
                loginData.enrolledCourses.includes(course?._id)
            );
            setCurrCource(filteredCourses); // Set the array of matched courses
        }
    }, [courses, loginData]);
    console.log(loginData?.enrolledCourses);

    return (
        <div className="instructHome">
            <div className="homemain container mx-auto">
                <div className="homeHeader flex items-center mt-3 justify-center mb-4">
                    <p className="text-2xl  font-medium">My Enrolled Courses</p>
                </div>
                <div className="itesHomeBody mb-4 flex flex-col gap-[1rem]">
                    {
                        currCource?.length > 0 ? (
                            currCource
                                // .filter((course) => course?.instructorId?._id === loginData?._id)
                                .map((course) => (
                                    <CourcesMain key={course._id} course={course} />
                                ))
                        ) : (
                            <p>No courses available, Create new</p>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default MyCource;
