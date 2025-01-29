
import Cource from "./Cource";
import { useEffect, useState } from "react";
import axios from 'axios'

import { Link } from "react-router-dom";
function Recomended() {

    const [courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false)
    const getCourse = async () => {
        try {
            const res = await axios.get("http://localhost:5000/getcourse", { withCredentials: true });
            setCourses(res.data?.Allcources || []); // Fallback to an empty array if no data
            setLoader(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError(true);
            setLoader(false);
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    return (<>
        <div className="recomended h-full py-[3rem] flex flex-col items-center justify-evenly">
            <h2 className="container mx-auto font-medium mb-5">Recomended For You</h2>
            <div className="flex items-center container mx-auto  flex-wrap gap-[1rem]">
                {
                    loader ? (<>
                        <div className="flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>

                    </>) : (<>
                        {courses.slice(-4).map((course, index) => (
                            <Link className="w-[24%]" to={`/allcources/${course._id}`}>
                                {console.log(course)}
                                <Cource
                                    key={index}
                                    img={course?.images?.[0]?.url || ""}
                                    title={course.title}
                                    description={course.description}
                                    duration={course.duration}
                                    instructor={course.instructorId?.fullname}
                                    instructorLogo={course?.instructorId?.image?.url}
                                    type={course?.category}
                                    price={course?.price === 0 ? 'Free' : course?.price}
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
    </>);
}

export default Recomended;