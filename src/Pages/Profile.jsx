import { useEffect, useState } from 'react';
import '../PagesCss/Profile.css';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Loader } from '../components/Loaders';
import { CForm, CFormInput, CButton } from '@coreui/react';
import { useForm } from 'react-hook-form';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Profile = () => {
    const navigate = useNavigate();
    const setHeadertext = useOutletContext();
    const { id } = useParams();
    const [yourData, setYourData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputAbled, setInputAbled] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/getUser`,
                    method: 'get',
                    params: { id },
                });
                console.log(response.data.user);
                setYourData(response.data.user);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getProfileInfo();
        setHeadertext('User Profile');
    }, [id, setHeadertext]);

    const onSubmit = async (data) => {
        try {
            const { fullName, email, phone, department, designation, shift, teamLead, CID, CNIC, DOB } = data;
            const response = await axiosInstance({
                url: `${apiUrl}/api/update-profile`,
                method: 'post',
                data: {
                    id,
                    fullName,
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
        <div className="profile-container">
            <CForm className="profile-information-container">
                {loading ? (
                    <div className="loaderContainer">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="input">
                            <label className="input-label">Full Name : </label>
                            <CFormInput className="input-box" disabled={!inputAbled} placeholder={yourData.fullName} {...register('fullName')} />
                        </div>
                        <div className="input">
                            <label className="input-label">CNIC : </label>
                            <CFormInput className="input-box" disabled={!inputAbled} placeholder={yourData.CNIC} {...register('CNIC')} />
                        </div>
                        <div className="input">
                            <label className="input-label">DOB : </label>
                            <CFormInput className="input-box" type="date" disabled={!inputAbled} placeholder={yourData.DOB} {...register('DOB')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Phone : </label>
                            <CFormInput className="input-box" disabled={!inputAbled} placeholder={yourData.phone} {...register('phone')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Email : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.email} {...register('email')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Department : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.department} {...register('department')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Designation : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.designation} {...register('designation')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Shift : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.shift} {...register('shift')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Team Lead : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.teamLead} {...register('teamLead')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Company ID : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.companyId} {...register('CID')} />
                        </div>
                        <div className="input">
                            <label className="input-label">Status : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.status} />
                        </div>
                        <div className="input">
                            <label className="input-label">Role : </label>
                            <CFormInput className="input-box" disabled placeholder={yourData.role} />
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

export default Profile;
