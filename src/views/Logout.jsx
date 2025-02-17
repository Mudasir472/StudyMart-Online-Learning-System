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
        const logoutUser = async () => {
            const token = localStorage.getItem("token");
            try {
                await axios.get(`${URI}/logout`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                // Clear token from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Clear login data in context to reflect logout
                setLoginData(null);
                toast.success("Logout Successfully");
                navigate("/login");
            } catch (error) {
                toast.error(error.response.data.error);
                // console.error("Error during logout:");

                navigate("/login");
            }
        };
        logoutUser();
    }, [navigate, setLoginData]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
