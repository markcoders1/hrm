import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";


const MainHeader = ({accessToken}) => {

    const [refreshToken, setRefreshToken] = useState(null);
    // const [accessToken, setaccessToken] = useState(null);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)


    const handleLogout = async () => {
        toast.success("You Have Successfully Logged Out");
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setRefreshToken(null);
        setaccessToken(null)
        setVisible(false);
        navigate("/");
    };

    useEffect(() => {
        const token = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
        setRefreshToken(token);
        const accessTokenfromSessionStorage = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");

        

    }, []);
    return (
    <>
        <div className="dashboard-link">
            {
                refreshToken || accessToken ?
                    <>
                        <div className="dashboard-logo">
                            <img src="/logo.svg" alt="hi" onClick={() => navigate('/')} />
                        </div>
                        <div className="dashboard-buttons">
                            <NavLink to='/dashboard/profile' replace >
                                Dashboard
                            </NavLink>
                            <button onClick={() => setVisible(true)} >Logout</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="dashboard-logo">
                            <img src="/logo.svg" alt="hi" onClick={() => navigate('/')} />
                        </div>
                        <div className="dashboard-buttons"></div>
                    </>
            }
        </div>
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
    )
}

export default MainHeader