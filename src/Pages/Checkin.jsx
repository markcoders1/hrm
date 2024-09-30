import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders.jsx";
import { scheduleNotification } from "../Helper/notificationHelper";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

import Chart from "../components/Charts/Charts.jsx";
//

import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import AnnouncementBox from "../components/AnnouncementBox/AnnouncementBox";
import CustomButton from "../components/CustomButton/CustomButton";
import { Box, Typography } from "@mui/material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const formatTime = (val) => {
  const totalSeconds = Math.floor(val/1000)
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
 
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


function unixTimestampToTime(UNIX_timestamp) {
  // console.log(UNIX_timestamp)
  var date = new Date(UNIX_timestamp);

  console.log(date.toString())

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var secends = date.getSeconds();

  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secends = secends < 10 ? '0' + secends : secends;
  var strTime = hours + ':' + minutes + ':' + secends + ' ' + ampm;

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
  const [time,setTime] = useState(0)
  const [checkTime,setCheckTime] = useState(0)
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1000);
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
      if(response.data.status==="checkin"){
        setTime(0)
      }
      if(response.data.checkIn){
        setCheckTime(response.data.checkIn)
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
    fetchAnnouncementsData()

    const getStatus = async () => {
      try {
        const response = await axiosInstance({
          method: "get",
          url: `${apiUrl}/api/getstatus`,
        });
        console.log("status",response);
        setStatus(response.data.status);
        if(response.data.time){
          setCheckTime(response.data.time)
          // console.log("time",response.data.time)
          setTime(new Date().valueOf() - response.data.time)
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
      console.log("grapgh",response);
      setGraphData(response.data.graphdata)
      // setStatus(response.data.status);
    
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };



  const data = [
    { day: 'Mon', value: 3 },
    { day: 'Tue', value: 5 },
    { day: 'Wed', value: 2 },
    { day: 'Thu', value: 9 },
    { day: 'Fri', value: 6 },
];

  return (
    <>

      {
        loading ? (
          <div className="loaderContainer">
            <Loader />
          </div>) : (
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
           

            <Box sx={{
              flexBasis: "50%",
              backgroundColor: "white ",



            }} >
              <CustomButton
                onClick={handleCheck}
                ButtonText={status === "checkin" ? "Check Out" : "Check In"}
                fullWidth={true}
                background="#157AFF"
                color="white"
                fontWeight="500"
                fontSize="32px"
                hoverBg="#303f9f"
                padding="26px 0px"
                borderRadius="12px"
                buttonStyle={{
                  height:"10rem",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center"
                }}
                extraText={status === "checkin" ? `${unixTimestampToTime(checkTime)}` : null}
              />

              <Box sx={{
                mt:"30px"
              }} >
                 <Chart graphData={graphData} />;

              </Box>
            </Box>


            <Box
            sx={{
              flexBasis: "50%",
              

            }}
            >
            {status=="checkin"?
            <Box sx={{
              height:"10rem",
              border:"2px solid rgba(170, 170, 170,0.5)",
              borderRadius:"20px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              marginBottom:"2rem",
              fontSize:"2.5rem"
            }}>
              {formatTime(time)}
            </Box>
            :null}

              <Box
                sx={{
                  width:"100%",
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
                    height: "75vh",
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
                  {fetchAnnouncements.map((announcement, index) => (
                    <AnnouncementBox
                      key={index}
                      announcementContent={announcement.announcement}
                    />
                  ))}
                </Box>


              </Box>
            </Box>
        



          </Box>
          </>

        )


      }


    </>
  );
};

export default Check;
