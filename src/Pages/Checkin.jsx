import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders.jsx";
import { scheduleNotification } from "../helpers/notificationHelper";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Check = () => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingForCheckBtn, setLoadingForCheckBtn] = useState(false);
    const [loadingForBreakBtn, setLoadingForBreakBtn] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);

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
            setLoadingForCheckBtn(true);
            const response = await axiosInstance({
                url: `${apiUrl}/api/check`,
                method: "post",
            });

            console.log(response);
            toast.success(response.data.message);
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

            if (!isOnBreak) {
                const breakTime = new Date();
                localStorage.setItem('breakTime', breakTime.toISOString());
                console.log("Break time stored:", breakTime.toISOString());

                // Schedule a notification for 2 minutes later
                scheduleNotification("Time to take a break from work! Please relax and stretch your muscles.", 2);
            }

            setIsOnBreak(!isOnBreak);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            setLoadingForBreakBtn(false);
        }
    };

    useEffect(() => {
        requestNotificationPermission();

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
        };
        getStatus();
    }, []);

    const CheckButtons = () => (
        <>
            <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={handleCheck} 
                disabled={loadingForCheckBtn}
            >
                {loadingForCheckBtn ? <LoaderW /> : (status === "checkin" || status === "inbreak" ? "Check Out" : "Check In")}
            </button>
            {status === "checkout" ? null : (
                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={handleBreak} 
                    disabled={loadingForBreakBtn}
                >
                    {loadingForBreakBtn ? <LoaderW /> : (isOnBreak ? "Break Out" : "Break In")}
                </button>
            )}
        </>
    );

    return (
        <div className='Home-container'>
            <div className="check-container">
                <div className="check-buttons">
                    {loading ? <div className="loaderContainer"><Loader /></div> : <CheckButtons />}
                </div>
            </div>
        </div>
    );
};

export default Check;
