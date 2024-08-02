import { Box, Typography } from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { useState } from "react";
import { LoaderW } from "../components/Loaders";
import { useParams } from "react-router-dom";
import CustomTextField from "../components/CustomInput/CustomInput"; // Adjust the import path as needed
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import '../css/Login.css'; // Assuming you want to use the same CSS as Login
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const password = useWatch({ control, name: 'newPassword' });
    const onSubmit = async (data) => {
        console.log(data)
        const { newPassword } = data;
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`${apiUrl}/api/auth/reset-password`, {
                password: newPassword,
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
    const validatePasswordMatch = (value) => value === password || "Passwords do not match";
    return (
        <Box className="login-container">
            <Box>
                <Typography sx={{
                    fontWeight: "600",
                    fontSize: "45px",
                    color: "#FFFFFF"
                }}>Change Password</Typography>
                <Typography sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#A0A4A9"
                }}>Enter your new password below.</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="loginFields">
                    <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", marginTop: "30px" }}>
                        <label style={{ color: "white", fontWeight: "400", fontSize: "18px" }}>New Password</label>
                        <Controller
                            name="newPassword"
                            control={control}
                            defaultValue=""
                            rules={{ required: "New password is required" }}
                            render={({ field }) => (
                                <CustomTextField
                                    border={true}
                                    error={errors.newPassword?.message}
                                    type="password"
                                    rows={1}
                                    showPasswordToggle={true}
                                    {...field}
                                />
                            )}
                        />
                    </Typography>
                    <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", marginTop: "30px" }}>
                        <label style={{ color: "white", fontWeight: "400", fontSize: "18px" }}>Confirm Password</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Confirm password is required",
                                validate: validatePasswordMatch,
                            }}
                            render={({ field }) => (
                                <CustomTextField
                                    border={true}
                                    error={errors.confirmPassword?.message}
                                    type="password"
                                    rows={1}
                                    showPasswordToggle={true}
                                    {...field}
                                />
                            )}
                        />
                    </Typography>
                </Box>
                <Box sx={{ mt: "60px" }}>
                    <CustomButton
                        border="none"
                        borderRadius="32px"
                        buttonTextStyle={{ color: "white" }}
                        buttonStyle={{ color: "white" }}
                        ButtonText="Change Password"
                        fontSize="20px"
                        color="white"
                        fontWeight="400"
                        fullWidth={true}
                        variant="contained"
                        padding="16px 0"
                        background="#157AFF"
                        hoverBg="#157A99F"
                        hovercolor="white"
                        type="submit"
                        loading={isLoading}
                    />
                </Box>
            </form>
        </Box>
    );
};
export default ChangePassword;