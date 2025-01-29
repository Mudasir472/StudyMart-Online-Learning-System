import { useContext, useState } from "react";
import { CourseContext } from "../../context/CourseProvider";
import { Link } from "react-router-dom";
import Cource from "../Home/Cource";

function EachCource() {
    const [searchTerm, setSearchTerm] = useState("");
    const { courses, loading, error } = useContext(CourseContext);
    const categories = ["All Courses", "Development", "Design", "CyberSecurity", "Blockchain"];
    const [selectedCategory, setSelectedCategory] = useState("All Courses");

    // Filter courses based on the selected category
    const filteredCourses = courses.filter(course =>
        (selectedCategory === "All Courses" || course.category === selectedCategory) &&
        (course?.category?.toLowerCase()?.includes(searchTerm.toLowerCase())) && (course?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())) // Filter by search
    );

    return (
        <>
            <div className="eachCources mt-[67px]">
                <div className="courceesMain container mx-auto">

                    {/* Category Filter */}
                    <div className="courcesFilter my-4">
                        <div className="bg-[#fff2e1] flex items-center justify-center">
                            <ul className=" p-4 rounded-lg flex items-center gap-4 w-full">
                                {categories.map((category) => (
                                    <li
                                        key={category}
                                        className={`w-[135px] h-[56px] flex rounded-lg items-center justify-center cursor-pointer
                                            ${selectedCategory === category ? "bg-orange-400 text-white" : "bg-white"}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                            <div className="searchBar">
                                <div className="p-[15px] w-[21rem]">
                                    <input

                                        id="search"
                                        name="search"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="search cource name"
                                        autoComplete="search"
                                        className="block w-full h-[47px] rounded-md px-3 py-1.5 border-gray-300 border-1 border-gray-300 placeholder:text-gray-400 focus:border-[#fb923c] focus:ring-1 focus:ring-[#fb923c] focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses List */}
                    <div className="flex items-center flex-wrap gap-[1rem] mt-[4rem] mb-[2rem]">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        ) : (
                            filteredCourses.length > 0 ? (
                                filteredCourses.map((course, index) => (
                                    <Link key={index} className="w-[24%]" to={`/allcources/${course._id}`}>
                                        <Cource
                                            img={course?.images?.[0]?.url || ""}
                                            title={course.title}
                                            description={course.description}
                                            duration={course.duration}
                                            instructor={course.instructorId?.fullname}
                                            instructorLogo={course?.instructorId?.image?.url}
                                            type={course.category}
                                            price={course?.price}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <h2 className="text-center w-full">No courses Matched to your search</h2>
                            )
                        )}

                        {error && <h2 className="text-red-500">An error occurred while fetching the course data</h2>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EachCource;
