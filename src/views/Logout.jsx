import React, { useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Context";
import { URI } from "../../env";

const Logout = () => {
    const navigate = useNavigate();
    const { setLoginData } = useContext(LoginContext);

    useEffect(() => {
        const handleLogout = async () => {
            const token = localStorage.getItem("token");
            try {
                await axios.get(`${URI}/logout`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                // Remove token & user data
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                // Reset context state
                setLoginData(null);

                toast.success("Logout Successfully");
                navigate("/login");
            } catch (error) {
                toast.error(error.response?.data?.error || "Logout failed");
                navigate("/login");
            }
        };

        handleLogout();
    }, [navigate, setLoginData]); // ✅ useEffect will call logout only once

    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-xl font-semibold">Logging out...</h2>
        </div>
    );
};

export default Logout;
