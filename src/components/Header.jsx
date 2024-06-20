import { Box } from '@mui/material';
import React from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { toggleSidebar } from "../Redux/toggleSidebar.js"; // Correct import
import { useDispatch } from 'react-redux';
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [refreshToken, setRefreshToken] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDispatchToggleFunc = () => {
        dispatch(toggleSidebar());
    };

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

    return (
        <Box className='Top-header'
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 40px",
               
                // border: "2px solid red",
                // alignItems:"center"
                
            }}
        >
            <Box className="hamberger-div"
                sx={{
                    fontSize: "2.5rem",
                    cursor: "pointer"
                }}
            >
                <IoMenuOutline 
                    onClick={handleDispatchToggleFunc}
                />
            </Box>
            <Box className="profile-image"
                sx={{
                    
                    display: "flex",
                    gap:"4rem",
                    alignItems:"center",
                    justifyContent:"center"
                   
                }}
            >
                <p
                style={{
                    fontSize:"1.7rem",
                    fontWeight:"600",
                    color:"#034F75",
                    cursor:"pointer",
                    marginTop:"10px",
                    fontWeight:"700"
                   

                }}
                onClick={handleLogout}
                >Logout</p>
                <img src=""
                style={{
                    borderRadius: "50%",
                    backgroundColor:"blue",
                    height:"50px",
                    width:"50px"


                }}
                alt="Profile"
                />
            </Box>
        </Box>
    );
}

export default Header;
