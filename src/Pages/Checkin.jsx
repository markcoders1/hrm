import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders.jsx";
import { scheduleNotification } from "../Helper/notificationHelper";
import { useOutletContext } from "react-router-dom";

//

import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import AnnouncementBox from "../components/AnnouncementBox/AnnouncementBox";
import CustomButton from "../components/CustomButton/CustomButton";
import { Box, Typography } from "@mui/material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Check = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingForCheckBtn, setLoadingForCheckBtn] = useState(false);
  const [loadingForBreakBtn, setLoadingForBreakBtn] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { setHeadertext, setParaText } = useOutletContext();

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
      setStatus(response.data.status);

      // Store check-in time
      // const checkInTime = new Date();
      // localStorage.setItem('checkInTime', checkInTime.toISOString());
      // console.log("Check-in time stored:", checkInTime.toISOString());
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

  // const handleNotifyMe = () => {
  //     // Schedule a notification for 40 seconds later
  //     scheduleNotification("It's been 5 seconds since you clicked notify me. Please take a break.", 5);
  // };

  useEffect(() => {
    requestNotificationPermission();
    setHeadertext("Dashboard");

    const getStatus = async () => {
      try {
        const response = await axiosInstance({
          method: "get",
          url: `${apiUrl}/api/getstatus`,
        });
        console.log(response);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
      // const location =  navigator.geolocation.getCurrentPosition((e) => {console.log(e)});
    };
    getStatus();
  }, []);

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
  }, []);

  const announcements = [
    {
      content:
        "We are excited to announce that our system will undergo scheduled maintenance this weekend to enhance overall performance and security. Please ensure you save your work and log out before the maintenance begins to avoid any potential data loss or disruptions.",
    },
    {
      content:
        "Next week, we will be releasing new features designed to significantly improve user experience and functionality. These updates are based on your valuable feedback, and we’re confident that you’ll find them beneficial in your daily tasks and workflows.",
    },
    {
      content:
        "Please be informed that our office hours will be changing starting next month. The new hours of operation will be from 9 AM to 5 PM, Monday through Friday. This change excludes public holidays, so please plan your schedules accordingly.",
    },
    {
      content:
        "It is crucial to update your contact information to ensure that you continue receiving important communications. Please take a moment to verify and update your details in the settings section of your profile by the end of this week.",
    },
    {
      content:
        "The holiday party RSVP deadline is approaching this Friday. Don’t miss out on the festivities! We encourage everyone to RSVP and confirm their attendance as soon as possible to help us finalize the event’s preparations and arrangements effectively.",
    },
    {
      content:
        "Effective immediately, we have implemented new health and safety guidelines to ensure a safe working environment for all. Please familiarize yourself with these guidelines and strictly adhere to the protocols to protect yourself and your colleagues.",
    },
  ];

  const CheckButtons = () => (
    <>
     
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleCheck}
        disabled={loadingForCheckBtn}
      >
        {loadingForCheckBtn ? (
          <LoaderW />
        ) : status === "checki-in" || status === "inbreak" ? (
          "Check Out"
        ) : (
          "Check-In"
        )}
      </button>
      {/* {status === "checkout" ? null : (
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleBreak}
          disabled={loadingForBreakBtn}
        >
          {loadingForBreakBtn ? (
            <LoaderW />
          ) : status === "check-In" ? (
            "Break In"
          ) : (
            "Break Out"
          )}
        </button>
      )} */}
      {/* <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px"
                }}
                onClick={handleNotifyMe}
            >
                Notify Me
            </button> */}
    </>
  );

   {/* <div className="Home-container">
                <div className="check-container">
                  <div className="check-buttons">
                    <CheckButtons />
                  </div>
                </div>
              </div>
              */}

  return (
    <>

    {
        loading ? (
            <div className="loaderContainer">
            <Loader />
          </div> ) :(
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

                <Box sx={{  flexBasis: "50%",
                backgroundColor: "white ",}} >
                <CustomButton
                onClick={handleCheck}
                ButtonText={status === "checkin" ? "Checkout": "Check IN"}
                fullWidth={true}
                background="#157AFF"
                color="white"
               fontWeight="500"
               fontSize="32px"
               hoverBg="#303f9f"
               padding="26px 0px"
               borderRadius="12px"
                />
                </Box>
          
      
        
            <Box
              sx={{
                flexBasis: "50%",
                backgroundColor: "#010120",
                color: "white",
                p: "24px 17px",
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
              <Box
                sx={{
                  mt: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
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
         
          )

        
    }

  
    </>
  );
};

export default Check;
