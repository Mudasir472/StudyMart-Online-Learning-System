import axios from "axios";
import toast from "react-hot-toast";
import { URI } from "../../env";
export const deleteCourse = async (courceId, token, setCourses, setIsModalOpen) => {
    try {
        const resp = await axios.delete(`${URI}/api/deleteCource/${courceId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        // Update courses in state
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courceId));

        // Close modal
        setIsModalOpen(false);

        // Show success toast
        toast.success(resp?.data?.message || "Course deleted successfully");
    } catch (error) {
        console.log("Token:", token);
        console.log("Error:", error);

        // Show error toast
        const errorMessage = error?.response?.data?.message || "Error deleting the course";
        toast.error(errorMessage);
    }
};
