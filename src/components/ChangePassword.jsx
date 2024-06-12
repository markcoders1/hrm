import { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Login.css";
// import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EyeOpen from "/eye-open.png";
import EyeClosed from "/eye-close.png";
import axiosInstance from "../auth/axiosInstance";

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
            const response = await axiosInstance({
                url: `${apiUrl}/api/change-password`,
                method: "post",
                data : {
                    oldPassword,
                    newPassword
                }
            });

            console.log(response);

            toast.success(response.message, {
                position: "top-center",
            });
            reset();
        } catch (error) {
            console.log(error)
            // const err = error?.response?.data?.message || error

            // if (typeof err !== "object") {
            //     err.forEach((e) => {
            //         toast.error(e.message, { position: "top-center" })
            //     })
            // } else if (typeof err === "string") {
            //     toast.error(err, { position: "top-center" })
            // } else {
            //     console.log(err)
            // }
        }
    };

    const togglePasswordVisibility = () => {
        if (passwordType1 === "password") {
            setPasswordType1("text");
            setPasswordImage1(EyeClosed);
        } else {
            setPasswordType1("password");
            setPasswordImage1(EyeOpen);
        }
    };

    const togglePasswordVisibility2 = () => {
        if (passwordType2 === "password") {
            setPasswordType2("text");
            setPasswordImage2(EyeClosed);
        } else {
            setPasswordType2("password");
            setPasswordImage2(EyeOpen);
        }
    };

    return (
        <>

            <div className="outlet-box">
                <h1 className="sign-heading">Change Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="input-row">
                        <div className="custom-input">

                            <div className="password-field">
                                <input
                                    id="password"
                                    type={passwordType1}
                                    placeholder="Old Password"
                                    {...register("oldPassword", {
                                        required:
                                            "Old Password is required",
                                    })}
                                />
                                <span
                                    onClick={togglePasswordVisibility}>
                                    <img
                                        id="icon"
                                        src={passwordImage1}
                                        alt="Toggle Password Visibility"
                                    />
                                </span>
                            </div>
                            {errors.password && (
                                <span className="error-message">
                                    Old Password is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="custom-input">

                            <div className="password-field">
                                <input
                                    id="password"
                                    type={passwordType2}
                                    placeholder="Password"
                                    {...register("newPassword", {
                                        required:
                                            "New Password is required",
                                    })}
                                />
                                <span
                                    onClick={togglePasswordVisibility2}>
                                    <img
                                        id="icon"
                                        src={passwordImage2}
                                        alt="Toggle Password Visibility"
                                    />
                                </span>
                            </div>
                            {errors.password && (
                                <span className="error-message">
                                    New Password is required
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="login-btn">
                        <input type="submit" value="Change Password" />
                    </div>
                </form>
            </div>

        </>
    );
};

export default ChangePassword;
