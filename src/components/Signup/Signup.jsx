import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import env from '../../../env';
import { useSelector } from 'react-redux';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Signup = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const admin_token = user?.user?.accessToken || '';
    const config_admin = {
        headers: { Authorization: `Bearer ${admin_token}` }
    };

    useEffect(() => {
        console.log(admin_token);
    }, [admin_token]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            let { email, password, firstName, lastName, DOB, CNIC, designation, phone, teamLead, shift, department, role } = data;
            CNIC = Number(CNIC);
            console.log(CNIC);
            console.log(DOB)

            const response = await axios.post(`${apiUrl}/api/admin/register`, {
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
                role
            }, config_admin);

            console.log(response);
            toast.success("User Registered Successfully", { position: "top-center" });
            console.log(response.data);
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to sign up", { position: "top-center" });
            console.log(error.message);
        }
    };

    return (
        <div className="form-container-register">
            <ToastContainer />
            <div className='form-register'>
                <h1 className="register-heading">Register New Employee</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                {...register('firstName', { required: "First Name is required" })}
                            />
                            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                {...register('lastName', { required: "Last Name is required" })}
                            />
                            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: "Email is required" })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', { required: "Password is required" })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="DOB">Date of Birth</label>
                            <input
                                id="DOB"
                                type="date"
                                {...register('DOB', { required: "Date of Birth is required" })}
                            />
                            {errors.DOB && <p className="error">{errors.DOB.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="CNIC">CNIC</label>
                            <input
                                id="CNIC"
                                type="text"
                                {...register('CNIC', { required: "CNIC is required" })}
                            />
                            {errors.CNIC && <p className="error">{errors.CNIC.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="phone">Phone No.</label>
                            <input
                                id="phone"
                                type="text"
                                {...register('phone', { required: "Phone Number is required" })}
                            />
                            {errors.phone && <p className="error">{errors.phone.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="designation">Designation</label>
                            <input
                                id="designation"
                                type="text"
                                {...register('designation', { required: "Designation is required" })}
                            />
                            {errors.designation && <p className="error">{errors.designation.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="teamLead">Team Lead</label>
                            <input
                                id="teamLead"
                                type="text"
                                {...register('teamLead', { required: "Team Lead is required" })}
                            />
                            {errors.teamLead && <p className="error">{errors.teamLead.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="shift">Shift</label>
                            <input
                                id="shift"
                                type="text"
                                {...register('shift', { required: "Shift is required" })}
                            />
                            {errors.shift && <p className="error">{errors.shift.message}</p>}
                        </div>
                    </div>

                    <div className="input-row-register">
                        <div className='child-row'>
                            <label htmlFor="department">Department</label>
                            <input
                                id="department"
                                type="text"
                                {...register('department', { required: "Department is required" })}
                            />
                            {errors.department && <p className="error">{errors.department.message}</p>}
                        </div>
                        <div className='child-row'>
                            <label htmlFor="role">Role</label>
                            <input
                                id="role"
                                type="text"
                                {...register('role', { required: "Employee Role is required" })}
                            />
                            {errors.role && <p className="error">{errors.role.message}</p>}
                        </div>
                    </div>

                    <div className="register-btn">
                        <input type="submit" value="Sign up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
