import React, { useEffect, useState } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import deleteIconWhite from '../../assets/deleteIconWhite.png';
import axiosInstance from '../../auth/axiosInstance';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AnnouncementBox = ({ announcementContent, id, onDelete , announcementDate}) => {



  const [isAdmin , setIsAdmin]=  useState();
  const deleteAnnouncement = async (id) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/announcement`,
        method: 'delete',
        params: {
          announcementId: id,
        },
      });

      console.log('Delete response:', response.data);

      // Call the callback passed from the parent to update the list of announcements
      onDelete(id);
      toast.success(response.data.message);

    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  useEffect(()=>{
    (async function(){
        const res =await axiosInstance({
            method:"get",
            url:`${apiUrl}/api/isAdmin`,
        })
        // console.log("==================",res.data)
        setIsAdmin(res.data.isAdmin)
    })()
},[])
const formatToCustomDate = (createdAt) => {
  const date = new Date(createdAt);

  // Get each component of the date
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  // Construct the formatted date string
  return `${weekday}, ${month} ${day}, ${formattedHour}:${minutes}${ampm}`;
};


  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: '#272741',
          borderRadius: '8px',
          minHeight: '150px',
          height: '100%',
          p: '15px 20px',
          overflowY: 'auto',
          fontSize: '14px',
        }}
      >
        {announcementContent}
      <Typography
      sx={{
        position:"absolute",
        bottom:"10px",
        color:"rgba(255, 255, 255, 1)",
        fontWeight:"500",
        fontFamily:"poppins",
        fontSize:"14px"
      }}
      >
      {formatToCustomDate(announcementDate)}
      </Typography>
      </Box>
     
          {
            isAdmin === "HOD" ? 
            <Tooltip title="Delete">
            <Box
              sx={{
                width: '29px',
                height: '29px',
                borderRadius: '50%',
                backgroundColor: '#157AFF',
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                '&:hover': {
                  backgroundColor: '#0e5bb5', // Darker shade on hover
                },
              }}
              onClick={() => deleteAnnouncement(id)}
            >
              <img src={deleteIconWhite} alt="Delete Icon" style={{ width: '13px', height: '13px' }} />
              </Box>
              </Tooltip>
            : ""
          }
    </Box>
  );
};

export default AnnouncementBox;
