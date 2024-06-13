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
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Layout = () => {
    const [foldableTrue, setFoldableTrue] = useState(false);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    const toggleMarginfunc = () => {
        setFoldableTrue(!foldableTrue);
    };

    return (
        <div className="layout-container">
            <CSidebar className={isSidebarOpen ? "border-bottom sidebar hide-sidebar" : "border-bottom sidebar toggleShowHide"}  unfoldable={isSidebarOpen ? true : false || foldableTrue ? true : false} colorScheme="dark">
                <CSidebarHeader className="border-bottom">
                    <img src="/logo.svg" alt="123" className="img-thumbnail" />
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Hresque</CNavTitle>
                    <CNavItem>
                        <Link to="/checkin" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilArrowCircleBottom} /> Checkin
                        </Link>
                    </CNavItem>

                    <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilPuzzle} /> Admin </>}>
                        <CNavItem><Link to="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</Link></CNavItem>
                        <CNavItem><Link to="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</Link></CNavItem>
                    </CNavGroup>

                    <CNavItem>
                        <Link to="/dashboard" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCalendar} /> Attendance
                        </Link>
                    </CNavItem>
                    <CNavItem>
                        <Link to="/dashboard/profile" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilUser} /> Profile
                        </Link>
                    </CNavItem>
                    <CNavItem>
                        <Link to="/dashboard/admin" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilFlagAlt} /> Admin
                        </Link>
                    </CNavItem>
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
