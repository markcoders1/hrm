import { useState } from "react";
import { useForm } from "react-hook-form";
import { CForm, CFormInput, CButton } from "@coreui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EyeOpen from "/eye-open.png";
import EyeClosed from "/eye-close.png";
import axiosInstance from "../auth/axiosInstance";
import "../css/ChangePassword.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangePassword = () => {
    const [passwordImage1, setPasswordImage1] = useState(EyeOpen);
    const [passwordImage2, setPasswordImage2] = useState(EyeOpen);
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const { oldPassword, newPassword } = data;
        try {
            const response = await axiosInstance.post(`${apiUrl}/api/change-password`, {
                oldPassword,
                newPassword
            });

            console.log(response);

            toast.success(response.data.message, {
                position: "top-center",
            });
            reset();
        } catch (error) {
            console.log(error);
            const err = error?.response?.data?.message || error.message;
            toast.error(err, {
                position: "top-center",
            });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordType1(passwordType1 === "password" ? "text" : "password");
        setPasswordImage1(passwordType1 === "password" ? EyeClosed : EyeOpen);
    };

    const togglePasswordVisibility2 = () => {
        setPasswordType2(passwordType2 === "password" ? "text" : "password");
        setPasswordImage2(passwordType2 === "password" ? EyeClosed : EyeOpen);
    };

    return (
        <>
            <div className="outlet-box">
                <h1 className="sign-heading">Change Password</h1>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <div className="custom-input">
                            <div className="password-field">
                                <CFormInput
                                    id="oldPassword"
                                    type={passwordType1}
                                    placeholder="Old Password"
                                    {...register("oldPassword", {
                                        required: "Old Password is required",
                                    })}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    <img src={passwordImage1} alt="Toggle Password Visibility" />
                                </span>
                            </div>
                        </div>
                            {errors.oldPassword && (
                                <span className="error-message">
                                    {errors.oldPassword.message}
                                </span>
                            )}
                    </div>
                    <div className="input-row">
                        <div className="custom-input">
                            <div className="password-field">
                                <CFormInput
                                    id="newPassword"
                                    type={passwordType2}
                                    placeholder="New Password"
                                    {...register("newPassword", {
                                        required: "New Password is required",
                                    })}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility2}>
                                    <img src={passwordImage2} alt="Toggle Password Visibility" />
                                </span>
                            </div>
                        </div>
                                {errors.newPassword && (
                                    <span className="error-message">
                                        {errors.newPassword.message}
                                    </span>
                                )}
                    </div>

                    <div className="login-btn">
                        <CButton type="submit" color="primary" variant="outline">Change Password</CButton>
                    </div>
                </CForm>
            </div>
        </>
    );
};

export default ChangePassword;
