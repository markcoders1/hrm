import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/userSlice';
import './Header.css';

import { GoHome } from "react-icons/go";
import { RiAdminFill } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa6";

const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const isAdmin = user?.user?.user?.role

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/home")
    };

    useEffect(() => {
        console.log(isAdmin)
    }, [user]);

    const shouldShowHeader = !pathname.includes('/login');

    return (
        <>
            {shouldShowHeader ? (
                <div className="header-container">
                    <nav className="nav">
                        <div className="nav-left">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                                to="/home"
                            >
                                <span><pre><GoHome /></pre><pre>Home</pre></span>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                                to="/dashboard"
                            >
                                <span><pre><RiDashboardLine /></pre><pre>Dashboard</pre></span>
                            </NavLink>
                            {isAdmin === "admin" && (
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                                    to="/admin"
                                >
                                    <span><pre><RiAdminFill /></pre><pre>Admin</pre></span>
                                </NavLink>
                            )}
                        </div>
                        <div className="nav-right">
                            {user?.isAuthenticated ? (
                                <button id='logout' className="logout-button" onClick={handleLogout}>
                                    <span><FaPowerOff /></span><span>Logout</span>
                                </button>
                            ) : (
                                <NavLink
                                    id='logout' className="logout-button"
                                    to='login'
                                >
                                    <span><HiOutlineLogout /></span><span>Login</span>
                                </NavLink>
                            )}
                        </div>
                    </nav>
                </div>
            ) : null}
        </>
    );
};

export default Header;
