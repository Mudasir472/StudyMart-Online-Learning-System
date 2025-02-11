import { useContext, useState } from "react";
import axios from 'axios';
import loginImg from "../assets/login.svg"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginContext } from "../context/Context.jsx"
import { URI } from "../../env.js";
export default function Login() {
    const { loginData, setLoginData } = useContext(LoginContext)
    const [user, setUser] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${URI}/login`,
                formData,
                { withCredentials: true }
            );
            toast.success(response.data?.message);
            setLoginData(response.data?.result?.existingUser)
            setUser(response.data?.result?.existingUser?.role)
            localStorage.setItem('token', JSON.stringify(response.data?.result?.token))
            localStorage.setItem('user', JSON.stringify(response.data?.result?.existingUser))
            response.data?.result?.existingUser?.role === 'Teacher' ? navigate("/dashboard") : navigate("/")
        } catch (err) {
            toast.error(err.response?.data?.error || "An error occurred. Please try again.")

        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 container mx-auto">

                <div className="flex items-center justify-evenly gap-[6rem]">
                    <div>
                        <img className="h-[35rem]" src={loginImg} alt="" />
                    </div>
                    <div className="  sm:w-full sm:max-w-sm flex flex-col gap-[2rem]" >
                        <div className="welcome">
                            <p className="flex items-center justify-center mb-[12px]">Welcome <span className="ms-2 text-[#F48C06]">StudyMart</span></p>
                            <div className="flex items-center bg-[#fff2e1] justify-center gap-[3rem] h-[56px] rounded-3xl">
                                <div className="bg-[#F48C06] text-white h-[77%] w-[100px] rounded-3xl flex items-center justify-center">Login</div>
                                <div className="">Register</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-[#F48C06]">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="current-password"
                                        placeholder="password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-[50%] rounded-2xl flex w-full justify-center rounded-md bg-[#F48C06] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#daa157] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    Log in
                                </button>
                            </div>
                        </form>

                        
                    </div>
                </div>
            </div>
        </>
    )
}



