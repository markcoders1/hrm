import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import "./Header.css";
import axiosInstance from "../../auth/axiosInstance";
import { GoCheckCircleFill } from "react-icons/go";
import { RiDashboardLine } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import logo from '../../assets/logo.svg'
import { RiAdminFill } from "react-icons/ri";


const Header = () => {
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin]=useState(false)

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    useEffect(()=>{
        (async function(){
            const res =await axiosInstance({
                method:"get",
                url:`${apiUrl}/api/isAdmin`,
            })
            console.log("res",res)
            setIsAdmin(res.data.isAdmin)
        })()
    },[])

    const handleLogout = async () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshToken');
        navigate("/");
    };


    return (
        <>
            <div className={isSidebarOpen ? "header-container sidebarToggleopen" : "header-container"}  >
                <div className="image-logo"  >
                    <img src={logo}
                        alt="" />
                </div>
                <nav className="nav">
                    <div className="nav-left">
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/checkin">
                            <span>
                                <pre><GoCheckCircleFill /></pre>
                                <pre>Check in!</pre>
                            </span>
                        </NavLink>
                        
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="profile" end>
                            <span>
                                <pre><FaUser /></pre>
                                <pre>Profile</pre>
                            </span>
                        </NavLink>
                        
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/dashboard" end>
                            <span>
                                <pre><RiDashboardLine /></pre>
                                <pre>Attendance</pre>
                            </span>
                        </NavLink>
                        {isAdmin === "admin" && (
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/dashboard/admin">
                                <span>
                                    <pre><RiAdminFill /></pre>
                                    <pre>Admin</pre>
                                </span>
                            </NavLink>
                        )}
                    </div>
                    <div className="nav-right">
                            <button
                                id="logout"
                                className="logout-button"
                                onClick={handleLogout}>
                                <span>
                                    <FaPowerOff />
                                </span>
                                <span>Logout</span>
                            </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
