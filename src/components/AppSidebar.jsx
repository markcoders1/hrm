import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";
import hresquelogo from "../assets/hresquelogo.png";

import {
  CSidebar,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
} from "@coreui/react";
import { NavLink } from "react-router-dom";
import {
  cilUser,
  cilCalendar,
  cilFlagAlt,
  cilLockLocked,
  cilGraph,
  cilLaptop,
  cilArrowCircleTop,
  cilRoom,
  cilPeople,
  cilNotes,
  cilLockUnlocked,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import UAParser from "ua-parser-js";
import { Box, Typography } from "@mui/material";
import logoutIcon from "../assets/logoutIcon.png";
import { set } from "../sidebarSlice";
import { setFormDirty } from "../Redux/formSlice";

// importing icons for Admins

import dashboardIcon from "../assets/icons/dashboard.png";
import profileIcon from "../assets/icons/profile.png";
import userManaIcon from "../assets/icons/userManagement.png";
import attenfanceManaIcon from "../assets/icons/attendanceManagement.png";
import leaveManaIcon from "../assets/icons/leaveManagement.png";
import wfhManaIcon from "../assets/icons/wfhManagement.png";
import notificationIcon from "../assets/icons/notification.png";

// import icons for User

import myAttendanceIcon from "../assets/icons/myAttendance.png";
import myLeaveIcon from "../assets/icons/myleave.png";
import remoteWorkIcon from "../assets/icons/remotework.png";

const parser = new UAParser();

const CustomNavLink = ({ children, ...props }) => {
  const formDirty = useSelector((state) => state.form.isFormDirty);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (formDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes, are you sure you want to leave this page?"
      );
      if (confirmLeave) {
        dispatch(setFormDirty(false));
      }
      if (!confirmLeave) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <NavLink {...props} onClick={handleClick}>
        {children}
      </NavLink>
    </>
  );
};

const AppSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const formDirty = useSelector((state) => state.form.isFormDirty);
  const count = useSelector((state) => state.counter.count);


  const [isAdmin, setIsAdmin] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [logoutAllVisible, setLogoutAllVisible] = useState(false);
  const [pageloading, setPageloading] = useState(true);

  const user = useSelector(state => state.user.user.role)
  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const res = await axiosInstance.get(`${apiUrl}/api/isAdmin`);
        setIsAdmin(res.data.isAdmin);
        setPageloading(false);
        console.log("=================================> dirty form", formDirty);
