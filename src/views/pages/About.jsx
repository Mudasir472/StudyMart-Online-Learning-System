import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URI } from "../../../env.js"
import about from "../../../assets/about.webp"
import teacher from "../../../assets/teacher.svg"
import Recomended from "../Home/Recomended.jsx";
import axios from "axios";
import Instructors from "./Instructors.jsx";
function About() {
    const [allUsers, setAllUsers] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                setLoading(true);
                const resp = await axios.get(`${URI}/getallusers`);
                setAllUsers(resp?.data?.allUsers || []);  // Ensure it's always an array
            } catch (error) {
                setError(error?.response?.data?.message)
                console.error("Error fetching users:", error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);
    const instructors = allUsers?.filter(user => user?.role === "Teacher");

    return (<>
        <div className="about">
            <div className="aboutMain flex flex-col gap-[2rem] container mx-auto">
                <div className="aboutWelcome flex items-center justify-between">
                    <div className="left">
                        <img className="rounded-lg" src={about} alt="" />
                    </div>
                    <div className="right w-[55%] p-[50px] flex flex-col gap-[2rem]">
                        <p className="text-[#f48c06] text-xl font-medium">Welcome to StudyMart</p>
                        <h2 className=" text-[2.7rem]">You can join with StudyMart and upgrade your skill for your <span className="text-[#f48c06]">bright future.</span></h2>
                        <p>Lorem Ipsum has been the industr’s standard dummy text ever since unknown printer took galley type and scmbled make type specimen book. It has survived not only five centuries.</p>

                        <button className="bg-[#f48c06] h-[37px] w-[24%] text-white rounded-lg"><Link to={'/all-cources'}>Find Cource</Link></button>

                    </div>
                </div>
                <div className="aboutinstructors flex gap-[3rem]">
                    <div className="p-[32px] flex flex-col gap-[1.5rem] justify-center h-[20rem] border rounded-lg hover:border-[#f48c06]">
                        <div className="top flex items-center gap-[1rem] ">
                            <img className="h-[60px]" src={teacher} alt="" />
                            <h2 className="font-medium text-xl">Top Instructors</h2>
                        </div>
                        <p>Lorem Ipsum has been the industry's standard dumy text since the when took and scrambled to make type specimen book has survived.</p>
                    </div>
                    <div className="p-[32px] flex flex-col gap-[1.5rem] justify-center h-[20rem] border rounded-lg hover:border-[#f48c06]">
                        <div className="top flex items-center gap-[1rem] r">
                            <img className="h-[60px]" src={teacher} alt="" />
                            <h2 className="font-medium text-xl">Top Instructors</h2>
                        </div>
                        <p>Lorem Ipsum has been the industry's standard dumy text since the when took and scrambled to make type specimen book has survived.</p>
                    </div>
                    <div className="p-[32px] flex flex-col gap-[1.5rem] justify-center h-[20rem]  border rounded-lg hover:border-[#f48c06]">
                        <div className="top flex items-center gap-[1rem] ">
                            <img className="h-[60px]" src={teacher} alt="" />
                            <h2 className="font-medium text-xl">Top Instructors</h2>
                        </div>
                        <p>Lorem Ipsum has been the industry's standard dumy text since the when took and scrambled to make type specimen book has survived.</p>
                    </div>
                </div>
                <div className="aboutJoin bg-[#fff2e1] p-[81px]">
                    <div className="flex items-center justify-between">
                        <div className="left">
                            <p className="text-2xl font-medium text-[#f48c06] mb-3">Become An Instructor</p>
                            <h2 className="text-5xl w-[67%]">You can join with StudyMart as <span className="text-[#f48c01]">an instructor?</span></h2>
                        </div>
                        <div className="right bg-[#f48c06] text-white w-[173px] h-[51px] font-medium rounded-lg">
                            <Link to={'/contact'}>
                                <button className="w-[173px] h-[51px] font-medium rounded-lg">Drop Information</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="aboutmembers">
                    <div className="flex flex-col items-center gap-[1rem] ">
                        <p className="text-2xl font-medium text-[#f48c06]">Team Member’s</p>
                        <h1 className="text-3xl">StudyMart Skilled <span className="text-[#f48c06]">Instructor</span></h1>
                        <div className="flex flex-wrap w-full gap-[3rem] mb-[3rem] mt-[2rem]">

                            {
                                loading ? (<>
                                    <p>Loading teachers ...</p>
                                </>) : (<>

                                    {
                                        error ? (<>
                                            <h2>here is an error : <span className="text-red">{error}</span></h2>
                                        </>) : (<>
                                            {instructors.map(instructor => (
                                                <Instructors key={instructor._id} instructor={instructor} />
                                            ))}
                                        </>)
                                    }</>)
                            }

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Recomended />
            </div>
        </div>
    </>);
}

export default About;