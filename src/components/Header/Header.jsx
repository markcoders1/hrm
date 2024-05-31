import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/userSlice";
import "./Header.css";

import { GoHome } from "react-icons/go";
import { RiAdminFill } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa6";
import logo from '../../assets/logo.svg'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isAdmin = user?.user?.user?.role;

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    };


    return (
        <>
            <div className="header-container">
                <div className="image-logo"  >

                    <img src={logo}
                    alt="" />
                </div>
                <nav className="nav">
                    <div className="nav-left">
                        <NavLink className={({isActive}) =>isActive? "nav-link active-link": "nav-link"} end to="/dashboard">
                            <span>
                                <pre><GoHome /></pre>
                                <pre>Dashboard</pre>
                            </span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link" } to="/dashboard/attendance">
                            <span>
                                <pre><RiDashboardLine /></pre>
                                <pre>Attendance</pre>
                            </span>
                        </NavLink>
                        {isAdmin === "admin" && (
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link" } to="/dashboard/admin">
                                <span>
                                    <pre><RiAdminFill /></pre>
                                    <pre>Admin</pre>
                                </span>
                            </NavLink>
                        )}
                    </div>
                    <div className="nav-right">
                        {user?.isAuthenticated ? (
                            <button
                                id="logout"
                                className="logout-button"
                                onClick={handleLogout}>
                                <span>
                                    <FaPowerOff />
                                </span>
                                <span>Logout</span>
                            </button>
                        ) : (
                            <NavLink
                                id="logout"
                                className="logout-button"
                                to="login">
                                <span>
                                    <HiOutlineLogout />
                                </span>
                                <span>Login</span>
                            </NavLink>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
