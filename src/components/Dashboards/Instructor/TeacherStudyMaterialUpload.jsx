import { useEffect, useState } from "react";
import axios from "axios";
import { URI } from "../../../../env.js";
import toast from "react-hot-toast";

function TeacherStudyMaterialUpload() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("pdf");
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // 🔄 Fetch teacher's courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${URI}/my-courses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res?.data);

                setCourses(res.data);
            } catch (err) {
                toast.error("Failed to load courses");
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !title || !courseId) {
            return toast.error("All fields required");
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        formData.append("courseId", courseId); // ✅ send selected course
        formData.append("file", file);

        try {
            setLoading(true);

            await axios.post(`${URI}/api/material/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTitle("");
            setFile(null);
            setCourseId("");
            toast.success("Material uploaded successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
                📤 Upload Study Material
            </h3>

            {
                courses.length > 0 ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Course Select */}
                        <select
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        >
                            <option value="">Select Course</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Material title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        >
                            <option value="pdf">PDF</option>
                            <option value="ppt">PPT</option>
                        </select>

                        <input
                            type="file"
                            accept=".pdf,.ppt,.pptx"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full"
                        />

                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Uploading..." : "Upload Material"}
                        </button>
                    </form>
                ) : (
                    <p className="text-red-500">You have no courses to upload material for. Please create a course first.</p>
                )
            }


        </div>
    );
}

export default TeacherStudyMaterialUpload;
