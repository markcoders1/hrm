import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "./Loaders";
import { toast } from "react-toastify";

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
    cilLockLocked,
    cilGraph,
    cilLaptop,
    cilArrowCircleTop,
    cilRoom,
    cilPeople,
    cilNotes,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import UAParser from "ua-parser-js";

const parser = new UAParser()

const AppSidebar = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);
    const [isAdmin, setIsAdmin] = useState(false);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [logoutAllVisible, setLogoutAllVisible] = useState(false);

    const [pageloading, setPageloading] = useState(true);

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                const res = await axiosInstance.get(`${apiUrl}/api/isAdmin`);
                setIsAdmin(res.data.isAdmin);
                setPageloading(false);
            } catch (error) {
                console.error(error);
                setPageloading(false);
            }
        };
        checkIsAdmin();
    }, [apiUrl]);

    const handleLogout = () => {
        axiosInstance({
            url:`${apiUrl}/api/auth/logout`,
            method:'post',
            data:{
                refreshToken:sessionStorage.getItem('refreshToken'),
                deviceId:`${parser.getBrowser().name} | ${parser.getCPU().architecture} | ${parser.getOS().name}`
            }
        })
        sessionStorage.clear();
        localStorage.clear();
        navigate('/')
    };

    const handleLogoutAll=async ()=>{
        const response=await axiosInstance({
            url:`${apiUrl}/api/auth/logout-all-except`,
            method:'post',
            data:{
                refreshToken:sessionStorage.getItem('refreshToken'),
                deviceId:new UAParser().getUA()
            }
        })
        setLogoutAllVisible(false)
        toast.success(response.data.message)
    }


    return !pageloading ? (
        <>
            <CSidebar
                className="border-end small-screen"
                
                colorScheme="dark"
                position="fixed"
                unfoldable={unfoldable}
                visible={sidebarShow}
                onVisibleChange={(visible) => {
                    dispatch({ type: "set", sidebarShow: visible });
                }}
            >
                <CSidebarHeader className="border-bottom">
                    <div className="img-thumbnail-container">
                        <img src="/logo.svg" alt="123" className="img-thumbnail" onClick={() => navigate('/')} />
                    </div>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Hresque</CNavTitle>
                    <CNavItem>
                        <NavLink to="/dashboard/" end className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilUser} /> Profile
                        </NavLink>
                    </CNavItem>
                    {isAdmin !== "admin" && (
                        <>
                            <CNavItem>
                                <NavLink to="/dashboard/progress" end className="nav-link">
                                    <CIcon customClassName="nav-icon" icon={cilCalendar} /> Attendance
                                </NavLink>
                            </CNavItem>
                            <CNavItem>
                                <NavLink to="/checkin" className="nav-link">
                                    <CIcon customClassName="nav-icon" icon={cilArrowCircleBottom} /> Checkin
                                </NavLink>
                            </CNavItem>
                        </>
                    )}
                    {isAdmin === "admin" && (
                        <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilFlagAlt} /> Admin</>}>
                            <CNavItem>
                                <NavLink to={"/dashboard/admin"} className={"nav-link navItem"} end>
                                    <CIcon customClassName='nav-icon' icon={cilPeople} /> User Management
                                </NavLink>
                            </CNavItem>
                            <CNavItem>
                                <NavLink to={"admin/attendance"} className={"nav-link  navItem"} end>
                                <CIcon customClassName='nav-icon' icon={cilNotes} /> Attendance Record
                                </NavLink>
                            </CNavItem>
                        </CNavGroup>
                    )}
                    <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilLockLocked} /> Account</>}>
                        <CNavItem>
                            <div className="nav-link navItem" onClick={() => setLogoutAllVisible(true)} >
                                <CIcon customClassName="nav-icon" icon={cilArrowCircleTop} /> Logout Everywhere
                            </div>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to={"/dashboard/devices"} className="nav-link navItem" end>
                            <CIcon customClassName="nav-icon" icon={cilLaptop} /> logged in devices
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <div className="nav-link navItem" onClick={() => console.log("hi")} >
                                <CIcon customClassName="nav-icon" icon={cilGraph} /> Activity
                            </div>
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem>
                        <div className="nav-link" onClick={() => setLogoutVisible(true)} style={{ cursor: 'pointer' }}>
                            <CIcon customClassName="nav-icon" icon={cilRoom} /> Logout
                        </div>
                    </CNavItem>
                </CSidebarNav>
                <CSidebarFooter className="border-top d-none d-lg-flex">
                    <CSidebarToggler onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })} />
                </CSidebarFooter>
            </CSidebar>
            
            
            
            <CModal alignment="center" visible={logoutVisible} onClose={() => setLogoutVisible(false)} aria-labelledby="VerticallyCenteredExample">
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Logout</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to log out?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setLogoutVisible(false)}>Close</CButton>
                    <CButton color="info" onClick={handleLogout}>Log Out</CButton>
                </CModalFooter>
            </CModal>


            <CModal alignment="center" visible={logoutAllVisible} onClose={() => setLogoutAllVisible(false)} aria-labelledby="VerticallyCenteredExample">
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Logout</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to log out of all devices?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setLogoutAllVisible(false)}>Close</CButton>
                    <CButton color="info" onClick={handleLogoutAll}>Log Out</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : <PageLoader />;
};

export default AppSidebar;
