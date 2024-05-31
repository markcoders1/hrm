import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import EyeOpen from "../../assets/eye-open.png";
import EyeClosed from "../../assets/eye-close.png";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Login = () => {
    const [passwordImage, setPasswordImage] = useState(EyeOpen);
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                email,
                password,
            });

            const userData = response.data;
            dispatch(login(userData));
            navigate("/checkin");
            toast.success("User Logged In Successfully", {
                position: "top-center",
            });
            reset();
        } catch (error) {
            toast.error(error.message || "Failed to log in", {
                position: "top-center",
            });
        }
    };

    const togglePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            setPasswordImage(EyeClosed);
        } else {
            setPasswordType("password");
            setPasswordImage(EyeOpen);
        }
    };

    return (
        <>

            <div className="outlet-box">
                <h1 className="sign-heading">Log in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <div className="custom-input">
                            <label htmlFor="email">
                                Username or Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <span className="error-message">
                                    Email is required
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="custom-input">
                            <label id="password-label" onClick={()=>navigate('/forgotPassword')}>
                                <span>Password</span>
                                <span>Forgot Password?</span>
                            </label>
                            <div className="password-field">
                                <input
                                    id="password"
                                    type={passwordType}
                                    placeholder="Password"
                                    {...register("password", {
                                        required:
                                            "Password is required",
                                    })}
                                />
                                <span
                                    onClick={togglePasswordVisibility}>
                                    <img
                                        id="icon"
                                        src={passwordImage}
                                        alt="Toggle Password Visibility"
                                    />
                                </span>
                            </div>
                            {errors.password && (
                                <span className="error-message">
                                    Password is required
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="login-btn">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>

        </>
    );
};

export default Login;
