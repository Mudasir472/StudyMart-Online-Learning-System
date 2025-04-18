import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Home from "./Home";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CourceDetails from "./views/courceDetails/CourceDetails";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./ProtectedRoute";
import DashLayout from "./components/Dashboards/Instructor/DashLayout";
import ViewCourse from "./views/courceDetails/ViewCourse";
import UpdateUser from "./components/user/UpdateUser";
import MyCource from "./components/user/MyCource";
import EachCource from "./views/pages/EachCource";
import About from "./views/pages/About";
import Blog from "./views/pages/Blog";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminRoute from "./AdminRoute";
// import ContactPage from "./views/pages/ContactPage";


function App() {
  return (
    <div className="app-container">
      <Toaster reverseOrder={false} />
      <AppWrapper />
    </div>
  );
}
function AppWrapper() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="219611482733-e0svucrtr3tgs9ka7ct8k2mittsjuj0v.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  )
  return (
    <>
      <div className="app-container">
        <div style={{ backgroundColor: '#FFF2E1' }}>
          <div className="container mx-auto">
            {!isDashboardRoute && <Navbar />}

          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleWrapper />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/userprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/updateuser" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
          <Route path="/view-cource/:courseId" element={<ProtectedRoute><ViewCourse /></ProtectedRoute>} />
          <Route path="/my-cources" element={<ProtectedRoute><MyCource /></ProtectedRoute>} />

          <Route path="/allcources/:id" element={<CourceDetails />} />

          <Route path="/all-cources" element={<EachCource />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}


          <Route path="/dashboard/*" element={
            < AdminRoute >
              <DashLayout />
            </AdminRoute>} />
          {/* <Route path="*" element={< />} /> */}
        </Routes>
        <div style={{ backgroundColor: '#252641', color: 'white' }} className="foot">
          {/* <Footer /> */}
          {!isDashboardRoute && <Footer />}

        </div>
      </div>
    </>
  )
}


function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default Root;