console.log(user)

      } catch (error) {
        console.error(error);
        setPageloading(false);
      }
    };
    checkIsAdmin();
  }, [apiUrl]);

  const handleLogout = () => {
    axiosInstance({
      url: `${apiUrl}/api/auth/logout`,
      method: "post",
      data: {
        refreshToken: sessionStorage.getItem("refreshToken"),
        deviceId: `${parser.getBrowser().name} | ${
          parser.getCPU().architecture
        } | ${parser.getOS().name}`,
      },
    });
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  const handleLogoutAll = async () => {
    const response = await axiosInstance({
      url: `${apiUrl}/api/auth/logout-all-except`,
      method: "post",
      data: {
        refreshToken: sessionStorage.getItem("refreshToken"),
        deviceId: new UAParser().getUA(),
      },
    });
    setLogoutAllVisible(false);

    toast.success(response.data.message);
  };

  const handleClick = (e) => {
    if (formDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes, are you sure you want to leave this page?"
      );
      if (!confirmLeave) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <CSidebar
        className="custom-sidebar"
        colorScheme="dark"
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch(set({ sidebarShow: visible }));
        }}
        style={{ position: "relative", border: "1px solid red !important" }}
      >
        <CSidebarHeader>
          <div className="img-thumbnail-container">
            <img
              src={hresquelogo}
              style={{ width: "120px", height: "42px", margin: "auto" }}
              alt="Logo"
            />
          </div>
        </CSidebarHeader>
        <CSidebarNav className="nav-top">
          {user == "user" || user == "TL" ? (
            <>
              <CNavItem>
                <CustomNavLink to="/dashboard" end className="nav-link">
                  &nbsp;{" "}
                  <img
                    src={dashboardIcon}
                    alt=""
                    style={{ width: "17.77px", height: "17.75px" }}
                  />{" "}
                  &nbsp;&nbsp; Dashboard
                </CustomNavLink>
              </CNavItem>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/my-attendance"
                  end
                  className="nav-link"
                >
                  &nbsp;{" "}
                  <img
                    src={myAttendanceIcon}
                    alt=""
                    style={{ width: "18.38px", height: "22.75px" }}
                  />{" "}
                  &nbsp;&nbsp; My Attendance
                </CustomNavLink>
              </CNavItem>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/my-leaves"
                  end
                  className="nav-link"
                >
                  &nbsp;{" "}
                  <img
                    src={myLeaveIcon}
                    alt=""
                    style={{ width: "21.42px", height: "16.41px" }}
                  />{" "}
                  &nbsp;&nbsp; My Leaves
                </CustomNavLink>
              </CNavItem>
              <CNavItem>
                <NavLink to="/dashboard/remote-work" end className="nav-link">
                  &nbsp;{" "}
                  <img
                    src={remoteWorkIcon}
                    alt=""
                    style={{ width: "22.49px", height: "22.48px" }}
                  />{" "}
                  &nbsp;&nbsp; Remote Work
                </NavLink>
              </CNavItem>
            </>
          ) : (
            ""
          )}

          {user === "HOD" ? (
            <>
              <CNavItem>
                <CustomNavLink to="/dashboard/admin" className="nav-link" end>
                  &nbsp;{" "}
                  <img
                    src={dashboardIcon}
                    alt=""
                    style={{ width: "17.77px", height: "17.75px" }}
                  />{" "}
                  &nbsp;&nbsp; Dashboard
                </CustomNavLink>
              </CNavItem>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/attendance"
                  className="nav-link"
                  end
                >
                  <img
                    src={attenfanceManaIcon}
                    alt=""
                    style={{ width: "27.21px", height: "28.16px" }}
                  />{" "}
                  &nbsp; Attendance Management
                </CustomNavLink>
              </CNavItem>

              {/* <CNavItem>
            <NavLink to="/dashboard/notifications" end className="nav-link">
            <CIcon className="nav-icon" icon={cilUser} /> Notifications
            </NavLink>
            </CNavItem> */}
            </>
          ) : (
            ""
          )}
          {/* <CNavGroup
            toggler={
              <>
                <CIcon className="nav-icon" icon={cilLockLocked} />{" "}
                Account
              </>
            }
          >
            <CNavItem>
              <div className="nav-link" onClick={() => setOpen(true)}>
                <CIcon className="nav-icon" icon={cilLockUnlocked} />{" "}
                Change Password
              </div>
            </CNavItem>
            <CNavItem>
              <div
                className="nav-link"
                onClick={() => setLogoutAllVisible(true)}
              >
                <CIcon className="nav-icon" icon={cilArrowCircleTop} />{" "}
                Logout Everywhere
              </div>
            </CNavItem>
            <CNavItem>
              <NavLink to="/dashboard/devices" className="nav-link" end>
                <CIcon className="nav-icon" icon={cilLaptop} /> Logged in
                Devices
              </NavLink>
            </CNavItem>
            <CNavItem>
              <div className="nav-link" onClick={() => console.log("hi")}>
                <CIcon className="nav-icon" icon={cilGraph} /> Activity
              </div>
            </CNavItem>
          </CNavGroup> 
           */}
          {/* grouping tl , user  admin */}

          {user === "HOD" || user === "TL" ? (
            <>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/leave-management"
                  className="nav-link"
                  end
                >
                  <img
                    src={leaveManaIcon}
                    alt=""
                    style={{ width: "27.02px", height: "16.75px" }}
                  />{" "}
                  &nbsp; Leave Management
                </CustomNavLink>
              </CNavItem>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/wfh-management"
                  className="nav-link"
                  end
                >
                  <img
                    src={wfhManaIcon}
                    alt=""
                    style={{ width: "28.53px", height: "27.89px" }}
                  />{" "}
                  &nbsp; WFH Management
                </CustomNavLink>
              </CNavItem>
            </>
          ) : (
            ""
          )}

          {user === "HOD" ? (
            <>
              <CNavItem>
                <CustomNavLink
                  to="/dashboard/user-management"
                  className="nav-link"
                  end
                >
                  &nbsp;&nbsp;
                  <img
                    src={userManaIcon}
                    alt=""
                    style={{ width: "22.8px", height: "27.88px" }}
                  />{" "}
                  &nbsp; User Management
                </CustomNavLink>
              </CNavItem>
            </>
          ) : (
            ""
          )}
          <>
            <CNavItem>
              <CustomNavLink to="/dashboard/profile" end className="nav-link">
                &nbsp;&nbsp;
                <img
                  src={profileIcon}
                  alt=""
                  style={{ width: "17.97px", height: "23.09" }}
                />{" "}
                &nbsp; My Profile
              </CustomNavLink>
            </CNavItem>
            <CNavItem>
              <CustomNavLink
                to="/dashboard/notifications"
                end
                className="nav-link"
                style={{ position: "relative" }}
              >
                &nbsp;&nbsp;
                <img
                  src={notificationIcon}
                  alt=""
                  style={{ width: "19.52px", height: "22.22" }}
                />{" "}
                &nbsp; Notifications{" "}
                {count >= 1 ? (
                  <span
                    style={{
                      position: "absolute",
                      right: "30px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {count}
                  </span>
                ) : (
                  ""
                )}
              </CustomNavLink>
            </CNavItem>
            <CNavItem>
              <div
                className="nav-link"
                onClick={() => setLogoutVisible(true)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <img
                  className="nav-icon"
                  style={{ width: "20.5px", height: "20.5px" }}
                  src={logoutIcon}
                />{" "}
                <Typography sx={{ fontSize: "22px !important" }}>
                  Logout
                </Typography>
              </div>
            </CNavItem>
          </>
          <Box
          // sx={{
          //   position: "absolute",
          //   bottom: "40px",
          //   width: "260px",
          // }}
          ></Box>
        </CSidebarNav>
        {/* <CSidebarFooter className="d-none d-lg-flex">
                    <CSidebarToggler onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })} />
                </CSidebarFooter> */}
      </CSidebar>

      <CModal
        alignment="center"
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Logout</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to log out?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLogoutVisible(false)}>
            Close
          </CButton>
          <CButton color="info" onClick={handleLogout}>
            Log Out
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        visible={logoutAllVisible}
        onClose={() => setLogoutAllVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Logout</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to log out of all devices?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLogoutAllVisible(false)}>
            Close
          </CButton>
          <CButton color="info" onClick={handleLogoutAll}>
            Log Out
          </CButton>
        </CModalFooter>
      </CModal>

      <ChangePasswordModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default AppSidebar;
