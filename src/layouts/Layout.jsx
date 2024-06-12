import { Outlet,Link } from "react-router-dom"
import Header from "../components/Header"
import "../css/layout.css"
import { CSidebar,CSidebarHeader,CSidebarBrand,CNavLink,CSidebarNav,CNavTitle,CNavItem,CNavGroup,CSidebarToggler, CBadge } from "@coreui/react"
import CIcon from '@coreui/icons-react';
import { cilArrowCircleBottom,cilCalendar,cilUser,cilFlagAlt } from "@coreui/icons";

const Layout = () => {
    

    // return (<>
    //     <div className="BaseLayout">
    //         <div className="header-box">
    //             <Header />
    //         </div>
    //         <div className="Outlet">
    //             <Outlet />
    //         </div>
    //     </div>

    // </>)

    return(<>
        <CSidebar className="border-end" unfoldable={false} colorScheme="dark">
            <CSidebarHeader className="border-bottom">
                <img src="/logo.svg" alt="123" className="img-thumbnail"/>
            </CSidebarHeader>
            <CSidebarNav>
              <CNavTitle>Hresque</CNavTitle>
              <CNavItem href="/checkin"><CIcon customClassName="nav-icon" icon={cilArrowCircleBottom} /> Checkin</CNavItem>
              {/* <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilPuzzle} /> Admin </>}>
                <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
              </CNavGroup> */}
              <CNavItem><Link to="/dashboard" className="nav-item"><CIcon customClassName="nav-icon" icon={cilCalendar} /> Attendance</Link></CNavItem>
              <CNavItem href="/dashboard/profile"><CIcon customClassName="nav-icon" icon={cilUser} /> Profile</CNavItem>
              <CNavItem href="/dashboard/admin"><CIcon customClassName="nav-icon" icon={cilFlagAlt} /> Admin</CNavItem>
            </CSidebarNav>
            <CSidebarHeader className="border-top">
                <CSidebarToggler />
            </CSidebarHeader>
        </CSidebar>
        <Outlet />
    </>)
}

export default Layout