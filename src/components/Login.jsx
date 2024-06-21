import { CFormInput, CButton, CForm, CFormCheck } from "@coreui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { LoaderW } from "./Loaders";
import { useState, useEffect } from "react";
import '../css/Login.css'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            sessionStorage.setItem("refreshToken", refreshToken);
            navigate("/checkin")
        }

    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
            });

            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            if (rememberMe) {
                localStorage.setItem("refreshToken", response.data.refreshToken);
            }
            navigate("/checkin");
            toast.success("User Logged In Successfully", {
                position: "top-center",
            });
            reset();
        } catch (error) {
            const err = error?.response?.data?.message || error.message;
            toast.error(err, {
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <>
            <div className="login-container">
                <h1 className="Login-Header">Login</h1>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="loginFields">
                        <CFormInput
                            type="email"
                            id="email"
                            floatingClassName="mb-3"
                            floatingLabel="Email address"
                            placeholder="name@example.com"
                            {...register("email", { required: "Email is required" })}
                            size="lg"
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                        <CFormInput
                            type="password"
                            id="password"
                            floatingClassName="mb-3"
                            floatingLabel="Password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            size="lg"
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                        <CFormCheck
                            className="mb-3"
                            label="Remember Me"
                            checked={rememberMe}
                            onChange={handleRememberMe}
                        />
                    </div>
                    <CButton

                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width:"100%",
                            backgroundColor:"#010115",
                            color:"white"

                        }}

                        color="dark" variant="outline" size="lg" type="submit">
                        {isLoading ? <LoaderW /> : "Login"}
                    </CButton>
                </CForm>
            </div>
        </>
    );
};

export default Login;



