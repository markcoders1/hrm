import { Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { useState } from "react";
import { LoaderW } from "../components/Loaders";
import { useParams } from "react-router-dom";
import CustomTextField from "../components/CustomInput/CustomInput"; // Adjust the import path as needed
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import '../css/Login.css'; // Assuming you want to use the same CSS as Login
export const ForgotPassword = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: "get",
        url: `${apiUrl}/api/auth/reset-password?`,
        params: {
          ...data
        }
      });
      console.log(response);
      toast.success("Check your Email", {
        position: "top-center",
      });
      setLoading(false);
    } catch (error) {
      const err = error?.response?.data?.message || error.message;
      toast.error(err, {
        position: "top-center",
      });
      setLoading(false);
    }
  };
  return (
    <Box className="login-container">
      <Box>
        <Typography sx={{
          fontWeight: "600",
          fontSize: "45px",
          color: "#FFFFFF"
        }}>Enter Your Email</Typography>
        <Typography sx={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#A0A4A9"
        }}>Enter your email to reset your password.</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="loginFields">
          <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", marginTop: "30px" }}>
            <label style={{ color: "white", fontWeight: "400", fontSize: "18px" }}>Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <CustomTextField
                  border={true}
                  error={errors.email?.message}
                  type="email"
                  rows={1}
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
            ButtonText="Get New Password"
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
            loading={loading}
          />
        </Box>
      </form>
    </Box>
  );
};