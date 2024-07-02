import { useOutletContext, useParams } from "react-router-dom"
import { LoggedCards } from "../components/LoggedCards.jsx"
import { useEffect, useState } from "react";
import axiosInstance from "../auth/axiosInstance.js";

import { CCard, CCardBody, CCardTitle, CButton } from "@coreui/react";
import { Key } from "@mui/icons-material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const Devices = () => {
    const [userDevices, setUserDevices] = useState([]);
    const setHeadertext = useOutletContext();
    const { id } = useParams();

    useEffect(() => {
        const getDeviceInfo = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/getUser`,
                    method: 'get',
                    params: { id },
                });

                setUserDevices(response.data.user.devices)

            } catch (error) {
                console.log(error);
            }
        };
        getDeviceInfo();
        setHeadertext("Your Devices")
    }, [id]);

    const logoutFromSpecificDevice = async (deviceId) => {
        try {
            const response = await axiosInstance({
                url: `${apiUrl}/api/logout-specific`,
                method: 'post',
                params: {
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
                userDevices.map((device, ind) => {
                    let deviceName = device.deviceId.split(" | ")

                    return (
                        <div Key={ind} >
                            <CCard style={{ width: '24rem', height: '100%' }}>
                                <CCardBody style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',gap:'1.6rem' }}>
                                    <div>
                                        <CCardTitle style={{ fontSize: "16px", color: "black", fontWeight: "500", letterSpacing: "1px" }}>
                                            Browser : {deviceName[0]}
                                        </CCardTitle>
                                        <CCardTitle style={{ fontSize: "16px", color: "black", fontWeight: "500", letterSpacing: "1px" }}>
                                            CPU : {deviceName[1]}
                                        </CCardTitle>
                                        <CCardTitle style={{ fontSize: "16px", color: "black", fontWeight: "500", letterSpacing: "1px" }}>
                                            Operating system : {deviceName[2]}
                                        </CCardTitle>

                                    </div>
                                    <div>
                                        <CButton color="primary">button</CButton>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </div>
                    )
                })

            }
        </div>
    );
}

export default Devices;
