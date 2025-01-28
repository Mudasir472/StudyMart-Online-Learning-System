import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Context creation
export const CourseContext = createContext(null);

const CourseProvider = ({ children }) => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch courses when the app loads
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getcourse", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setCourses(response.data?.Allcources || []);
            } catch (err) {
                setError(err.message || "Failed to fetch courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <CourseContext.Provider value={{ courses, setCourses, loading, error }}>
            {children}
        </CourseContext.Provider>
    );
};

export default CourseProvider;
