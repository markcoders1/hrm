import "./SingleLayout.css";
import PNG from "../assets/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

const SingleLayout = () => {
    const [refreshToken, setRefreshToken] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        setRefreshToken(null);
        navigate("/");
        toast.success("You Have Successfully Logged Out");
    };

    useEffect(() => {
        const token = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
        setRefreshToken(token);
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="dark-background"></div>
            <div className="dashboard-link">
                {refreshToken ? (
                    <>
                        <NavLink to='/dashboard' replace>
                            Dashboard
                        </NavLink>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="form-container">
                <div className="form">
                    <div className="form-left">
                        <Outlet />
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
