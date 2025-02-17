import { Link, useLocation } from "react-router-dom";
import "./components.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../context/Context.jsx"
import toast from "react-hot-toast";
import logo from "/logo.png"
import { URI } from "../../env.js";
function Navbar() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {

        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${URI}/validUser`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                const userFromLocalStorage = localStorage.getItem('user');
                setIsLoggedIn(!!userFromLocalStorage);
                setLoginData(res?.data?.validuser)
            } catch (error) {
                // toast.error(error.response?.data?.error || "something wents wrong");
                console.log(error.message);
                
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, [setLoginData]);

    return (<>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-xl">Study<span className="text-[#f48c06]">Mart</span></Link>
            </div>
            <div className="flex-none gap-12">
                <ul className="pagelinks menu menu-horizontal px-1 flex items-center justify-between">
                    <li className={`${location.pathname === '/' ? 'border-b-[3px] border-[#f48c06]' : ''}`}><Link to={"/"}>Home</Link></li>
                    <li className={`${location.pathname === '/all-cources' ? 'border-b-[3px] border-[#f48c06]' : ''}`}><Link to={"/all-cources"}>Cources</Link></li>
                    <li className={`${location.pathname === '/blog' ? 'border-b-[3px] border-[#f48c06]' : ''}`}><Link to={"/blog"}>Blog</Link></li>
                    <li className={`${location.pathname === '/about-us' ? 'border-b-[3px] border-[#f48c06]' : ''}`}><Link to={"/about-us"}>About</Link></li>
                    <li className={`${location.pathname === '/contact' ? 'border-b-[3px] border-[#f48c06]' : ''}`}><Link to={"/contact"}>Contact</Link></li>
                </ul>

                {
                    loading ? (<><span className="loading loading-dots loading-lg"></span></>) : (<>{null}</>)
                }
                {
                    loginData ? (<>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div >

                                    <div className="avatar">
                                        <div className=" rounded-full ">
                                            <img className="h-[59px] me-5" src={loginData?.image?.url} alt="" />

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu bg-white text-black menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to={"/userprofile"} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to={"/logout"}>Logout</Link></li>
                            </ul>
                        </div>
                    </>) : (<>

                        {
                            location.pathname === '/login' ? (<></>) : (<>
                                <ul className="auth  menu menu-horizontal flex px-1 flex items-center justify-between">
                                    <li className="flex  items-center justify-center"><Link to={"/login"}><div className="login font-medium bg-[#f48c06] text-white w-full h-full flex items-center justify-center">Login</div></Link></li>
                                </ul></>)
                        }

                    </>)
                }
            </div>
        </div>
    </>);
}

export default Navbar;