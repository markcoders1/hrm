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

const CheckInOutModal = ({ open = false, handleClose = () => {}, checkId }) => {
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

  const handleCheckInOutSubmit = async (data) => {
    setSnackAlertData({
      open: false,
      message: "",
      severity: "success",
    });

    try {
      setLoading(true);
      console.log(data)

      // Extract just the time value as strings (hours and minutes)
      const checkInTime = data.checkIn; // Already in "HH:mm" format
      const checkOutTime = data.checkOut; // Already in "HH:mm" format

      // Log for debugging purposes
      console.log("Check-In Time:", checkInTime);
      console.log("Check-Out Time:", checkOutTime);
      console.log(checkId)

      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/check`, // Replace with your endpoint
        method: "put",
        data: {
            checkId, // Assuming `checkId` is passed from the parent component for editing
          checkIn: checkInTime,
          checkOut: checkOutTime,
        },
      });

      setLoading(false);
      if (response) {
        setSnackAlertData({
          open: true,
          message: response?.data?.message,
          severity: "success",
        });
      }
      reset();
      handleClose(); // Close the modal on success
    } catch (error) {
      console.log(error);
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
              Set Check-In and Check-Out Time
            </Typography>
            <Box sx={{ mt: "20px", display:"flex", flexDirection:"column", gap:"20px" }}>
              {/* Check-In Time */}
              <Controller
                name="checkIn"
                control={control}
                defaultValue=""
                // rules={{ required: "Check-In time is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Check-In Time"
                    error={errors.checkIn?.message}
                    type="time"
                    {...field}
                  />
                )}
              />

              {/* Check-Out Time */}
              <Controller
                name="checkOut"
                control={control}
                defaultValue=""
                // rules={{ required: "Check-Out time is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Check-Out Time"
                    error={errors.checkOut?.message}
                    type="time"
                    {...field}
                  />
                )}
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <CustomButton
                  loading={loading}
                  borderRadius="7px"
                  background="#157AFF"
                  hoverBg="white"
                  hovercolor="#1A0049"
                  ButtonText="Submit"
                  fontSize="18px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="10px 20px"
                  onClick={handleSubmit(handleCheckInOutSubmit)}
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

export default CheckInOutModal;
