import { Box, Typography, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { LoaderW } from "../components/Loaders";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";
import CustomTextField from "../components/CustomInput/CustomInput"; // Adjust the import path as needed
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import '../css/Login.css';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../Redux/userSlice'
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Login = () => {
    let parser = new UAParser();
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const setAccessToken = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userState = useSelector(state => state.user)
    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            sessionStorage.setItem("refreshToken", refreshToken);
            navigate("/dashboard")
        }
    }, []);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const { email, password } = data;
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
                "device": `${parser.getBrowser().name} | ${parser.getCPU().architecture} | ${parser.getOS().name}`
            });
            console.log(response);

            const userData = {
                image: response?.data?.image,
                name: response?.data?.name,
                accessToken: response?.data?.accessToken,
                refreshToken: response?.data?.refreshToken,
                email: response?.data?.email,
                userId: response?.data?._id,
                role: response?.data?.role

            };

            dispatch(login(userData));

            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)

            setAccessToken(response.data.accessToken);
            if (rememberMe) {
                localStorage.setItem("refreshToken", response.data.refreshToken);
            }
            if (response.data.role === "user" || response.data.role === "TL") {
                navigate("/dashboard")

            } else if (response.data.role === "HOD") {
                navigate("/dashboard/admin");
            }
            toast.success("User Logged In Successfully", {
                position: "top-center",
            });
            reset();
        } catch (error) {
            const err = error?.response?.data?.message || error.message;
            toast.error(err, {
                position: "top-center",
            });
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };
    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };


    useEffect(() => {
        console.log(userState)

        dispatch(login({
            accessToken: "23456789",
            isAuthenticated: true
        }))
    }, [])
    return (
        <>
            <Box className="login-container">
                <Box>
                    <Typography sx={{
                        fontWeight: "600",
                        fontSize: "45px",
                        color: "#FFFFFF"
                    }}>Sign in</Typography>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#A0A4A9"
                    }}>Welcome back! Please enter your login details.</Typography>
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
                        <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", marginTop: "30px" }}>
                            <label style={{ color: "white", fontWeight: "400", fontSize: "18px" }}>Password</label>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <CustomTextField
                                        border={true}
                                        error={errors.password?.message}
                                        type="password"
                                        rows={1}
                                        showPasswordToggle={true}
                                        {...field}
                                    />
                                )}
                            />
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControlLabel
                                style={{ color: "white" }}
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleRememberMe}
                                        sx={{
                                            color: "white",
                                            '&.Mui-checked': {
                                                color: "white",
                                            },
                                            // '& .MuiSvgIcon-root': {
                                            //     border: '1px solid white',
                                            // },
                                        }}
                                    />
                                }
                                label="Remember me"
                            />
                            <Box  >
                                <NavLink style={{ color: "white", textDecoration: "none" }} to='forgotPassword'>Forgot Password</NavLink>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: "60px"
                        }}
                    >
                        <CustomButton
                            border="none"
                            borderRadius="32px"
                            buttonTextStyle={{ color: "white" }}
                            buttonStyle={{ color: "white" }}
                            ButtonText="Sign in"
                            fontSize="20px"
                            color="white"
                            fontWeight="400"
                            fullWidth={true}
                            variant="contained"
                            height="70px"
                            background="#157AFF"
                            hoverBg="#157A99F"
                            hovercolor="white"
                            type="submit"
                            loading={isLoading}
                        />
                    </Box>
                </form>
            </Box>
        </>
    );
};
export default Login;