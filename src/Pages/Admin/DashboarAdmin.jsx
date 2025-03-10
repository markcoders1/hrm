import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import AnnouncementBox from "../../components/AnnouncementBox/AnnouncementBox";
import { Loader } from "../../components/Loaders";
import plusIcon from "../../assets/plusIcon.png";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/Employee.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Send } from 'lucide-react';
import SpinnerLoader from "../../components/SpinnerLoader";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const DashboardAdmin = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]); // Simulated employee data
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  const [announcementText, setAnnouncementText] = useState("");
  const [fetchAnnouncements, setFetchAnnouncements] = useState([]);
  const [fetchAttendanceDate, setAttendanceData] = useState([]);
  const [scrolling, setScrolling] = useState(false); 
  const [employeeActiveCoount , setEmployeeActiveCount] = useState(0);
  const [dateToday, setDateToday] = useState(Math.floor(new Date().getTime()));

  const [lengthOfEmplyee  , setLengthOfEmployee] = useState(null);

  useEffect(() => {
    setHeadertext("Dashboard");
    setParaText(" ");
    fetchAnnouncementsData();
    fetchTodatAttendanceData(dateToday);
  }, []);

  const fetchAnnouncementsData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/announcements`,
        method: "get",
      });
      setFetchAnnouncements(response.data.announcements);
      console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!announcementText.trim()) {
      return; // Don't add empty announcements
    }

    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/announcement`,
        method: "post",
        data: { message: announcementText },
      });
      // console.log(response)

      toast.success("Announcement Added Sucessfully");
      setFetchAnnouncements((prevAnnouncements) => [
        { _id: response.data._id, announcement: announcementText,   createdAt: new Date().toISOString()  }, // Adjust the key if necessary
        ...prevAnnouncements,
      ]);
    
      setAnnouncementText(""); // Clear the input after adding
      fetchAnnouncementsData()
    } catch (error) {
      console.error(error);
      toast.error("Error Adding Announcement");
    }
  };

  const handleDeleteAnnouncement = (announcementId) => {
    // Remove the deleted announcement from the state
    setFetchAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter(
        (announcement) => announcement._id !== announcementId
      )
    );
  };

  const fetchTodatAttendanceData = async (dateTimestamp) => {
    console.log(dateTimestamp)
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getToday`,
        method: "get",
        params: {
          date: dateTimestamp, 
        },
      });
      
      const dataAllEmployee = response.data.users;
      setLengthOfEmployee(response.data.users.length)
      setAttendanceData(dataAllEmployee);
      
      console.log(response);
     // Filter users with checkIn and set the count
     const activeUsersCount = dataAllEmployee.filter(user => user.checkIn && !user.checkOut).length;
    setEmployeeActiveCount(activeUsersCount);
    } catch (error) {
      console.error(error);
    } 
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes} ${ampm}`;
  };

  const customFormatTime = (t) => {
    const dateObject = new Date(t)
    const utcMinutes = dateObject.getUTCMinutes().toString().padStart(2, '0')  // Convert to string first
    const timetooutput = `${dateObject.getUTCHours()}:${utcMinutes}`
    return timetooutput
  }
  const handleScroll = () => {
    setScrolling(true);
    setTimeout(() => setScrolling(false), 1500); // Hide scrollbar after 1.5 seconds of inactivity
  };  

  const calculateDuration = (checkInTime) => {
    if (!checkInTime) return "-- --";
  
    const now = new Date();
    const checkInDate = new Date(checkInTime);
  
    const diffMs = now - checkInDate; // Difference in milliseconds
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Hours
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
  

    const totalMinutes = diffHours * 60 + diffMinutes;
    const formattedHour = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;
  
 
    const displayHour = formattedHour.toString().padStart(2, "0");
  
    return `${displayHour}:${formattedMinutes.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAttendanceData((prevData) => [...prevData]);
    }, 60000); 
  
    return () => clearInterval(intervalId); 
  }, []);

  if (loading) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
      >
        <Typography
          sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
        >
          {`Active Users (${employeeActiveCoount})`}
        </Typography>
        <Typography
          sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
        >
          {new Date()
            .toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          justifyContent: "space-between",
          flexDirection: {
            md: "row",
            xs: "column",
          },
        
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexBasis: "50%" }}>
          {loading ? (
            <Box className="loaderContainer">
              <Loader />
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              onScroll={handleScroll}
              sx={{
                boxShadow: "none",
                border: "none",
                mt: "-14px",
                maxHeight: "75vh", // Limit height to make the table scrollable
                overflowY: "scroll", // Enable vertical scroll with smooth scrolling
                "&::-webkit-scrollbar": {
                  width: "0px", // Set width to 0 to hide the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f0f0f0",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#bdbdbd",
                  borderRadius: "0px",
                },
                "&:hover::-webkit-scrollbar": {
                  width: "0px", // Show scrollbar width on hover
                },
                "&:hover::-webkit-scrollbar-thumb": {
                  background: "#bdbdbd", // Optional: change thumb color on hover
                },
                transition: "scroll 0.3s ease", // Smooth scrolling effect
              }}
            

            >
              <Table sx={{  width:"100%"}}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      "&:hover": {
                        backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      },
                      position:"sticky",
                      top:"10px",
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
                        color: "#010120 !important",
                        paddingLeft: "40px",
                        minWidth:"300px"
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
                        color: "#010120  !important",
                        minWidth:"100px"

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
                        color: "#010120  !important",
                        borderRadius: "0px 8px 8px 0px",
                        minWidth:"100px"

                      }}
                    >
                      Duration
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchAttendanceDate.map((employee, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          hoveredRow === index ? "#D1E4FF" : "inherit",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
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
                          <Box sx={{ width: "50px", height: "50px" }}>
                            <img
                              src={employee.image}
                              style={{
                                borderRadius: "50%",
                                width: "100%",
                                height: "100%",
                              }}
                              alt=""
                            />
                          </Box>
                          <Typography sx={{ ml: "10px", textAlign:"start !important" }}>
                            {employee.fullName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {employee?.checkIn ? formatTime(employee?.checkIn) : "-- -- "}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                          borderRadius: "0px 8px 8px 0px",
                        }}
                      >
                        {employee?.totalDuration 
    ? customFormatTime(employee?.totalDuration) // Display totalDuration if present
    : employee?.checkIn 
      ? calculateDuration(employee?.checkIn)  // Otherwise, calculate duration in real-time
      : "-- --"}
       {/* {employee?.totalDuration ?customFormatTime(employee?.totalDuration) : "-- --"} */}
                   
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Box
          sx={{
            flexBasis: "50%",
            backgroundColor: "#010120",
            color: "white",
            p: "24px 0px 24px 17px",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
              Announcement
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "55vh",
              overflowX: "hidden",
              padding: "20px 15px 20px 0px",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#9292D0",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#157AFF",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#9292D0",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CustomInputLabel
                multiline="true"
                height={"150px"}
                border={false}
                bgcolor="#272741"
                color="white"
                fontSize="14px"
                value={announcementText}
                paddingInput={"0px"}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
              <Tooltip title="Add">
                <Box
                  sx={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "#157AFF",
                    position: "absolute",
                    right: "10px",
                    bottom: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p:"10px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease", // Smooth transition for hover effect
                    "&:hover": {
                      backgroundColor: "#0e5bb5", // Darker shade on hover
                    },
                  }}
                  onClick={handleAddAnnouncement}
                >
                     <Send />
                </Box>
              </Tooltip>
            </Box>
            {fetchAnnouncements.map((announcement, index) => (
              <AnnouncementBox
                key={index}
                id={announcement._id}
                announcementContent={announcement.announcement}
                announcementDate={announcement.createdAt}
                announcementAuthor={announcement.author}
                onDelete={handleDeleteAnnouncement}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardAdmin;
