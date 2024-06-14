import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../auth/axiosInstance";
import { CForm, CFormInput, CButton } from "@coreui/react";
// import "../css/ForgotPassword.css";

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: `${apiUrl}/api/reset-password`,
        data: { email: data.email },
      });
      console.log(response);
      toast.success("Check your Email");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <h1
        style={{
          marginLeft:"50px"
        }}
        className="sign-heading">Get New Password</h1>
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
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
          </div>
          {/* <div className="login-btn">  */}
          <CButton color="primary" variant="outline" size="lg" type="submit">
            Get New Password
          </CButton>

        </CForm>
      </div>
    </>
  );
};
