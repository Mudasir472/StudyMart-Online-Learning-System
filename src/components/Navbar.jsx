import { Link } from "react-router-dom";
import "./components.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../context/Context.jsx"
import logo from "/logo.png"
function Navbar() {

    const [user, setUser] = useState(null);
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {

        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/validUser", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                const userFromLocalStorage = localStorage.getItem('user');
                setIsLoggedIn(!!userFromLocalStorage);
                setLoginData(res?.data?.validuser)
            } catch (error) {
                toast.error(error.response?.data?.error || "something wents wrong");
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
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/all-cources"}>Cources</Link></li>
                    <li><Link to={"/blog"}>Blog</Link></li>
                    <li><Link to={"/about-us"}>About</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
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
                        <ul className="auth  menu menu-horizontal flex px-1 flex items-center justify-between">
                            <li className="flex items-center justify-center"><Link to={"/login"}><div className="login w-full h-full flex items-center justify-center">Login</div></Link></li>
                            <li className="flex items-center justify-center"><Link to={"/signup"}><div className="signup w-full h-full flex items-center justify-center">Signup</div></Link></li>
                        </ul>
                    </>)
                }
            </div>
        </div>
    </>);
}

export default Navbar;