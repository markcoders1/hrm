import "../css/mainLayout.css";
import PNG from "/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import MainHeader from "../components/MainHeader";


const SingleLayout = () => {
    // const [refreshToken, setRefreshToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    // const navigate = useNavigate();
    // const [visible, setVisible] = useState(false)


    // const handleLogout = async () => {
    //     toast.success("You Have Successfully Logged Out");
    //     sessionStorage.removeItem('accessToken');
    //     sessionStorage.removeItem('refreshToken');
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     localStorage.removeItem('userData');
    //     setRefreshToken(null);
    //     setVisible(false)
    //     // window.location.href = "/"
    //     navigate("/");
    // };

    // useEffect(() => {
    //     const token = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
    //     setRefreshToken(token);
    //     const accessTokenfromSessionStorage = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");

    //     setaccessToken(accessTokenfromSessionStorage)

    // }, [setRefreshToken, accessToken]);






    return (
        <>
            <div className="dark-background"></div>

            <MainHeader accessToken={accessToken} setAccessToken={setAccessToken} />
            <div className="form-container">
                <div className="form">
                    <div className="form-left">
                        <Outlet context={setAccessToken} />
                    </div>
                    <div className="form-right-image">
                        <img src={PNG} alt="" />
                        <div className="right-login-text"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleLayout;
