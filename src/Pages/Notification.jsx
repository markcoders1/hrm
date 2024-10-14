import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import NotificationBox from '../components/NotificationBox/NotificationBox';
import { useOutletContext } from 'react-router-dom';
import CustomInputLabel from '../components/CustomInputField/CustomInputLabel';

const Notification = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term
  const [filteredNotifications, setFilteredNotifications] = useState([]); // State to manage filtered notifications

  useEffect(() => {
    setHeadertext("Notifications");
    setParaText("Keep Yourself Updated!");
    setFilteredNotifications(notifications); // Initially, all notifications are displayed
  }, []);

  const notifications = [
    {
      notificationText: "Connect with Facebook to complete your profile and make it easy to log in.",
      notificationDate: "August 9, 2024"
    },
    {
      notificationText: "Your profile is 80% complete. Add your phone number to reach 100%.",
      notificationDate: "August 10, 2024"
    },
    {
      notificationText: "New features have been added to your account. Check them out now!",
      notificationDate: "August 11, 2024"
    },
    {
      notificationText: "Update your password for better security.",
      notificationDate: "August 12, 2024"
    },
    {
      notificationText: "You have new friend requests waiting for approval.",
      notificationDate: "August 13, 2024"
    },
    {
      notificationText: "Your account has been upgraded to premium. Enjoy the new benefits!",
      notificationDate: "August 14, 2024"
    }
  ];

  // Function to filter notifications based on search term
  useEffect(() => {
    const filtered = notifications.filter(notification =>
      notification.notificationText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.notificationDate.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotifications(filtered);
  }, [searchTerm]); // Re-run the filter function whenever the search term changes

  return (
    <>
      <Box sx={{ width: { lg: "380px", xs: "100%" }, position: { lg: "fixed", xs: "static" }, right: "40px", top: "40px", zIndex: "100000 " }} >
        <CustomInputLabel
          fontSize={"20px"}
          showSearchIcon={true}
          placeholder={"Search Notifications"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          height={"36px"}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem", mt: '80px' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <NotificationBox
              key={index}
              notificationText={notification.notificationText}
              notificationDate={notification.notificationDate}
            />
          ))
        ) : (
          <Typography >No notifications found</Typography> // Message when no notifications match the search term
        )}
      </Box>
    </>
  );
}

export default Notification;
