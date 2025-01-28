import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({
        fullname: "",
        number: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!")
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/signup",
                formData
            );
            toast.success(response.data.message || "Signup successful! You can now log in.")
            localStorage.setItem('user', JSON.stringify(response.data))
            navigate('/');
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(err.response?.data?.error || "error occurs")
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Enter Contact"
                                />
                            </div>
                        </div>
                        <select
                            className="select select-bordered w-full max-w-xs"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                    type="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="current-password"
                                    placeholder="confirm Password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}



