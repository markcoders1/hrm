import "./SingleLayout.css";
import PNG from "../assets/loginPNG.png";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userSlice";


const SingleLayout = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    
    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    };


    return (
        <>
            <div className="dark-background"></div>
            <div className="dashboard-link" >
                {
                    user.isAuthenticated ?
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
                        {children}
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
