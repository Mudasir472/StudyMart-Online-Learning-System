import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation(); // Get the current route

    return (
        <>
            <div className="sidebar p-[23px] w-[11%] fixed top-[73px] left-0 container bg-[#F48C06] h-[90.2vh]">
                <div className="sidebar-main">
                    <nav>
                        <ul className="sidebar-lists flex flex-col justify-evenly text-dark gap-[2rem]">
                            <li
                                className={`flex items-center justify-evenly ${location.pathname === "/dashboard" ? "border-l-[5px]" : ""
                                    }`}
                            >
                                <Link to="/dashboard">
                                    <div className="w-[66px] h-[62px] flex items-center bg-[#de9940] justify-center rounded-lg">
                                        <i className="bi bi-card-list text-[39px] text-white"></i>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`flex items-center justify-evenly ${location.pathname === "/dashboard/overview" ? "border-l-[5px]" : ""
                                    }`}
                            >
                                <Link to="/dashboard/overview">
                                    <div className="w-[66px] h-[62px] bg-[#de9940] flex items-center justify-center rounded-lg">
                                        <i className="bi bi-bar-chart-line text-[39px] text-white"></i>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`flex items-center justify-evenly ${location.pathname === "/dashboard/enrolled" ? "border-l-[5px]" : ""
                                    }`}
                            >
                                <Link to="/dashboard/enrolled">
                                    <div className="w-[66px] h-[62px] flex items-center bg-[#de9940] justify-center rounded-lg">
                                        <i className="bi bi-list text-[39px] text-white"></i>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`flex items-center justify-evenly ${location.pathname === "/dashboard/study-material" ? "border-l-[5px]" : ""
                                    }`}
                            >
                                <Link to="/dashboard/study-material">
                                    <div className="w-[66px] h-[62px] flex items-center bg-[#de9940] justify-center rounded-lg">
                                        <i className="bi bi-list text-[39px] text-white"></i>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
