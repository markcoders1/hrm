import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders.jsx";
import { scheduleNotification } from "../Helper/notificationHelper";
import { useOutletContext } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Check = () => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingForCheckBtn, setLoadingForCheckBtn] = useState(false);
    const [loadingForBreakBtn, setLoadingForBreakBtn] = useState(false);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const setHeadertext = useOutletContext();


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
                    console.error('Error getting location:', error);
                }
            );

            setLoadingForCheckBtn(true);

            
            const response = await axiosInstance({
                url: `${apiUrl}/api/check`,
                method: "post",
                data : {
                    latitude:latitude,
                    longitude: longitude,
                }
            
            });
            console.log(latitude)
            console.log(longitude)


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
        setHeadertext("Dashboard")

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


    useEffect(()=>{
        console.log(latitude)
        console.log(longitude)
    },[])

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
                {loadingForCheckBtn ? <LoaderW /> : (status === "checki-in" || status === "inbreak" ? "Check Out" : "Check-In")}
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
                    {loadingForBreakBtn ? <LoaderW /> : (status === "check-In" ? "Break In" : "Break Out")}
                </button>
            )}
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

    return (
        <>
        {
            loading ? <div className="loaderContainer"><Loader /></div>  : 
            <div className='Home-container'>
            <div className="check-container">
                <div className="check-buttons">
                    <CheckButtons />
                </div>
            </div>
        </div>
        }
        
        {/* <div className='Home-container'>
            <div className="check-container">
                <div className="check-buttons">
                    {loading ? <div className="loaderContainer"><Loader /></div> : <CheckButtons />}    
                </div>
            </div>
        </div> */}
        </>

    );
};

export default Check;
