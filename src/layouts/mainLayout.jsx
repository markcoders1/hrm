import "../css/mainLayout.css";
import PNG from "/loginPNG.png";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import MainHeader from "../components/MainHeader";
import { Box, Typography } from "@mui/material";
import layoutImage from "../assets/VectorLayout.png"
import belowlayoutImage from "../assets/Vector 3.png"
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
    // <MainHeader accessToken={accessToken} setAccessToken={setAccessToken} />?
    return (
        <Box
            sx={{
                boxSizing: "border-box",
        
                
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                position: "relative",
                width: {
                    xs: "100vw",
                    sm: "100%",
                    md: "90%",
                },
                maxWidth: "1440px",
                maxHeight:"1000px",
                height:{
                    md:"100vh",
                    xs:"100vh"
                },
                minWidth: {
                    md: "400px"
                },
                position: "relative",  
                 
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    flexShrink: "1",
                    // backgroundImage: `url(${layoutImage})`,
                    backgroundPosition: "center", // Adjust this based on your preference
                    backgroundRepeat: "no-repeat", // Ensure the image does not repeat
                    backgroundAttachment: "fixed",
                    padding: {
                        xs:"0px",
                        md:"20px"
                    }, // Add padding to prevent content from touching the edges
                    // borderRadius:"90px"
                    // border: "2px solid red",
                    backgroundSize: "center",
                    background: {
                        xs: "linear-gradient(180deg, #010115 0%, #00003E 100%)",
                        md:"none"
                    }
                   
                }}
            >
                <img className="mainLayoutScreenImages" src={layoutImage} alt=""
                style={{
                    zIndex:"-2000",
                    position:"absolute",
                    width:"100%",
                    height:"90%"
                }}
                />
                <Box
                sx={{
                    zIndex:"2000",
                    // border:"2px solid red",
                }}
                >
                    <Box sx={{display:"flex", justifyContent:{
                        md:"end",
                        xs:"start"

                    }}} >
                        <Box sx={{width:{
                        md:"600px",
                        xs:"100%",
                        }, mr:{
                            md:"50px",
                            xs:"0px"
                        }, mt:"60px",
                       }} >
                            <Outlet context={setAccessToken} />
                        </Box>
                    </Box>
                
                </Box>
            </Box>
            <img className="mainLayoutScreenImages" src={belowlayoutImage} alt="" style={{
                position: "absolute",
                bottom: "70px",
                left: "35px",
                width: "41%",
                height:"100px"
            }} />
        </Box>
    );
};
export default SingleLayout;