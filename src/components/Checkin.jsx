import { useState, useEffect } from "react";
import "../css/Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import {Loader,LoaderW} from "./Loaders";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Checkin = () => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingForCheckBtn, setLoadingForCheckBtn] = useState(false);
    const [loadingForBreakBtn, setLoadingForBreakBtn] = useState(false);

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
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            setLoadingForBreakBtn(false);
        }
    };

    useEffect(() => {
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
                onClick={handleCheck} disabled={loadingForCheckBtn}>
                {loadingForCheckBtn ? <LoaderW /> : (status === "checkin" || status === "inbreak" ? "Check Out" : "Check In")}
            </button>
            {status === "checkout" ? null : (
                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={handleBreak} disabled={loadingForBreakBtn}>
                    {loadingForBreakBtn ? <LoaderW /> : (status === "checkin" ? "Break In" : "Break Out")}
                </button>
            )}
        </>
    );

    return (
        <div className="check-container">
            <div className="check-buttons">
                {loading ? <div className="loaderContainer"><Loader /></div> : <CheckButtons />}
            </div>
        </div>
    );
};

export default Checkin;
