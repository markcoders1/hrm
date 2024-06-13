import { Box } from '@mui/material';
import React from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { toggleSidebar } from "../Redux/toggleSidebar.js"; // Correct import
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const handleDispatchToggleFunc = () => {
        dispatch(toggleSidebar());
    };

    return (
        <Box className='Top-header'
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 40px",
                backgroundColor: "beige"
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
                    border: "2px solid red",
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    bgcolor: "red",
                }}
            >
                <img src="" alt="Profile"
                />
            </Box>
        </Box>
    );
}

export default Header;
