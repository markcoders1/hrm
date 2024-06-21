/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/Profile.css";
import {Loader} from "./Loaders";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewInformation = () => {
    const setHeadertext = useOutletContext()
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const [employeeData, setEmployeeData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken);
    }, []);

    useEffect(() => {
        setHeadertext('Employee Data')
        const getSpecificUser = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getUser`,
                    method: "get",
                    params: {
                        id
                    },
                });
                const dataAllEmployee = response.data.user;
                setEmployeeData(dataAllEmployee);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getSpecificUser();
    }, []);

    return (
        <div className="profile-container">
            <div
                className={
                    loading
                        ? "profile-information-container"
                        : "profile-information-container padding"
                }>
                {loading ? (
                    <div className="loaderContainer">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="input">
                            <div className='input-label'>First Name : </div><div className='input-box'>{`  ${employeeData.firstName}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Last Name : </div><div className='input-box'>{`  ${employeeData.lastName}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Email : </div><div className='input-box'>{`  ${employeeData.email}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Phone : </div><div className='input-box'>{`  ${employeeData.phone}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Department : </div><div className='input-box'>{`  ${employeeData.department}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Designation : </div><div className='input-box'>{`  ${employeeData.designation}`}</div>
                        </div>

                        <div className="input">
                            <div className='input-label'>Shift : </div><div className='input-box'>{`  ${employeeData.shift}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Team Lead : </div><div className='input-box'>{`  ${employeeData.teamLead}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Status : </div><div className='input-box'>{`  ${employeeData.status}`}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewInformation;
