import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { useOutletContext } from 'react-router-dom';

const MyNotifications = () => {
  const { setHeadertext, setParaText } = useOutletContext();

  useEffect(() => {
    setHeadertext("Notifications");
    setParaText("Keep Yourself Updated!");
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

  return (
    <Box sx={{display:"flex", flexDirection:"column", gap:"1.5rem"}} >
      {notifications.map((notification, index) => (
        <NotificationBox
          key={index}
          notificationText={notification.notificationText}
          notificationDate={notification.notificationDate}
        />
      ))}
    </Box>
  );
}

export default MyNotifications;
