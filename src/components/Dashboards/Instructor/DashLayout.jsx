import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InstructorDashboard from "./InstructorDashboard.jsx"
import Headbar from "./Headbar";
import Sidebar from "./Sidebar";
import { CourseContext } from "../../../context/CourseProvider.jsx";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../context/Context.jsx";
import CourceUpdate from "./CourceUpdate.jsx";
import Graph from "./Graph.jsx";
import Pie from "./Pie.jsx";

function DashLayout() {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [userCource, setUserCource] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setLoginData(storedUser);
        }
    }, [setLoginData]);


    return (<>
        <div className="dashlayout">
            <div className="dashMain">
                <div className="routes">
                    <Headbar />
                    <Sidebar />
                    <div className="dashboard-content bg-[#fff2e1] overflow-y-auto  p-[31px] mt-[66px] ms-[162px]">
                        <Routes>
                            <Route path="" element={<InstructorDashboard loader={false} />} />
                            <Route path="overview" element={<Graph />} />
                            <Route path="enrolled" element={<Pie />} />
                            <Route path="cource-update/:courseId" element={<CourceUpdate />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default DashLayout;