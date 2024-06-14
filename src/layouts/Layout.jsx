import { Outlet, Link } from "react-router-dom";
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
import { useState,useEffect } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Admin from "../Pages/Admin";
import axiosInstance from "../auth/axiosInstance";



const Layout = () => {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [foldableTrue, setFoldableTrue] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    useEffect(() => {
        (async function () {
            const res = await axiosInstance({
                method: "get",
                url: `${apiUrl}/api/isAdmin`,
            })
            console.log("res", res)
            setIsAdmin(res.data.isAdmin)
            console.log(isAdmin)
        })()
    }, [])


    const toggleMarginfunc = () => {
        setFoldableTrue(!foldableTrue);
    };

    return (
        <div className="layout-container">
            <CSidebar className={isSidebarOpen ? "border-bottom sidebar hide-sidebar" : "border-bottom sidebar toggleShowHide"} unfoldable={isSidebarOpen ? true : false || foldableTrue ? true : false} colorScheme="dark">
                <CSidebarHeader id="logo" className="border-bottom">
                    <img src="/logo.svg" alt="123" className="img-thumbnail" />
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Hresque</CNavTitle>
                    {
                        isAdmin==="admin" ? "" :
                    <CNavItem>
                    <Link to="/checkin" className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilArrowCircleBottom} /> Checkin
                    </Link>
                </CNavItem>
                    }

                    {/* <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilPuzzle} /> Admin </>}>
                        <CNavItem><Link to="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</Link></CNavItem>
                        <CNavItem><Link to="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</Link></CNavItem>
                    </CNavGroup> */}
                    <CNavItem>
                        <Link to="/dashboard/profile" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilUser} /> Profile
                        </Link>
                    </CNavItem>
                    {
                        isAdmin==="admin" ? "" :
                    <CNavItem>
                        <Link to="/dashboard" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCalendar} /> Attendance
                        </Link>
                    </CNavItem>
                    }
                   {
                    isAdmin === "admin" ? 
                    <CNavItem>
                        <Link to="/dashboard/admin" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilFlagAlt} /> Admin
                        </Link>
                    </CNavItem> :
                    ""
                   }
                </CSidebarNav>
                <CSidebarHeader className="border-top">
                    <CSidebarToggler onClick={toggleMarginfunc} />
                </CSidebarHeader>
            </CSidebar>
            <div className={isSidebarOpen ? "outlet-box margin-small" : "outlet-box"} id={foldableTrue ? "foldable-sidebar" : ""}>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
