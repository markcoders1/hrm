import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CustomButton from "../CustomButton/CustomButton";
import SnackAlert from "../SnackAlert/SnackAlert";
import axiosInstance from "../../auth/axiosInstance";
import CustomInputLabel from "../CustomInputField/CustomInputLabel";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangePasswordModal = ({ open = false, handleClose = () => {} }) => {
  const [loading, setLoading] = React.useState(false);
  const [snackAlertData, setSnackAlertData] = React.useState({
    message: "",
    severity: "success",
    open: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90%",
      md: "474px",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    outline: "none",
    borderRadius: "20px",
    p: 4,
  };

  const resetPassword = async (data) => {
    setSnackAlertData({
      open: false,
      message: "",
      severity: "success",
    });

    if (data.newPassword !== data.confirmPassword) {
      return setSnackAlertData({
        open: true,
        message: "New Password and Confirm password must be the same.",
        severity: "error",
      });
    }

    try {
      setLoading(true);
      const response = await axiosInstance({
        url: `${apiUrl}/api/change-password`,
        method: "post",
        data: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });
      console.log(response);
      setLoading(false);
      if (response) {
        toast.success(response?.data?.message)
       
        if (response?.code > 200) {
        toast.success(response?.data?.message)

        }
      }
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSnackAlertData({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        
        sx={{  border:"none !important", outline:"none"}}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mt: "20px",
                color: "#010120",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "26px",
              }}
            >
              Change Password
            </Typography>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Controller
                name="oldPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Old Password is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    showPasswordToggle={true}
                    error={errors.oldPassword?.message}
                    label="Old Password"
                    type="password"
                    {...field}
                    id="pass"
                  />
                )}
              />

              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{ required: "New Password is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    error={errors.newPassword?.message}
                    label="New Password"
                    showPasswordToggle={true}
                    type="password"
                    {...field}
                    id="newPass"
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Confirm Password is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Confirm Password"
                    showPasswordToggle={true}
                    error={errors.confirmPassword?.message}
                    type="password"
                    {...field}
                    id="conPass"
                  />
                )}
              />

              <Box sx={{ display: "flex", justifyContent: "center", }}>
                <CustomButton
                  ButtonText={loading ? "Deleting..." : "Confirm"}
                  background="#157AFF"
                  hoverBg="white"
                  hovercolor="#010120"
                  fontSize="16px"
                  color="white"
                  fontWeight="500"
                  borderRadius="7px"
                  onClick={handleSubmit(resetPassword)}
                  loading={loading}
                  fullWidth={false}
                  height="45px"
                  width={"140px"}
                  hoverBorder="1px solid #010120"
                  border="1px solid #157AFF"
                  
                />
               
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <SnackAlert
        message={snackAlertData.message}
        severity={snackAlertData.severity}
        open={snackAlertData.open}
        handleClose={() => {
          setSnackAlertData((prev) => ({ ...prev, open: false }));
        }}
      />
    </>
  );
};

export default ChangePasswordModal;
