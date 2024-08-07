import { CFormInput, CButton, CForm, CFormCheck } from "@coreui/react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { LoaderW } from "../components/Loaders";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

import '../css/Login.css'

const Login = () => {
    let parser = new UAParser();
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    // const [accessToken,setAccessToken]= useState(null)
    const setAccessToken = useOutletContext();
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
                "device": `${parser.getBrowser().name} | ${parser.getCPU().architecture} | ${parser.getOS().name}`
                
            });
            console.log(response)
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            setAccessToken(response.data.accessToken)
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
                {import.meta.env.VITE_hi=="hi"?console.log('yes'):console.log("no")}
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
                        <div
                            className="forget-pass-btn"
                        > <NavLink to='forgotPassword' >Forget Password</NavLink> </div>
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
                            width: "100%",
                            backgroundColor: "#010115",
                            color: "white"

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



