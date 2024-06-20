/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/Profile.css";
import Loader from "../components/Loader";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewInformation = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const [allEmployee, setAllEmployee] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken);
    }, []);

    useEffect(() => {
        const getSpecificUser = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getUser`,
                    method: "get",
                    params: {
                        userId: id,
                    },
                });
                const dataAllEmployee = response.data;
                setAllEmployee(dataAllEmployee);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        getSpecificUser();
    }, []);

    return (
        <div className="profile-container">
            {id}
            <div className="profile-heading">
                <h1>User Profile</h1>
                {/* <span className='menu-bar' onClick={handleToggleSidebar}  >
                <IoMenuOutline />
            </span> */}
            </div>
            <div
                className={
                    loading
                        ? "profile-information-container"
                        : "profile-information-container padding"
                }>
                {!loading ? (
                    <div className="loaderContainer">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="input-box">
                            <label>
                                First Name : <span>yourData.firstName</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Last Name : <span>yourData.lastName</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Email : <span>yourData.email</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Phone : <span>yourData.phone</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Department : <span>yourData.department</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Designation : <span>yourData.designation</span>{" "}
                            </label>
                        </div>

                        <div className="input-box">
                            <label>
                                Shift : <span>yourData.shift</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Team Lead : <span>yourData.teamLead</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Status : <span>yourData.status</span>{" "}
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                Company ID : <span>yourData.companyId</span>{" "}
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewInformation;
