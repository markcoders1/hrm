import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import AnnouncementBox from '../../components/AnnouncementBox/AnnouncementBox';
import CustomButton from '../../components/CustomButton/CustomButton';
import '../../PagesCss/Employee.css'
import { Loader } from '../../components/Loaders';

const DashboardAdmin = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]); // Simulated employee data
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  useEffect(() => {
    setHeadertext("Dashboard");
    setParaText(" ");

    setTimeout(() => {
      setAllEmployee([
        { fullName: "M. Aman Raza", checkIn: "10:15 PM", duration: "8:36", image: "https://media.istockphoto.com/id/1475804411/photo/smiling-young-hispanic-self-employed-woman-standing-in-studio-with-laptop-in-hand.jpg?s=2048x2048&w=is&k=20&c=Af6bFq0NsqVk3mQ-XewQPoEdKGkGuKJ6WOdcvvOV7Gs=" },
        { fullName: "Syed Muzammil", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Muzammil Mansoori", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Ammad Ullah Khan", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Uzaima Iftikhar", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Huzefa Rana", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "M. Aman Raza", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Syed Muzammil", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Muzammil Mansoori", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Ammad Ullah Khan", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Uzaima Iftikhar", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
        { fullName: "Huzefa Rana", checkIn: "10:15 PM", duration: "8:36", image: "https://via.placeholder.com/38" },
      ]);
      setLoading(false);
    }, 1000);
  }, [setHeadertext, setParaText]);

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
      // border: "2px solid blue",
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
        {loading ? (
          <Box className="loaderContainer">
             <Loader />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none', mt:"-14px" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    "&:hover": {
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    },
                    padding: "0px",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "start",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      paddingLeft: "40px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                    }}
                  >
                    Check-In
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                      borderRadius: "0px 8px 8px 0px",

                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allEmployee.map((employee, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        hoveredRow === index ? "#D1E4FF" : "inherit", // Row hover color
                      transition: "background-color 0.3s ease",
                      cursor: "pointer", // Pointer cursor to indicate clickable rows
                    }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                   
                  >
                    <TableCell
                      sx={{
                        borderRadius: "8px 0px 0px 8px",
                        color: "#010120",
                        textAlign: "start !important",
                        paddingLeft: "40px !important",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{width: "50px", height: "50px", }} >
                           <img
                          src={employee.image}
                          style={{ borderRadius: "50%", width:"100%", height:"100%" }}
                          alt=""
                        /> </Box>
                        <Typography sx={{ ml: "10px" }}>{employee.fullName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {employee.checkIn}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      borderRadius: "0px 8px 8px 0px",

                      }}
                    >
                      {employee.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box sx={{
        flexBasis: "50%",
        backgroundColor: "#010120",
        color: "white",
        p: "24px 17px",
        borderRadius:"8px"
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
          <CustomButton
            ButtonText="Add +"
            fontSize="14px"
            color="white"
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            padding="5px 20px"
            background="#157AFF"
            hoverBg="#303f9f"
            hovercolor="white"
            type="button"
            width={"120px"}
            borderRadius="7px"
            buttonStyle={{ fontSize: { sm: "18px", xs: "15px" } }}
          />
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
