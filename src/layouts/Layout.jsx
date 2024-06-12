import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
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

const Layout = () => {
    return (
        <div 
        style={{
            display:"flex",
            // backgroundColor: "red",
            
        }}
        >
            <CSidebar className="border-end " unfoldable={true} colorScheme="dark"
            style={{
                height:"100vh"
            }}
            >
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
                    <CSidebarToggler  />
                </CSidebarHeader>
            </CSidebar>
            <div className="outley-box"
            style={
                {
                    width:"99%",
                    paddingLeft:"5rem"
                   
                }
            }>
            <Outlet />
            </div>

        </div>
    );
}

export default Layout;
