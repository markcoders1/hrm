import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders.jsx";
import { scheduleNotification } from "../Helper/notificationHelper";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Chart from "../components/Charts/Charts.jsx";
import "../PagesCss/Employee.css";

import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import AnnouncementBox from "../components/AnnouncementBox/AnnouncementBox";
import CustomButton from "../components/CustomButton/CustomButton";
import { Box, Tooltip, Typography } from "@mui/material";
import SpinnerLoader from "../components/SpinnerLoader.jsx";
import { Send } from "lucide-react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const formatTime = (val) => {
  const totalSeconds = Math.floor(val / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};

function unixTimestampToTime(UNIX_timestamp) {
  // console.log(UNIX_timestamp)
  var date = new Date(UNIX_timestamp);

  console.log(date.toString());

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var secends = date.getSeconds();

  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secends = secends < 10 ? "0" + secends : secends;
  var strTime = hours + ":" + minutes + ":" + secends + " " + ampm;

  return strTime;
}

const Check = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingForCheckBtn, setLoadingForCheckBtn] = useState(false);
  const [loadingForBreakBtn, setLoadingForBreakBtn] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { setHeadertext, setParaText } = useOutletContext();
  const [fetchAnnouncements, setFetchAnnouncements] = useState([]);
  const [time, setTime] = useState(0);
  const [checkTime, setCheckTime] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.user.role);
  const permissions = useSelector((state) => state?.user?.user?.permissions);
  const [fetchAttendanceDate, setAttendanceData] = useState([]);
  const [employeeActiveCoount, setEmployeeActiveCount] = useState(0);
  const [dateToday, setDateToday] = useState(Math.floor(new Date().getTime()));
  const [lengthOfEmplyee, setLengthOfEmployee] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  const hasCPN = permissions.includes("C-P-N-attendance");
  const hasRA = permissions.includes("R-A-attendance");

  // console.log(role)

  useEffect(() => {
    fetchTodatAttendanceData(dateToday);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const fetchAnnouncementsData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/announcements`,
        method: "get",
      });
      setFetchAnnouncements(response.data.announcements);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    }
  };
  const handleCheck = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },

        (error) => {
          console.error("Error getting location:", error);
        }
      );

      setLoadingForCheckBtn(true);

      const response = await axiosInstance({
        url: `${apiUrl}/api/check`,
        method: "post",
        data: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      console.log(latitude);
      console.log(longitude);

      console.log(response);
      toast.success(response.data.message);
      if (response.data.status === "checkin") {
        setTime(0);
      }
      if (response.data.checkIn) {
        setCheckTime(response.data.checkIn);
      }
      setStatus(response.data.status);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingForCheckBtn(false);
    }
  };

  const handleBreak = async () => {
    try {
      setLoadingForBreakBtn(true);
      const response = await axiosInstance({
        url: `${apiUrl}/api/break`,
        method: "post",
      });
      console.log(response);
      setStatus(response.data.status);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingForBreakBtn(false);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    setHeadertext("Dashboard");
    fetchAnnouncementsData();

    const getStatus = async () => {
      try {
        const response = await axiosInstance({
          method: "get",
          url: `${apiUrl}/api/getstatus`,
        });
        console.log("status", response);
        setStatus(response.data.status);
        if (response.data.time) {
          setCheckTime(response.data.time);
          // console.log("time",response.data.time)
          setTime(new Date().valueOf() - response.data.time);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
    getGraphData();
  }, []);

  const getGraphData = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${apiUrl}/api/graph`,
      });
      console.log("grapgh", response);
      setGraphData(response?.data?.graphdata);
      // setStatus(response.data.status);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const data = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 9 },
    { day: "Fri", value: 6 },
  ];

  // add anouncement feature for HR

  const [announcementText, setAnnouncementText] = useState("");

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
        {
          _id: response.data._id,
          announcement: announcementText,
          createdAt: new Date().toISOString(),
        }, // Adjust the key if necessary
        ...prevAnnouncements,
      ]);

      setAnnouncementText(""); // Clear the input after adding
      fetchAnnouncementsData();
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

  // attendance work start from here

  const fetchTodatAttendanceData = async (dateTimestamp) => {
    console.log(dateTimestamp);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getToday`,
        method: "get",
        params: {
          date: dateTimestamp,
        },
      });

      const dataAllEmployee = response.data.users;
      setLengthOfEmployee(response.data.users.length);
      setAttendanceData(dataAllEmployee);

      console.log(response);
      // Filter users with checkIn and set the count
      const activeUsersCount = dataAllEmployee.filter(
        (user) => user.checkIn && !user.checkOut
      ).length;
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
    const dateObject = new Date(t);
    const utcMinutes = dateObject.getUTCMinutes().toString().padStart(2, "0"); // Convert to string first
    const timetooutput = `${dateObject.getUTCHours()}:${utcMinutes}`;
    return timetooutput;
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
      {loading ? (
        <div className="loaderContainer">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "2rem",
              justifyContent: "space-between",
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            <Box
              sx={{
                flexBasis: "50%",
                backgroundColor: "white ",
              }}
            >
              {hasCPN && hasRA && (
                <Box>
                  <Box>
                    <CustomButton
                      onClick={handleCheck}
                      ButtonText={
                        status === "checkin" ? "Check Out" : "Check In"
                      }
                      fullWidth={true}
                      background="#157AFF"
                      color="white"
                      fontWeight="500"
                      fontSize="32px"
                      hoverBg="#303f9f"
                      padding="26px 0px"
                      borderRadius="12px"
                      buttonStyle={{
                        height: "10rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                      extraText={
                        status === "checkin"
                          ? `${unixTimestampToTime(checkTime)}`
                          : null
                      }
                    />

                    <Box
                      sx={{
                        mt: "30px",
                      }}
                    >
                      <Chart graphData={graphData} />
                    </Box>
                  </Box>
                </Box>
              )}

              {hasCPN && !hasRA && (
                <Box>
                  <Box>
                    <CustomButton
                      onClick={handleCheck}
                      ButtonText={
                        status === "checkin" ? "Check Out" : "Check In"
                      }
                      fullWidth={true}
                      background="#157AFF"
                      color="white"
                      fontWeight="500"
                      fontSize="32px"
                      hoverBg="#303f9f"
                      padding="26px 0px"
                      borderRadius="12px"
                      buttonStyle={{
                        height: "10rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                      extraText={
                        status === "checkin"
                          ? `${unixTimestampToTime(checkTime)}`
                          : null
                      }
                    />

                    <Box
                      sx={{
                        mt: "30px",
                      }}
                    >
                      <Chart graphData={graphData} />
                    </Box>
                  </Box>
                </Box>
              )}

              {!hasCPN && hasRA && (
                <Box>
                  <Box sx={{ flexBasis: "100%" }}>
                    {loading ? (
                      <Box className="loaderContainer">
                        <Loader />
                      </Box>
                    ) : (
                      <TableContainer
                        component={Paper}
                        // onScroll={handleScroll}
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
                        <Table sx={{ width: "100%" }}>
                          <TableHead>
                            <TableRow
                              sx={{
                                backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                "&:hover": {
                                  backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                },
                                position: "sticky",
                                top: "10px",
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
                                  minWidth: "300px",
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
                                  minWidth: "100px",
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
                                  minWidth: "100px",
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
                                    hoveredRow === index
                                      ? "#D1E4FF"
                                      : "inherit",
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
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
                                    <Typography
                                      sx={{
                                        ml: "10px",
                                        textAlign: "start !important",
                                      }}
                                    >
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
                                  {employee?.checkIn
                                    ? formatTime(employee?.checkIn)
                                    : "-- -- "}
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
                                    ? calculateDuration(employee?.checkIn) // Otherwise, calculate duration in real-time
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
                </Box>
              )}
            </Box>

            <Box
              sx={{
                flexBasis: "50%",
              }}
            >
              {status == "checkin" ? (
                <Box
                  sx={{
                    height: "10rem",
                    border: "2px solid rgba(170, 170, 170,0.5)",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "2rem",
                    fontSize: "2.5rem",
                  }}
                >
                  {formatTime(time)}
                </Box>
              ) : null}

              <Box
                sx={{
                  width: "100%",
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
                  {role == "HR" ? (
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
                            p: "10px",
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
                  ) : null}

                  {fetchAnnouncements.map((announcement, index) => (
                    <AnnouncementBox
                      key={index}
                      announcementContent={announcement.announcement}
                      announcementDate={announcement.createdAt}
                      announcementAuthor={announcement.author}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {employeeActiveCoount.length > 0 && (
            <Box
              sx={{
                marginTop: "140px",
              }}
            >
              <Box>
                {hasCPN && hasRA && (
                  <Box sx={{ flexBasis: "100%" }}>
                    {loading ? (
                      <Box className="loaderContainer">
                        <Loader />
                      </Box>
                    ) : (
                      <TableContainer
                        component={Paper}
                        // onScroll={handleScroll}
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
                        <Table sx={{ width: "100%" }}>
                          <TableHead>
                            <TableRow
                              sx={{
                                backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                "&:hover": {
                                  backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                },
                                position: "sticky",
                                top: "10px",
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
                                  minWidth: "300px",
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
                                  minWidth: "100px",
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
                                  minWidth: "100px",
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
                                    hoveredRow === index
                                      ? "#D1E4FF"
                                      : "inherit",
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
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
                                    <Typography
                                      sx={{
                                        ml: "10px",
                                        textAlign: "start !important",
                                      }}
                                    >
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
                                  {employee?.checkIn
                                    ? formatTime(employee?.checkIn)
                                    : "-- -- "}
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
                                    ? calculateDuration(employee?.checkIn) // Otherwise, calculate duration in real-time
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
                )}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Check;
