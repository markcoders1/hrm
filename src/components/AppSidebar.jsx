import { Outlet, NavLink } from "react-router-dom";
import "../css/layout.css";
import {
    CSidebar,
    CSidebarHeader,
    CNavLink,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CSidebarToggler,
    CNavGroup
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { cilPuzzle, cilArrowCircleBottom, cilCalendar, cilUser, cilFlagAlt } from "@coreui/icons";
import { useState, useEffect } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from '../Redux/toggleSidebar';
import { ImCross } from "react-icons/im";

const Layout = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [foldableTrue, setFoldableTrue] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDispatchToggleFunc = () => {
        dispatch(toggleSidebar());
    };

    useEffect(() => {
        (async function () {
            const res = await axiosInstance({
                method: "get",
                url: `${apiUrl}/api/isAdmin`,
            });
            setIsAdmin(res.data.isAdmin);
        })();
    }, []);

    const toggleMarginfunc = () => {
        setFoldableTrue(!foldableTrue);
    };

    return (
        <div className="layout-container">
            <CSidebar className={isSidebarOpen ? "border-bottom sidebar hide-sidebar" : "border-bottom sidebar toggleShowHide"} unfoldable={isSidebarOpen ? true : false || foldableTrue ? true : false} colorScheme="dark">
                <span
                    className="cross"
                    onClick={handleDispatchToggleFunc}><ImCross /></span>

                <CSidebarHeader id="logo" className="border-bottom">
                    <img src="/logo.svg" alt="123" className="img-thumbnail" />
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Hresque</CNavTitle>
                    <CNavItem>
                        <NavLink to="/dashboard/profile" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilUser} /> Profile
                        </NavLink>
                    </CNavItem>
                    {isAdmin !== "admin" && (
                        <CNavItem>
                            <NavLink to="/dashboard" end className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilCalendar} /> Attendance
                            </NavLink>
                        </CNavItem>
                    )}
                    {isAdmin !== "admin" && (
                        <CNavItem>
                            <NavLink to="/checkin" onClick={handleDispatchToggleFunc} className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilArrowCircleBottom} /> Checkin
                            </NavLink>
                        </CNavItem>
                    )}
                    {isAdmin === "admin" && (
                        <CNavItem>
                            <NavLink to="/dashboard/admin" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilFlagAlt} /> Admin
                            </NavLink>
                        </CNavItem>
                    )}
                </CSidebarNav>
                <CSidebarHeader className="border-top">
                    <CSidebarToggler onClick={toggleMarginfunc} />
                </CSidebarHeader>
            </CSidebar>
        </div>
    );
};

export default Layout;
