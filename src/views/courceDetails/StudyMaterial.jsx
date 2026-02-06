import { useEffect, useState } from "react";
import axios from "axios";
import { URI } from "../../../env";
import toast from "react-hot-toast";


function StudyMaterial({ courseId }) {
    const token = localStorage.getItem("token");
    const [materials, setMaterials] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);


    useEffect(() => {
        axios
            .get(`${URI}/api/material/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => { setMaterials(res.data) })
            .catch((err) => { toast.error("Failed to load study materials"); });
    }, [token, courseId]);

    

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">📚 Study Materials</h2>
            {/* {console.log(materials)} */}
            {materials?.length === 0 && (
                <p className="text-gray-500">No materials uploaded yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {materials?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        {/* Title */}
                        <h4 className="text-lg font-semibold mb-2">{item?.title}</h4>

                        {/* Meta Row */}
                        <div className="flex items-center justify-between mb-4">
                            {/* File Type */}
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                                {item.type.toUpperCase()}
                            </span>

                            {/* Uploader Badge */}
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                👤 {item?.uploadedBy?.fullname || "Unknown"}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            {item.type === "pdf" && (
                                <button
                                    onClick={() => setSelectedPdf(item)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    👀 Preview
                                </button>
                            )}

                            <a
                                href={item.fileUrl}
                                download
                                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            >
                                ⬇ Download
                            </a>
                        </div>
                    </div>


                ))}
            </div>

            {/* PDF Preview Modal */}
            {selectedPdf && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
                    <div className="bg-white w-[90%] max-w-4xl rounded-xl overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-semibold">{selectedPdf.title}</h3>
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="text-xl"
                            >
                                ✖
                            </button>
                        </div>

                        <iframe
                            src={selectedPdf.fileUrl}
                            className="w-full h-[500px]"
                            title="PDF Preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudyMaterial;
