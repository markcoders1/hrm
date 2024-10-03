import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const MyNotifications = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [notification, setNotification] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setHeadertext("Notifications");
    setParaText("Keep Yourself Updated!");
    console.log("this isboth notification")
  }, []);

  useEffect(() => {
    setParaText("");
    const getUserNotification = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/notifications`);
        console.log("notification", response);
        setNotification(response?.data?.notifications);
      } catch (error) {
        console.error('Error fetching notification:', error);
      }
    };

    getUserNotification();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredNotifications = notification.filter(notif => 
    notif.notification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem", p: "20px" }} >
      <Box sx={{ width: { lg: "380px", xs: "100%" }, position: { lg: "fixed", xs: "static" }, right: "60px", top: "40px", zIndex: "100000 " }} >
        <CustomInputLabel
          height={"56px"}
          fontSize={"20px"}
          showSearchIcon={true}
          placeholder={"Search Notifications"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
        />
      </Box>
      <Typography sx={{ 
        fontFamily: "'Poppins', sans-serif !important",
        fontWeight: "500",
        fontSize: "20px",
        color: "#010120"
      }}>Unread: {notification.filter(notif => notif.isNew).length}</Typography>
      {filteredNotifications.map((notification, index) => (
        <NotificationBox
          key={index}
          notificationText={notification?.notification}
          notificationDate={formatDate(notification?.createdAt)}
          notificationLink={notification?.linkTo}
          notificationisNew={notification?.isNew}
          notificationLinkType={notification?.linkType}
        />
      ))}
    </Box>
  );
}

export default MyNotifications;
