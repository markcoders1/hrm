import "./SingleLayout.css";
import { Outlet } from "react-router-dom";
import PNG from "../assets/loginPNG.png";

const SingleLayout = ({children}) => {

    return (
        <>
            <div className="dark-background"></div>
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
