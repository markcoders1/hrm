import { useForm } from "react-hook-form";
import { CForm, CFormInput, CButton } from "@coreui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { useState } from "react";
import { LoaderW } from "./Loaders";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {token} = useParams() 

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const { newPassword } = data;
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`${apiUrl}/api/auth/reset-password`, {
                password:newPassword,
                token
            });
            setIsLoading(false);

            toast.success(response.data.message, {
                position: "top-center",
            });
            reset();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
                        id="newPassword"
                        floatingClassName="mb-3"
                        floatingLabel="New Password"
                        placeholder="New Password"
                        {...register("newPassword", { required: "New password is required" })}
                        size="lg"
                    />
                    {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
                </div>
                <CButton
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "45px",
                        width: "100%",
                        backgroundColor: "blue",
                    }}
                    color="dark" variant="outline" size="lg" type="submit"
                >
                    {isLoading ? <LoaderW /> : "Change Password"}
                </CButton>
            </CForm>
        </>
    );
};

export default ChangePassword;
