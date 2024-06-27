import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { CForm, CFormInput, CButton } from "@coreui/react";
import { useState } from "react";
import { Loader } from "./Loaders";
import { useParams } from "react-router-dom";
// import "../css/ForgotPassword.css";

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: "get",
        url: `${apiUrl}/api/auth/reset-password?`,
        params:{
          ...data
        }
      });
      console.log(response);
      toast.success("Check your Email");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="sign-heading">Get New Password</h1>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <div className="input-row">
            <div className="custom-input">
              <CFormInput
                id="email"
                type="email"
                floatingLabel="Username or Email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>
          <br />
          <CButton
            color="dark"
            style={{
              width: "100%"
            }}
            variant="outline"
            size="lg"
            type="submit"
          >
            {loading ? <Loader /> : "Get New password"}
          </CButton>
        </CForm>
      </div>
    </>
  );
};
