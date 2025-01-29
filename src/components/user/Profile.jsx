import React, { useContext, useRef, useState } from "react";
import { LoginContext } from "../../context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { URI } from "../../../env";


const Profile = () => {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);
            setLoading(true);
            try {
                const response = await axios.post(`${URI}/user/changeprofile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                toast.success("profile changed successfully")
                const updatedLoginData = {
                    ...loginData,
                    image: { url: response?.data?.user?.image?.url },
                };

                setLoginData(updatedLoginData);
            } catch (error) {
                console.error('Error uploading the file:', error);
                toast.error("Failed to upload image")
            }
            finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="bg-white h-[42rem] container mx-auto text-black font-sans  flex flex-col  justify-center">
            <div style={{ boxShadow: "#64646f33 0 7px 29px" }} className=" h-[89%] w-full  rounded-lg p-6 ">
                <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
                <div className="image flex items-center mb-5 gap-[30rem]">
                    <div className="flex items-center">
                        <form encType="multipart/form-data">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                name="profilePic"
                            />
                        </form>
                        <div className="relative group cursor-pointer" onClick={handleImageClick}>
                            {loading ? (
                                <>
                                    <img
                                        onClick={handleImageClick}
                                        className="h-[59px] w-[59px] rounded-full "
                                        src={loginData?.image?.url}
                                        alt="Profile"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-100  transition-opacity">
                                        <span className="loading text-white loading-spinner loading-md"></span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        onClick={handleImageClick}
                                        className="h-[59px] w-[59px] rounded-full "
                                        src={loginData?.image?.url}
                                        alt="Profile"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i class="bi bi-pencil text-white"></i>
                                    </div>
                                </>
                            )}

                        </div>


                        <div className="ms-4">
                            <h3>{loginData?.fullname}</h3>
                            <p>MERN stack</p>
                        </div>
                    </div>
                    {
                        loginData?.role === 'Teacher' ? (
                            <Link to={'/dashboard'}>
                                <button className="gap-[30rem] bg-[#F48C06]  text-white font-semibold rounded-lg w-[195px] h-[50px]">Your Dashboard</button>
                            </Link>
                        ) : (
                            <Link to={'/my-cources'}>
                                <button className="gap-[30rem] bg-[#F48C06]  text-white font-semibold rounded-lg w-[195px] h-[50px]">My Cources</button>
                            </Link>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
                    {/* Left Column */}
                    <div className="flex flex-col gap-[2rem]">
                        <p className="mb-2">
                            <span className="font-semibold">Full Name: </span>{loginData?.fullname}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Biography: </span>
                            {loginData?.biography}
                        </p>
                        <div className="flex items-center gap-[3rem]">
                            <a
                                href={loginData?.facebookLink?.startsWith('http') ? loginData.facebookLink : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={!loginData?.facebookLink ? 'Place the link, click to edit' : ''}
                                onClick={(e) => {
                                    if (!loginData?.facebookLink) {
                                        e.preventDefault(); // Prevent the click if the link is not defined
                                    }
                                }}
                            >
                                <p>
                                    <i className="bi bi-facebook text-3xl text-[#1877F2]"></i>
                                </p>
                            </a>

                            <a
                                href={loginData?.instaLink?.startsWith('http') ? loginData.instaLink : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={!loginData?.instaLink ? 'Place the link, click to edit' : ''}
                                onClick={(e) => {
                                    if (!loginData?.instaLink) {
                                        e.preventDefault(); // Prevent the click if the link is not defined
                                    }
                                }}
                            >
                                <p>
                                    <i className="bi bi-instagram text-3xl text-[#E1306C]"></i>
                                </p>
                            </a>

                            <a
                                href={loginData?.linkedinLink?.startsWith('http') ? loginData.linkedinLink : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={!loginData?.linkedinLink ? 'Place the link, click to edit' : ''}
                                onClick={(e) => {
                                    if (!loginData?.linkedinLink) {
                                        e.preventDefault(); // Prevent the click if the link is not defined
                                    }
                                }}
                            >
                                <p>
                                    <i className="bi bi-linkedin text-3xl text-[#0A66C2]"></i>
                                </p>
                            </a>

                            <a
                                href={loginData?.githubLink?.startsWith('http') ? loginData.githubLink : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={!loginData?.githubLink ? 'Place the link, click to edit' : ''}
                                onClick={(e) => {
                                    if (!loginData?.githubLink) {
                                        e.preventDefault(); // Prevent the click if the link is not defined
                                    }
                                }}
                            >
                                <p>
                                    <i className="bi bi-github text-3xl text-[#181717]"></i>
                                </p>
                            </a>

                        </div>

                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col gap-[2rem]">
                        <p className="mb-2">
                            <span className="font-semibold">Email Address: </span>
                            {loginData?.email}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Home Address: </span>
                            {`${loginData?.address} ${loginData?.city}, ${loginData?.country}`}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Phone Number: </span>{loginData?.number}
                        </p>
                        <p className="mb-2">
                            {
                                loginData?.skills.length > 0 ? (<>
                                    <div>
                                        <span className="font-semibold">Your Skills :  </span>
                                        {loginData?.skills?.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-block text-gray-400 mr-2"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </>) : (<>
                                    <div>
                                        <span className="font-semibold">Your Skills :  </span>
                                        <span>List your skills here</span>
                                    </div></>)
                            }
                        </p>
                    </div>
                </div>
                <div className="flex justify-start mt-6">
                    <Link to={"/updateuser"}>
                        <button className="bg-[#F48C06]  text-white font-semibold px-4 py-2 rounded">
                            Edit
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
