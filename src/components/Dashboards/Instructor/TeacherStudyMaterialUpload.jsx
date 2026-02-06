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

    const [material, setMaterial] = useState([])

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
    useEffect(() => {
        axios
            .get(`${URI}/api/material/material/teacher`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => { setMaterial(res.data) })
            .catch((err) => { console.log(err) || toast.error("Failed to load study materials"); });
    }, [token]);

    console.log(material);

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
            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-3">📚 Your Uploaded Materials</h3>

            {material.length === 0 ? (
                <p className="text-gray-500">No materials uploaded yet.</p>
            ) : (
                <div className="space-y-3">
                    {material.map((m) => (
                        <div
                            key={m._id}
                            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            <div>
                                <p className="font-medium">{m.title}</p>
                                <p className="text-sm text-gray-500">
                                    Type: {m.type?.toUpperCase()}
                                </p>
                                {m.course?.title && (
                                    <p className="text-xs text-gray-400">
                                        Course: {m.course.title}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <a
                                    href={m.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                                >
                                    View
                                </a>

                                <button
                                    onClick={() => handleUpdate(m._id)}
                                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => handleDelete(m._id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default TeacherStudyMaterialUpload;
