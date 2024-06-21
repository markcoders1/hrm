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
                        <div className="input-box">
                            <label>
                                First Name : <span>{employeeData.firstName}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Last Name : <span>{employeeData.lastName}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Email : <span>{employeeData.email}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Phone : <span>{employeeData.phone}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Department : <span>{employeeData.department}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Designation : <span>{employeeData.designation}</span>
                            </label>
                        </div>

                        <div className="input-box">
                            <label>
                                Shift : <span>{employeeData['shift']}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Team Lead : <span>{employeeData.teamLead}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Status : <span>{employeeData.status}</span>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Company ID : <span>{employeeData.companyId}</span>
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewInformation;
