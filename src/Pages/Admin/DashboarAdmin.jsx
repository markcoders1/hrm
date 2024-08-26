import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import AnnouncementBox from '../../components/AnnouncementBox/AnnouncementBox';

const DashboardAdmin = () => {
  const { setHeadertext, setParaText } = useOutletContext();

  useEffect(() => {
    setHeadertext("Dashboard");
    setParaText(" ");
  }, []);

  const announcements = [
    { content: "We are excited to announce that our system will undergo scheduled maintenance this weekend to enhance overall performance and security. Please ensure you save your work and log out before the maintenance begins to avoid any potential data loss or disruptions." },
    { content: "Next week, we will be releasing new features designed to significantly improve user experience and functionality. These updates are based on your valuable feedback, and we’re confident that you’ll find them beneficial in your daily tasks and workflows." },
    { content: "Please be informed that our office hours will be changing starting next month. The new hours of operation will be from 9 AM to 5 PM, Monday through Friday. This change excludes public holidays, so please plan your schedules accordingly." },
    { content: "It is crucial to update your contact information to ensure that you continue receiving important communications. Please take a moment to verify and update your details in the settings section of your profile by the end of this week." },
    { content: "The holiday party RSVP deadline is approaching this Friday. Don’t miss out on the festivities! We encourage everyone to RSVP and confirm their attendance as soon as possible to help us finalize the event’s preparations and arrangements effectively." },
    { content: "Effective immediately, we have implemented new health and safety guidelines to ensure a safe working environment for all. Please familiarize yourself with these guidelines and strictly adhere to the protocols to protect yourself and your colleagues." },
  ];
  
  return (
    <Box sx={{
      border: "2px solid blue",
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
      flexDirection: {
        md: "row",
        xs: "column"
      }
    }}>
      <Box sx={{
        flexBasis: "50%",
      }}>
        left table
      </Box>
      <Box sx={{
        flexBasis: "50%",
        backgroundColor: "#010120",
        color: "white",
        p: "24px 17px",
      }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>Announcement</Typography>
          <Typography>Add +</Typography>
        </Box>
        <Box sx={{ mt: "30px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <CustomInputLabel
            multiline="true"
            height={"150px"}
            border={false}
            bgcolor="#272741"
            color="white"
            fontSize="14px"
          />
          {announcements.map((announcement, index) => (
            <AnnouncementBox
              key={index}
              announcementContent={announcement.content}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardAdmin;
