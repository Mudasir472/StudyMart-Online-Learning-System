import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../context/Context';

function Headbar() {
    const navigate = useNavigate();
    const { loginData, setLoginData } = useContext(LoginContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/validUser", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                const userFromLocalStorage = localStorage.getItem('user');
                setLoginData(res?.data?.validuser)
            } catch (error) {
                // toast.error(error.response?.data?.error || "something wents wrong");
            }
            
        }
        fetchUser();
    }, [setLoginData])

    const handleOptionClick = (option) => {
        if (option === 'profile') {
            navigate("/userprofile");
        } else if (option === 'logout') {
            handleLogout();
        }
        setDropdownVisible(false);
    };

    const handleLogout = () => {
        navigate("/logout");
    };
    return (
        <>
            <div className="headbar  bg-[#212832]  h-[73px] fixed top-0 left-0 w-full z-10">
                <div className="navbar bg-base-100 container mx-auto">
                    <div className="flex-1">
                        <a className="btn text-white btn-ghost text-xl">daisyUI</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className=" btn btn-ghost btn-circle avatar">
                                <div onClick={() => { setDropdownVisible(true)}} className="w-10 rounded-full">
                                    <img className="h-[59px] me-5" src={loginData?.image?.url} alt="" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to={'/userprofile'} onClick={() => { setDropdownVisible(false) }} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link onClick={() => { toggleDropdown }} to={'/logout'}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Headbar;
