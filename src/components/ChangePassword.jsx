import { useForm } from "react-hook-form";
import { CForm, CFormInput, CButton } from "@coreui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { useState } from "react";
import { LoaderW } from "./Loaders";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangePassword = () => {

    const [isLoading,setIsLoading]=useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const { oldPassword, newPassword } = data;
        try {
            setIsLoading(true)
            const response = await axiosInstance.post(`${apiUrl}/api/change-password`, {
                oldPassword,
                newPassword
            });
            setIsLoading(false)

            toast.success(response.data.message, {
                position: "top-center",
            });
            reset();
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            const err = error?.response?.data?.message || error.message;
            toast.error(err, {
                position: "top-center",
            });
        }
    };

    return (
        <>
            <h1 className="Login-Header">Change Password</h1>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="loginFields">
                    <CFormInput
                        type="password"
                        id="oldPassword"
                        floatingClassName="mb-3"
                        floatingLabel="Old Password"
                        placeholder="Old Password"
                        {...register("oldPassword", { required: "Email is required" })}
                        size="lg"
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                    <CFormInput
                        type="password"
                        id="NewPassword"
                        floatingClassName="mb-3"
                        floatingLabel="New Password"
                        placeholder="New Password"
                        {...register("newPassword", { required: "Password is required" })}
                        size="lg"
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <CButton
                
                style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%"
                }}
                
                color="dark" variant="outline" size="lg" type="submit">
                    {isLoading ? <LoaderW /> : "Change Password"}
                </CButton>
            </CForm>
        </>
    );
};

export default ChangePassword;
