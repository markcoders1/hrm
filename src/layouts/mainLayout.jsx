import "../css/mainLayout.css";
import PNG from "/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";


const SingleLayout = () => {
    const [refreshToken, setRefreshToken] = useState(null);
    const navigate = useNavigate();

    
    const handleLogout = async () => {
        toast.success("You Have Successfully Logged Out");
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setRefreshToken(null);
        navigate("/");
    };

    useEffect(() => {
        const token = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
        setRefreshToken(token);
    }, []);


    const accessToken=sessionStorage.getItem("accessToken")

    return (
        <>
            <div className="dark-background"></div>
            <div className="dashboard-link">
                {
                    refreshToken ?
                        <>
                            <div className="dashboard-logo">
                                <img src="/logo.svg" alt="hi" onClick={()=>navigate('/')}/>
                            </div>
                            <div className="dashboard-buttons">
                                <NavLink to='/dashboard' replace >
                                    Dashboard
                                </NavLink>
                                <button onClick={handleLogout} >Logout</button>
                            </div>
                        </>
                        :
                        <>
                            <div className="dashboard-logo">
                                <img src="/logo.svg" alt="hi" onClick={()=>navigate('/')}/>
                            </div>
                            <div className="dashboard-buttons"></div>
                        </>
                }

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
