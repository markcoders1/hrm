import { useState, useEffect } from "react";
import "./Checkin.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Checkin = () => {
    const user = useSelector((state) => state.user);
    const [status, setStatus] = useState("");
    const [loading,setloading]=useState(true)
    const accessToken = user?.user?.accessToken || "";

    const handleCheck = async () => {
        try {
            const response = await axios({
                url: `${apiUrl}/api/check`,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response);
            toast.success(response.data.message);
            setStatus(response.data.status);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const handleBreak = async () => {
        try {
            const response = await axios({
                url: `${apiUrl}/api/break`,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            setStatus(response.data.status);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const getStatus = async () => {
            const response = await axios({
                method: "get",
                url: `${apiUrl}/api/getstatus`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            setStatus(response.data.status);
            setloading(false)
        };
        getStatus();
    }, [accessToken]);

    const CheckButtons=()=>{
        return(<>
            <button onClick={handleCheck}>{status === "checkin" || status === "inbreak"? "check out": "check in"}</button>
            {status === "checkout" ? null : (<button onClick={handleBreak}>{status === "checkin" ? "break in" : "break out"}</button>)}
        </>)
    }

    return (
        <div className="check-container">
          <div className="clocked">{/* <h2 id='clock'></h2> */}</div>
          <div className="check-buttons">
            {loading?<div className="loader"></div>:<CheckButtons />}
          </div>
        </div>
    );
};

export default Checkin;
