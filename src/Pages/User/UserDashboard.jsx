import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import '../../PagesCss/Employee.css'

const DashboardAdmin = () => {
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



  return (
    <Box sx={{
      // border: "2px solid blue",
    
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
    
    </Box>
  );
}

export default DashboardAdmin;
