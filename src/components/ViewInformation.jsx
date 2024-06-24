/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/Profile.css";
import {Loader} from "./Loaders";
import { CForm, CFormInput,CButton } from "@coreui/react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewInformation = () => {
    const setHeadertext = useOutletContext()
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputAbled,setInputAbled] = useState(false)

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

    const handleSubmit = () => {
        console.log("hi")
    }

    return (
        <div className="profile-container">
            <CForm
                className={
                    loading
                        ? "profile-information-container"
                        : "profile-information-container"
                }>
                {loading ? (
                    <div className="loaderContainer">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="input">
                            <label className='input-label'>First Name : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.firstName}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Last Name : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.lastName}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Email : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.email}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Phone : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.phone}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Department : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.department}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Designation : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.designation}`}></CFormInput>
                        </div>

                        <div className="input">
                            <label className='input-label'>Shift : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.shift}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Team Lead : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.teamLead}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Company ID : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.companyId}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>CNIC : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.CNIC}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>DOB : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.DOB}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Status : </label><CFormInput className='input-box' disabled placeholder={`${employeeData.status}`}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>role : </label><CFormInput className='input-box' disabled placeholder={`${employeeData.role}`}></CFormInput>
                        </div>
                    </>
                )}
            </CForm>
            <div className="ButtonsOMeth">
                <CButton color="info" variant="outline" type="button" onClick={()=>setInputAbled(!inputAbled)}> change info</CButton>
                <CButton color="info" type="button" onClick={()=>handleSubmit()} disabled={!inputAbled}> Submit Change</CButton>
            </div>
        </div>
    );
};

export default ViewInformation;
