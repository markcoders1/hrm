import "./SingleLayout.css";
import PNG from "../assets/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SingleLayout = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshToken');
        navigate("/");
        toast.success("You Have Successfully Logout")
    };

    const accessToken=sessionStorage.getItem("accessToken")

    return (
        <>
        <ToastContainer/>
            <div className="dark-background"></div>
            <div className="dashboard-link">
                {
                    accessToken ?
                        <>
                            <NavLink to='/dashboard' replace >
                                Dashboard
                            </NavLink>
                            <button onClick={handleLogout} >Logout</button>
                        </>
                        :
                        ""
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
