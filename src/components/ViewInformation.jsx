/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../css/ViewInformation.css";
import {Loader} from "./Loaders";
import { CForm, CFormInput,CButton } from "@coreui/react";
import { useForm } from "react-hook-form";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewInformation = () => {
    const setHeadertext = useOutletContext()
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputAbled,setInputAbled] = useState(false)

    const [employeeData, setEmployeeData] = useState([]);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();


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

    const handleInfoChange = async (data) => {
        try {
            // const {firstName, LastName, email, phone, department, designation, shift, teamLead, CID, CNIC, DOB} = data
            console.log(data)
            // const response = await axiosInstance({
            //     url: `${apiUrl}/api/admin/update-any-profile`,
            //     method: "get",
            //     data: {
            //         id,
            //         firstName,
            //         LastName,
            //         email,
            //         phone,
            //         department,
            //         designation,
            //         shift,
            //         teamLead,
            //         CID,
            //         CNIC,
            //         DOB,
            //     },
            // });
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="viewinfo-container">
            <CForm onSubmit={handleSubmit(handleInfoChange)}
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
                            <label className='input-label'>First Name : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.firstName}`} {...register("firstName")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Last Name : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.lastName}`} {...register("LastName")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Email : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.email}`} {...register("email")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Phone : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.phone}`} {...register("phone")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Department : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.department}`} {...register("department")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Designation : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.designation}`} {...register("designation")}></CFormInput>
                        </div>

                        <div className="input">
                            <label className='input-label'>Shift : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.shift}`} {...register("shift")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Team Lead : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.teamLead}`} {...register("teamLead")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>Company ID : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.companyId}`} {...register("CID")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>CNIC : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.CNIC}`} {...register("CNIC")}></CFormInput>
                        </div>
                        <div className="input">
                            <label className='input-label'>DOB : </label><CFormInput className='input-box' disabled={!inputAbled} placeholder={`${employeeData.DOB}`} {...register("DOB")}></CFormInput>
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
                <CButton color="info" type="button" onClick={()=>handleInfoChange()} disabled={!inputAbled}> Submit Change</CButton>
            </div>
        </div>
    );
};

export default ViewInformation;
