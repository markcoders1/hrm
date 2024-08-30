import React from 'react';
import { Box, Typography } from '@mui/material';
import crossIcon from '../../assets/cross.png'

const NotificationBox = ({notificationText, notificationDate}) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(197, 197, 197, 0.6)",
        borderRadius: "10px",
        p: "38px 48px 38px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans !important', sans-serif !important" , // Applying the font here
        position:"relative"
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          width:"100%"
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E0EBFF",
            minWidth: "58px !important",
            minheight: "58px !important",
            borderRadius: "50%",
            maxHeight:"58px",
            maxWidth:"58px",
          

          }}
        ></Box>
        <Box>
          <Typography sx={{ fontFamily: "'Plus Jakarta Sans !important', sans-serif !important", fontWeight:"500", fontSize:{
            sm:"20px", xs:"16px"
                      }, color:"#010120", width:"100%" }}>
            {notificationText}
          </Typography>
          <Typography sx={{ fontFamily: "'Plus Jakarta Sans !important', sans-serif !important" ,color:"#99999C", fontSize:"16px" }}>
            {notificationDate}
          </Typography>
        </Box>
      </Box>
      {/* <Box sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif !important !important" , position:"absolute",
      top:"42px", right:"30px   " 
      }}> <img src={crossIcon} alt="" /> </Box> */}
    </Box>
  );
}

export default NotificationBox;
