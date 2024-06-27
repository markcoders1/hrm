export const scheduleNotification = (message, minutesFromNow) => {
    const notificationTime = new Date().getTime() + minutesFromNow * 60 * 1000;

    const checkTime = () => {
        const now = new Date().getTime();
        if (now >= notificationTime) {
            const notification = new Notification(message, {
                requireInteraction: true // This ensures the notification stays until closed
            });

            notification.onclick = () => {
                notification.close();
            };

            clearInterval(interval);
        }
    };

    const interval = setInterval(checkTime, 1000);
};
