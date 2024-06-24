import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "./Loaders";

import {
    CSidebar,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CNavGroup,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CButton
} from "@coreui/react";

import { NavLink } from "react-router-dom";
import {
    cilUser,
    cilCalendar,
    cilArrowCircleBottom,
    cilFlagAlt,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const AppSidebar = () => {
    const navigate=useNavigate()
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);

    const [isAdmin, setIsAdmin] = useState(false);
    const [visible,setVisible] = useState(false);
    const [pageloading,setpageloading] = useState(true)


    useEffect(() => {
        (async function () {
            const res = await axiosInstance({
                method: "get",
                url: `${apiUrl}/api/isAdmin`,
            });
            setIsAdmin(res.data.isAdmin);
            setpageloading(false)
        })();
    }, []);

    const handleLogout=()=>{
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
    return !pageloading?
    (
      <>
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: "set", sidebarShow: visible });
            }}>
            <CSidebarHeader className="border-bottom">
              <div className="img-thumbnail-container">
                <img src="/logo.svg" alt="123" className="img-thumbnail" onClick={()=>navigate('/')}/>
              </div>
            </CSidebarHeader>
            <CSidebarNav>
                <CNavTitle>Hresque</CNavTitle>
                <CNavItem>
                    <NavLink to="/dashboard/profile" className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilUser} />{" "}
                        Profile
                    </NavLink>
                </CNavItem>
                {isAdmin !== "admin" && (
                    <>
                        <CNavItem>
                            <NavLink to="/dashboard" end className="nav-link">
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilCalendar}
                                />{" "}
                                Attendance
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/checkin" className="nav-link">
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilArrowCircleBottom}
                                />{" "}
                                Checkin
                            </NavLink>
                        </CNavItem>
                    </>
                )}

                {isAdmin === "admin" && (
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilFlagAlt}
                                />{" "}
                                Admin
                            </>
                        }>
                        <CNavItem >
                          <NavLink to={"/dashboard/admin"} className={"nav-link"} end>
                            <span className="nav-icon">
                                <span className="nav-icon-bullet"></span>
                            </span>{" "}
                            Employees
                          </NavLink>
                        </CNavItem>
                        {/* <CNavItem>
                          <NavLink to={"/dashboard/admin/register"} className={"nav-link"} end>
                              <span className="nav-icon">
                                  <span className="nav-icon-bullet"></span>
                              </span>{" "}
                              Register Employee
                          </NavLink>
                        </CNavItem> */}
                    </CNavGroup>
                )}
                <CNavItem>
                    <div className="nav-link" onClick={()=>setVisible(true)} style={{cursor:'pointer'}} >
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilArrowCircleBottom}
                        /> Logout 
                    </div>
                </CNavItem>
            </CSidebarNav>
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() =>
                        dispatch({
                            type: "set",
                            sidebarUnfoldable: !unfoldable,
                        })
                    }
                />
            </CSidebarFooter>
        </CSidebar>
        <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Logout</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to log out?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="info" onClick={handleLogout}>Log Out</CButton>
      </CModalFooter>
    </CModal>
      </>
    ):<PageLoader/>;
};

export default React.memo(AppSidebar);
