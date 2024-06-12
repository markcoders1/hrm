import "../css/mainLayout.css";
import PNG from "/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SingleLayout = () => {
    const navigate = useNavigate();

    
    const handleLogout = async () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshToken');
        navigate("/");
    };

    const accessToken=sessionStorage.getItem("accessToken")

    return (
        <>
            <div className="dark-background"></div>
            <div className="dashboard-link">
                {
                    accessToken ?
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
