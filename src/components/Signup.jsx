import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CForm, CFormInput, CFormSelect, CButton } from '@coreui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axiosInstance from '../auth/axiosInstance';
import { useOutletContext } from 'react-router-dom';
import '../css/Signup.css';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Signup = () => {
    const user = useSelector(state => state.user);
    const setHeadertext = useOutletContext()

    const admin_token = user?.user?.accessToken || '';
    const config_admin = {
        headers: { Authorization: `Bearer ${admin_token}` }
    };

    useEffect(() => {
        setHeadertext('Register Employee');
    }, []);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const onSubmit = async (data) => {
        try {
            let { email, password, firstName, lastName, DOB, CNIC, designation, phone, teamLead, shift, department, role, companyId } = data;

            const response = await axiosInstance.post(`${apiUrl}/api/admin/register`, {
                email,
                password,
                firstName,
                lastName,
                DOB,
                CNIC,
                designation,
                phone,
                teamLead,
                shift,
                department,
                role,
                companyId
            }, config_admin);

            toast.success("User Registered Successfully", { position: "top-center" });
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message[0].message || error.message || "Failed to sign up", { position: "top-center" });
        }
    };

    return (
        <div className="form-container-register">
            <div className='form-register'>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="First Name"
                                id="firstName"
                                placeholder="First Name"
                                {...register('firstName', { required: "First Name is required" })}
                                invalid={!!errors.firstName}
                                feedback={errors.firstName ? errors.firstName.message : ''}
                            />
                        </div>
                        <div className='child-row'>
                            <CFormInput
                                label="Last Name"
                                id="lastName"
                                placeholder="Last Name"
                                {...register('lastName', { required: "Last Name is required" })}
                                invalid={!!errors.lastName}
                                feedback={errors.lastName ? errors.lastName.message : ''}
                            />
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register('email', { required: "Email is required" })}
                                invalid={!!errors.email}
                                feedback={errors.email ? errors.email.message : ''}
                            />
                        </div>
                        <div className='child-row'>
                            <CFormInput
                                label="Password"
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: "Password is required" })}
                                invalid={!!errors.password}
                                feedback={errors.password ? errors.password.message : ''}
                            />
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Date of Birth"
                                id="DOB"
                                type="date"
                                {...register('DOB', { required: "Date of Birth is required" })}
                                invalid={!!errors.DOB}
                                feedback={errors.DOB ? errors.DOB.message : ''}
                            />
                        </div>
                        <div className='child-row'>
                            <CFormInput
                                label="CNIC"
                                id="CNIC"
                                placeholder="ENTER CNIC WITHOUT ANY SPACE"
                                {...register('CNIC', { required: "CNIC is required" })}
                                invalid={!!errors.CNIC}
                                feedback={errors.CNIC ? errors.CNIC.message : ''}
                            />
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Phone Number"
                                id="phone"
                                placeholder="ENTER PHONE NO. WITHOUT ANY SPACE"
                                {...register('phone', { required: "Phone Number is required" })}
                                invalid={!!errors.phone}
                                feedback={errors.phone ? errors.phone.message : ''} 
                            />
                        </div>
                        <div className='child-row'>
                            <CFormInput
                                label="Designation"
                                id="designation"
                                placeholder="Designation"
                                {...register('designation', { required: "Designation is required" })}
                                invalid={!!errors.designation}
                                feedback={errors.designation ? errors.designation.message : ''}
                            />
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Team Lead"
                                id="teamLead"
                                placeholder="Team Lead"
                                {...register('teamLead', { required: "Team Lead is required" })}
                                invalid={!!errors.teamLead}
                                feedback={errors.teamLead ? errors.teamLead.message : ''}
                            />
                        </div>
                        <div className='child-row'>
                            <CFormSelect
                            className="form-select-custom"
                                label="Shift"
                                id="shift"
                                {...register('shift', { required: "Shift is required" })}
                                onChange={(e) => setValue('shift', e.target.value)}
                                invalid={!!errors.shift}
                            >
                                <option value="">Select Shift</option>
                                <option value="morning">Morning</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                            </CFormSelect>
                            {errors.shift && <p className="error">{errors.shift.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Department"
                                id="department"
                                placeholder="Department"
                                {...register('department', { required: "Department is required" })}
                                invalid={!!errors.department}
                                feedback={errors.department ? errors.department.message : ''}
                            />
                        </div>
                        <div className='child-row'>
                            <CFormSelect
                            className="form-select-custom"
                                label="Role"
                                id="role"
                                {...register('role', { required: "Employee Role is required" })}
                                onChange={(e) => setValue('role', e.target.value)}
                                invalid={!!errors.role}
                            >
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </CFormSelect>
                            {errors.role && <p className="error">{errors.role.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <CFormInput
                                label="Company ID"
                                id="companyId"
                                placeholder="Company ID"
                                {...register('companyId', { required: "Company Id is required" })}
                                invalid={!!errors.companyId}
                                feedback={errors.companyId ? errors.companyId.message : ''}
                            />
                        </div>
                    </div>

                    <div className="register-btn">
                        <CButton color="primary" type="submit" className='signup-btn'>Sign up</CButton>
                    </div>
                </CForm>
            </div>
        </div>
    );
}

export default Signup;
 