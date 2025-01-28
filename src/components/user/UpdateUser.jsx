import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/Context";

function UpdateUser() {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [formData, setFormData] = useState({
        fullname: loginData?.fullname,
        biography: loginData?.biography,
        address: loginData?.address,
        city: loginData?.city,
        country: loginData?.country,
        facebookLink: loginData?.facebookLink,
        instaLink: loginData?.instaLink,
        linkedinLink: loginData?.linkedinLink,
        githubLink: loginData?.githubLink,
        skills: loginData?.skills || [],
    });
    const [newSkill, setNewSkill] = useState("");
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };
    // Handler for adding a skill
    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setFormData((prevState) => ({
                ...prevState,
                skills: [...prevState.skills, newSkill.trim()], // Add new skill to the array
            }));
            setNewSkill(""); // Clear the input field
        }
    };

    // Handler for removing a skill
    const handleRemoveSkill = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((_, i) => i !== index), // Remove skill by index
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                "http://localhost:5000/edituser",
                formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            );
            setLoginData((prevData) => ({
                ...prevData,
                ...formData, // Merge the updated formData
            }));
            toast.success(response.data.message)
            navigate('/userprofile');
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(err.response?.data?.message || "error occurs")
        }
    };
    console.log(formData);

    return (<>
        <div className="updateuser">
            <div className="bg-white  container mx-auto text-black font-sans  flex flex-col  justify-center">
                <div style={{ boxShadow: "#64646f33 0 7px 29px" }} className="flex flex-col  h-[89%] w-full  rounded-lg p-6 ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[4rem]">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        autoComplete="fullname"
                                        placeholder="Enter Full Name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="biography" className="block text-sm/6 font-medium text-gray-900">
                                    Biography
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={formData.biography}
                                        onChange={handleInputChange}
                                        id="biography"
                                        name="biography"
                                        type="text"
                                        placeholder="about yourself"
                                        autoComplete="biography"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Enter Address"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Enter City"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        id="country"
                                        name="country"
                                        type="text"
                                        placeholder="Enter Country"
                                        autoComplete="country"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="facebookLink" className="block text-sm/6 font-medium text-gray-900">
                                    Facebook Link
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.facebookLink}
                                        onChange={handleInputChange}
                                        id="facebookLink"
                                        name="facebookLink"
                                        type="text"
                                        placeholder="Enter facebook link"
                                        autoComplete="facebookLink"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="instaLink" className="block text-sm/6 font-medium text-gray-900">
                                    Instagram Link
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.instaLink}
                                        onChange={handleInputChange}
                                        id="instaLink"
                                        name="instaLink"
                                        type="text"
                                        placeholder="Enter Instagram Link"
                                        autoComplete="instaLink"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="linkedinLink" className="block text-sm/6 font-medium text-gray-900">
                                    Linkedin Link
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.linkedinLink}
                                        onChange={handleInputChange}
                                        id="linkedinLink"
                                        name="linkedinLink"
                                        type="text"
                                        placeholder="Enter Linkedin Link"
                                        autoComplete="linkedinLink"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="githubLink" className="block text-sm/6 font-medium text-gray-900">
                                    Github Link
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.githubLink}
                                        onChange={handleInputChange}
                                        id="githubLink"
                                        name="githubLink"
                                        type="text"
                                        placeholder="Enter Github Link"
                                        autoComplete="githubLink"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="skills" className="block text-sm/6 font-medium text-gray-900">
                                    Skills
                                </label>
                                <div className="mt-2">
                                    <div className="flex gap-2">
                                        {/* Input for adding a new skill */}
                                        <input
                                            value={newSkill} // Controlled input for new skill
                                            onChange={(e) => setNewSkill(e.target.value)} // Handle change
                                            id="skills"
                                            name="skills"
                                            type="text"
                                            placeholder="Enter a skill"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#F48C06] sm:text-sm/6"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSkill} // Add skill to the array
                                            className="rounded-md bg-[#F48C06] px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#F48C06] focus:outline-none focus:ring-2 focus:[#F48C06] focus:ring-offset-2"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {/* Display the skills array */}
                                    <div className="mt-4">
                                        {formData.skills.length > 0 && (
                                            <ul className="list-disc pl-5 text-gray-700">
                                                {formData.skills.map((skill, index) => (
                                                    <li key={index} className="flex justify-between items-center">
                                                        {skill}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(index)} // Remove skill by index
                                                            className="ml-2 text-[#F48C06] hover:text-[#F48C06] text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center justify-center">
                            <button className="font-medium text-white bg-[#F48C06] rounded-lg flex items-center justify-center h-[42px] w-[121px]">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default UpdateUser;