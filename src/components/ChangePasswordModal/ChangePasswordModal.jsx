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
      md: "600px",
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
      setLoading(false);
      if (response) {
        setSnackAlertData({
          open: true,
          message: response?.data?.message,
          severity: "success",
        });
        if (response?.code > 200) {
          setSnackAlertData({
            open: true,
            message: response?.message,
            severity: "error",
          });
        }
      }
      reset();
    } catch (error) {
      setLoading(false);
      setSnackAlertData({
        open: true,
        message: error.toString(),
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
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Change Password
            </Typography>
            <Box sx={{ mt: "20px", display:"flex", flexDirection:"column", gap:"20px" }}>
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
                    id = "pass"
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
                    id = "newPass"

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
                    id = "conPass"

                  />
                )}
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <CustomButton
                  loading={loading}
                  // border="2px solid #1A0049"
                  borderRadius="7px"
                  background="#157AFF"
                  hoverBg="white"
                  hovercolor="#1A0049"
                  buttonTextStyle={{}}
                  buttonStyle={{
                    padding: {
                      xs: "20px 40px",
                    },
                  }}
                  ButtonText="Change Password"
                  //  buttonStyle={{ fontSize: { sm: "18px", xs: "15px" } }}

                  fontSize="18px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="10px 20px"
                  onClick={handleSubmit(resetPassword)}
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
