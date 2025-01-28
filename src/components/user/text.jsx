import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./Home";
import Zakat from "./views/Pages/Zakat";
import About from "./views/Pages/About";
import NewContactPage from "./views/Pages/NewContactPage";
import Donate from "./views/Donate";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Signup from "./components/user/Signup";
import CommunityDetails from "./views/communityStroy/CommunityDetails";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import ForgotPassword from "./components/user/HandlePassword/ForgotPassword";
import ResetPassword from "./components/user/HandlePassword/ResetPassword";
import UserProfile from "./components/user/UserProfile";
import UpdateProfile from "./components/user/UpdateProfile";
import DashboardLayout from "./views/dashboard/dashboardLayout";
import ProtectedRoute from "../src/ProtectedRoute"
import RecieverDetailsForm from "./views/Pages/RecieverDetailsForm";

function App() {
    return (
        <div className="app-container">
            <ToastContainer />
            <AppWrapper />
        </div>
    );
}

function AppWrapper() {
    const location = useLocation();
    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    return (
        <>
            {/* Conditionally render the Navbar */}
            {!isDashboardRoute && <Navbar />}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/zakatcare/zakat" element={<Zakat />} />
                    <Route path="/zakatcare/about" element={<About />} />
                    <Route path="/zakatcare/contact" element={<NewContactPage />} />
                    <Route path="/zakatcare/donate" element={<Donate />} />
                    <Route path="/zakatcare/login" element={<Login />} />
                    <Route path="/zakatcare/logout" element={<Logout />} />
                    <Route path="/zakatcare/signup" element={<Signup />} />
                    <Route path="/zakatcare/userprofile" element={<UserProfile />} />
                    <Route path="/updateuser" element={<UpdateProfile />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/zakatcare/:id" element={<CommunityDetails />} />

                    <Route path="/reciever-details/:token" element={<RecieverDetailsForm />} />

                    <Route path="/dashboard/*" element={<ProtectedRoute element={DashboardLayout} />} />
                    {/* Page not found */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            {!isDashboardRoute && <Footer />}
        </>
    );
}

function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;
