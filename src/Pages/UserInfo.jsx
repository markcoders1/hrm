/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/ViewInformation.css";
import { Loader } from "../components/Loaders";
import { CForm, CFormInput, CButton } from "@coreui/react";
import { useForm } from "react-hook-form";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserInfo = () => {
    const setHeadertext = useOutletContext();
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputAbled, setInputAbled] = useState(false);

    const [employeeData, setEmployeeData] = useState([]);
    const { id } = useParams();

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken);
    }, []);

    useEffect(() => {
        setHeadertext('Employee Data');
        const getSpecificUser = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getUser`,
                    method: "get",
                    params: { id },
                });
                const dataAllEmployee = response.data.user;
                setEmployeeData(dataAllEmployee);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getSpecificUser();
    }, [id, apiUrl, setHeadertext]);

    const onSubmit = async (data) => {
        try {
            const { firstName, lastName, email, phone, department, designation, shift, teamLead, CID, CNIC, DOB } = data;
            const response = await axiosInstance({
                url: `${apiUrl}/api/admin/update-any-profile`,
                method: "post",
                data: {
                    id,
                    firstName,
                    lastName,
                    email,
                    phone,
                    department,
                    designation,
                    shift,
                    teamLead,
                    CID,
                    CNIC,
                    DOB,
                },
            });
            console.log(response);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="viewinfo-container">
            <CForm  className="profile-information-container">
                {loading ? (
                    <div className="loaderContainer">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="input">
                            <label className='input-label'>First Name : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.firstName} {...register("firstName")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Last Name : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.lastName} {...register("lastName")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Email : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.email} {...register("email")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Phone : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.phone} {...register("phone")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Department : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.department} {...register("department")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Designation : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.designation} {...register("designation")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Shift : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.shift} {...register("shift")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Team Lead : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.teamLead} {...register("teamLead")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Company ID : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.companyId} {...register("CID")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>CNIC : </label>
                            <CFormInput className='input-box' disabled={!inputAbled} placeholder={employeeData.CNIC} {...register("CNIC")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>DOB : </label>
                            <CFormInput className='input-box' type="date" disabled={!inputAbled} placeholder={employeeData.DOB} {...register("DOB")} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Status : </label>
                            <CFormInput className='input-box' disabled placeholder={employeeData.status} />
                        </div>
                        <div className="input">
                            <label className='input-label'>Role : </label>
                            <CFormInput className='input-box' disabled placeholder={employeeData.role} />
                        </div>
                    </>
                )}
            </CForm>
            <div className="ButtonsOMeth">
                <CButton color="info" variant="outline" type="button" onClick={() => setInputAbled(!inputAbled)}>Change Info</CButton>
                <CButton color="info" type="submit" onClick={handleSubmit(onSubmit)} disabled={!inputAbled}>Submit Change</CButton>
            </div>
        </div>
    );
};

export default UserInfo;
