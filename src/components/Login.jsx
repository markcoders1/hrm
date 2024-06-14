import { CFormInput, CButton, CForm, CFormCheck } from "@coreui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../auth/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useState } from "react";



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onError = (error) => {
        console.log(error)
    }

    const onSubmit = async (data) => {
        const { email, password } = data;
        setIsLoading(true);
        console.log(data)
        try {
            const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
            });

            sessionStorage.setItem("accessToken", response.data.accessToken)
            sessionStorage.setItem("refreshToken", response.data.refreshToken)

            navigate("/checkin");
            toast.success("User Logged In Successfully", {
                position: "top-center",
            });
            reset();
        } catch (error) {
            // console.log(error)
            const err = error?.response?.data?.message[0].message || error
            //  console.log(err)
            toast.error(err, {
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="Login-Header">Login</h1>
            <CForm onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="loginFields">
                    <CFormInput type="email" id="email" floatingClassName="mb-3" floatingLabel="Email address" placeholder="name@example.com" {...register("email", { required: "email is required", })} size="lg" />
                    <CFormInput type="password" id="password" floatingClassName="mb-3" floatingLabel="Password" placeholder="Password" {...register("password", { required: "Password is required", })} size="lg" />
                    <CFormCheck className="mb-3" label="Remember Me !" onChange={(e) => { console.log(e.target) }} />
                </div>
                <CButton color="primary" variant="outline" size="lg" type="submit">{isLoading ? <Loader /> : "Login"}</CButton>
            </CForm>
        </>
    )
}

export default Login






















// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import "../css/Login.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../Redux/userSlice";
// import EyeOpen from "/eye-open.png";
// import EyeClosed from "/eye-close.png";
// import axiosInstance from "../auth/axiosInstance";

// import Form from 'react-bootstrap/Form'
// import { FloatingLabel } from "react-bootstrap";

// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// const Login = () => {
//     const [passwordImage, setPasswordImage] = useState(EyeOpen);
//     const [passwordType, setPasswordType] = useState("password");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm();

//     const onSubmit = async (data) => {
//         const { email, password } = data;
//         try {
//             const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, {
//                 email,
//                 password,
//             });

//             sessionStorage.setItem("accessToken",response.data.accessToken)
//             sessionStorage.setItem("refreshToken",response.data.refreshToken)

//             const userData = response.data;
//             dispatch(login(userData));
//             navigate("/checkin");
//             toast.success("User Logged In Successfully", {
//                 position: "top-center",
//             });
//             reset();
//         } catch (error) {
//             console.log(error)
//             // const err =error?.response?.data?.message||error

//             // if(typeof err!=="object"){
//             //     err.forEach((e)=>{
//             //         toast.error(e.message,{position: "top-center"})
//             //     })
//             // }else if(typeof err==="string"){
//             //     toast.error(err,{position: "top-center"})
//             // }else{
//             //     console.log(err)
//             // }
//         }
//     };

//     const togglePasswordVisibility = () => {
//         if (passwordType === "password") {
//             setPasswordType("text");
//             setPasswordImage(EyeClosed);
//         } else {
//             setPasswordType("password");
//             setPasswordImage(EyeOpen);
//         }
//     };

//     return (
//         <>

//             <div className="outlet-box">
//                 <h1 className="sign-heading">Log in</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="input-row">
//                         <div className="custom-input">
//                             <label htmlFor="email">
//                                 Username or Email
//                             </label>
//                             <input
//                                 id="email"
//                                 type="text"
//                                 placeholder="Email"
//                                 {...register("email", {
//                                     required: "Email is required",
//                                 })}
//                             />
//                             {errors.email && (
//                                 <span className="error-message">
//                                     Email is required
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className="input-row">
//                         <div className="custom-input">
//                             <label id="password-label" onClick={()=>navigate('/forgotPassword')}>
//                                 <span>Password</span>
//                                 <span>Forgot Password?</span>
//                             </label>
//                             <div className="password-field">
//                                 <input
//                                     id="password"
//                                     type={passwordType}
//                                     placeholder="Password"
//                                     {...register("password", {
//                                         required:
//                                             "Password is required",
//                                     })}
//                                 />
//                                 <span
//                                     onClick={togglePasswordVisibility}>
//                                     <img
//                                         id="icon"
//                                         src={passwordImage}
//                                         alt="Toggle Password Visibility"
//                                     />
//                                 </span>
//                             </div>
//                             {errors.password && (
//                                 <span className="error-message">
//                                     Password is required
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className="login-btn">
//                         <input type="submit" value="Login" />
//                     </div>
//                 </form>
//             </div>

//         </>
//     );
// };

// export default Login;
