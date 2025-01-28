
import Cource from "./Cource";
import profile from "../../assets/Group 237.svg"
import { useEffect, useState } from "react";
import axios from 'axios'


import mern from "../../assets/mern.webp"
import dataScience from "../../assets/dataScience.png"
import cyber from "../../assets/cyber.jpg"
import digitalM from "../../assets/digitalM.webp"
import UIUX from "../../assets/UIUX.svg"
import blockchain from "../../assets/blockchain.jpeg"
import awss from "../../assets/awss.svg"
import design from "../../assets/Rectangle 33.png"
import { Link } from "react-router-dom";
function Recomended() {
    const coursesArray = [
        {
            img: awss,
            title: "AWS Certified Cloud Practitioner",
            description: "Start your cloud journey by learning the fundamentals of AWS.",
            duration: "3 Months",
            instructor: "Mike Taylor",
            instructorLogo: profile,
            type: "Cloud Computing"
        },
        {
            img: UIUX,
            title: "UI/UX Design for Beginners",
            description: "Learn to design intuitive and user-friendly interfaces with Figma.",
            duration: "3 Months",
            instructor: "Sophie Brown",
            instructorLogo: profile,
            type: "UI/UX"
        },
        {
            img: cyber,
            title: "Cybersecurity Fundamentals",
            description: "Understand cybersecurity principles, tools, and strategies to protect systems.",
            duration: "3 Months",
            instructor: "Alice Johnson",
            instructorLogo: profile,
            type: "Cybersecurity"
        },
        {
            img: blockchain,
            title: "Introduction to Blockchain",
            description: "Understand the basics of blockchain technology and cryptocurrency.",
            duration: "3 Months",
            instructor: "Olivia Green",
            instructorLogo: profile,
            type: "Blockchain"
        }
    ];

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