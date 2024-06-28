// export const scheduleNotification = (message, minutesFromNow) => {
//     const notificationTime = new Date().getTime() + minutesFromNow * 60 * 1000;

//     const checkTime = () => {
//         const now = new Date().getTime();
//         if (now >= notificationTime) {
//             const notification = new Notification(message, {
//                 requireInteraction: true // This ensures the notification stays until closed
//             });

//             notification.onclick = () => {
//                 notification.close();
//             };

//             clearInterval(interval);
//         }
//     };

//     const interval = setInterval(checkTime, 1000);
// };


// import notifyImg from '../../public/favicon.svg';
// import { addHours } from "date-fns";

// export const scheduleNotification = (message, secondsFromNow) => {
//     const notificationTime = addHours(new Date(), secondsFromNow);

//     const checkTime = () => {
//         const now = new Date();
//         if (now >= notificationTime) {
//             const notification = new Notification("Work Reminder", {
//                 body: message,
//                 icon: notifyImg, // Use the variable directly without quotes
//                 requireInteraction: true // This ensures the notification stays until closed
//             });

//             notification.onclick = () => {
//                 notification.close();
//             };

//             clearInterval(interval);
//         }
//     };

//     const interval = setInterval(checkTime, 1000);
// };


import notifyImg from '/favicon.svg';

export const scheduleNotification = (message, secondsFromNow) => {
    const notificationTime = new Date().getTime() + secondsFromNow * 1000;

    const checkTime = () => {
        const now = new Date().getTime();
        if (now >= notificationTime) {
            const notification = new Notification("Work Reminder", {
                body: message,
                icon: notifyImg, // Use the variable directly without quotes
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
