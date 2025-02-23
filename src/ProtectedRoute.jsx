// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProtectedRoute({ element: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem("user");
    const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please Login First");
        } else if (user?.role === "Student") {
            toast.error("Students cannot access the dashboard");
        }
    }, [isAuthenticated, user]);

    return isAuthenticated && user?.role === "Teacher" ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace />

    );
}
