import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminRoute({ children }) {
    const isAuthenticated = localStorage.getItem("user");
    const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;
    const location = useLocation();

    if (!isAuthenticated) {
        toast.error("Please login first");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.role !== "Teacher") {
        toast.error("Access Denied: Admins Only");
        return <Navigate to="/" replace />;
    }

    return children;
}
