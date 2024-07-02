import { useOutletContext, useParams } from "react-router-dom"
import { LoggedCards } from "../components/LoggedCards.jsx"
import { useEffect, useState } from "react";
import axiosInstance from "../auth/axiosInstance.js";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Devices = () => {
    const [deviceName, setDeviceName] = useState([]);
    const setHeadertext = useOutletContext();
    setHeadertext("Your Devices")
    const { id } = useParams();

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/getUser`,
                    method: 'get',
                    params: { id },
                });
                setDeviceName(response.data.user.devices);
            } catch (error) {
                console.log(error);
            }
        };
        getProfileInfo();
    }, [id]);

    const logoutFromSpecificDevice = async (deviceId) => {
        try {
            const response = await axiosInstance({
                url: `${apiUrl}/api/logoutDevice`,
                method: 'post',
                data: {
                    userId: id,
                    deviceId: deviceId,
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "white",
                padding: "30px 20px",
                boxShadow: "1px 1px 20px gray",
                borderRadius: "5px",
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",   
            }}
        >
            {
                deviceName.map((device, ind) => (
                    <LoggedCards
                        key={ind}
                        deviceId={device.deviceId} // Adjust according to your device object structure
                        buttonText="Logged out from here"
                        logoutFrom={() => logoutFromSpecificDevice(device.deviceId)}
                        ind={ind}
                    />
                ))
            }
        </div>
    );
}

export default Devices;
