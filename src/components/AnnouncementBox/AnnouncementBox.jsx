import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import deleteIconWhite from '../../assets/deleteIconWhite.png'
const AnnouncementBox = ({announcementContent}) => {
  return (
    <Box sx={{position:"relative"}} >
    <Box 
    sx={{
        backgroundColor:"#272741",
        borderRadius:"8px",
        minHeight:"150px", height:"100%",
        p:"15px 20px",
        overflowY:"auto",
        fontSize:"14px"
    }}
    >
       {announcementContent}
    </Box>
     <Tooltip title="Delete">
     <Box
       sx={{
         width: "29px",
         height: "29px",
         borderRadius: "50%",
         backgroundColor: "#157AFF",
         position: "absolute",
         right: "10px",
         bottom: "10px",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         cursor: "pointer",
         transition: "background-color 0.3s ease", // Smooth transition for hover effect
         "&:hover": {
           backgroundColor: "#0e5bb5", // Darker shade on hover
         },
       }}
     >
       <img src={deleteIconWhite} alt="Add Icon" style={{ width: "13px", height: "13px" }} />
     </Box>
   </Tooltip>
   </Box>
  )
}

export default AnnouncementBox