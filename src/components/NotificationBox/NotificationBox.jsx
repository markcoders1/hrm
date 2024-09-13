import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import crossIcon from '../../assets/cross.png'
// import {Icon} from '@mui/material';
import { MailTwoTone, DraftsTwoTone } from '@mui/icons-material';

const NotificationBox = ({notificationText, notificationDate, notificationLink, notificationisNew, notificationLinkType}) => {
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
        position:"relative",
        backgroundColor: notificationisNew ? "rgba(0,90,255,0.05)" : "rgba(0,90,255,0.00)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          width:"100%"
        }}
      >
        {notificationisNew?
          <MailTwoTone sx={{
          color:"rgba(0,90,255,0.5)",
          minWidth: "58px !important",
          minheight: "58px !important",
          maxHeight:"58px",
          maxWidth:"58px",
          margin:"auto 0",
          fontSize:"32px",
          }}/>
        :
          <DraftsTwoTone sx={{
          color:"rgba(0,90,255,0.5)",
          minWidth: "58px !important",
          minheight: "58px !important",
          maxHeight:"58px",
          maxWidth:"58px",
          margin:"auto 0",
          fontSize:"32px",
          }}/>
        }
        <Box>
          <Typography sx={{ fontFamily: "'Plus Jakarta Sans !important', sans-serif !important", fontWeight:"500", fontSize:{sm:"20px", xs:"16px"}, color:"#010120", width:"100%" }}>
            {notificationText}
          </Typography>
          <Typography sx={{ fontFamily: "'Plus Jakarta Sans !important', sans-serif !important" ,color:"#99999C", fontSize:"16px" }}>
            {notificationDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default NotificationBox;
