import { useContext, useState } from "react";
import axios from 'axios';
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api.js"
import loginImg from "../assets/login.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginContext } from "../context/Context.jsx"
import { URI } from "../../env.js";
export default function Login() {
    const [login, setLogin] = useState(true);
    const { loginData, setLoginData } = useContext(LoginContext)
    const [user, setUser] = useState({});
    const location = useLocation();
    const [formData, setFormData] = useState({
        fullname: "",
        number: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
    });
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        role: "",
    });


    const navigate = useNavigate();
    const handleInputChangeLogin = (e) => {
        setLoginFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!")
            return;
        }
        try {
            const response = await axios.post(
                `${URI}/signup`,
                formData
            );
            toast.success(response.data.message || "Signup successful! You can now log in.")
            console.log(response.data);

            setLoginData(response.data?.result?.user)
            localStorage.setItem('token', JSON.stringify(response.data?.result?.token))
            localStorage.setItem('user', JSON.stringify(response.data?.result?.user))
            navigate('/');
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(err.response?.data?.error || "error occurs")
        }
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${URI}/login`,
                loginFormData,
                { withCredentials: true }
            );
            toast.success(response.data?.message);
            setLoginData(response.data?.result?.existingUser)
            setUser(response.data?.result?.existingUser?.role)
            localStorage.setItem('token', JSON.stringify(response.data?.result?.token))
            localStorage.setItem('user', JSON.stringify(response.data?.result?.existingUser))
            // Get previous route from location.state
            const from = location.state?.from?.pathname;

            // Navigate to previous route if available, otherwise navigate based on role
            navigate(from || (user?.role === "Teacher" ? "/dashboard" : "/"), { replace: true });
            // response.data?.result?.existingUser?.role === 'Teacher' ? navigate("/dashboard") : navigate("/")
        } catch (err) {
            toast.error(err.response?.data?.error || "An error occurred. Please try again.")

        }
    };

    // For googleLogin
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                const result = await googleAuth(authResult.code);
                const { email, fullname, image } = result?.data?.user;
                const token = result.data.token;
                const obj = { email, fullname };
                setLoginData(result?.data?.user);
                localStorage.setItem('user', JSON.stringify(obj));
                localStorage.setItem('token', JSON.stringify(token));
                toast.success("Login Success");
                navigate('/userprofile');
            } else {
                throw new Error(authResult);
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
        }
    };
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 container mx-auto">

                <div className="flex  justify-evenly gap-[6rem]">
                    <div>
                        <img className="h-[35rem]" src={loginImg} alt="" />
                    </div>
                    <div className="  sm:w-full sm:max-w-sm flex flex-col gap-[2rem]" >
                        <div className="welcome">
                            <p className="flex items-center justify-center mb-[12px]">Welcome <span className="ms-2 text-[#F48C06]">StudyMart</span></p>
                            <div className="flex items-center bg-[#fff2e1] justify-center gap-[3rem] h-[56px] rounded-3xl">
                                <div className={` h-[77%] w-[100px] rounded-3xl flex items-center justify-center cursor-pointer ${login ? 'bg-[#F48C06] text-white' : ''}`} onClick={() => { setLogin(true) }}>Login</div>
                                <div className={`h-[77%] w-[100px] rounded-3xl flex items-center justify-center cursor-pointer ${!login ? 'bg-[#F48C06] text-white' : ''}`} onClick={() => { setLogin(false) }}>Register</div>
                            </div>
                        </div>
                        {
                            login ? (<>
                                <form onSubmit={handleSubmitLogin} className="space-y-6 ">
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={loginFormData.email}
                                                onChange={handleInputChangeLogin}
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
                                                value={loginFormData.password}
                                                onChange={handleInputChangeLogin}
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

                            </>) : (<>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="fullname"
                                                type="fullname"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                                required
                                                autoComplete="fullname"
                                                placeholder="Enter First Name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
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
                                        <label htmlFor="number" className="block text-sm/6 font-medium text-gray-900">
                                            Contact
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="number"
                                                name="number"
                                                type="text"
                                                value={formData.number}
                                                onChange={handleInputChange}
                                                required
                                                autoComplete="number"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                                placeholder="Enter Contact"
                                            />
                                        </div>
                                    </div>
                                    <select
                                        className="select select-bordered w-full max-w-xs focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] "
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Role
                                        </option>
                                        <option value="Student">Student</option>
                                        <option value="Teacher">Teacher</option>
                                    </select>


                                    <div>
                                        <label htmlFor="number" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
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
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                autoComplete="current-password"
                                                placeholder="confirm Password"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-[#F48C06] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F48C06]"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </>)
                        }

                        <div className="googleLogin">
                            <div className='flex items-center justify-center'>
                                <p onClick={googleLogin} className='border-2 rounded-xl p-[14px] cursor-pointer'><span className='me-2'><i class="bi bi-google text-[#4285F4] text-xl"></i></span>Login with Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



