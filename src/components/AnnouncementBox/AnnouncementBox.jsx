import React from 'react'
import { Box, Typography } from '@mui/material'
const AnnouncementBox = ({announcementContent}) => {
  return (
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
  )
}

export default AnnouncementBox