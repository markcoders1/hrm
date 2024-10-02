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
import "react-toastify/dist/ReactToastify.css";


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

  const convertToUnixTimestamp = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    
    // const now = new Date(); // Get current date
    // now.setHours(hours);
    // now.setMinutes(minutes);
    // now.setSeconds(0);
    // now.setMilliseconds(0);
    // return Math.floor(now.getTime() / 1000); // Return as Unix timestamp
    const valueToSend = new Date(1970,0,1,hours,minutes).valueOf()
    console.log("sending value",valueToSend)

    return valueToSend
  };

  const handleCheckInOutSubmit = async (data) => {
    setSnackAlertData({
      open: false,
      message: "",
      severity: "success",
    });

    try {
      setLoading(true);

      // Convert time to Unix timestamp
      const checkInUnix = convertToUnixTimestamp(data.checkIn).toString(); 
      const checkOutUnix = convertToUnixTimestamp(data.checkOut).toString(); 

      console.log("Check-In Unix Timestamp:", checkInUnix.toString());
      console.log("Check-Out Unix Timestamp:", checkOutUnix.toString());
      console.log("Check ID:", checkId);

      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/check`, // Replace with your endpoint
        method: "put",
        data: {
          checkId, // Assuming `checkId` is passed from the parent component for editing
          checkIn: checkInUnix,
          checkOut: checkOutUnix,
        },
      });

      setLoading(false);
      if (response) {
        toast.success(response.data.message , {
          position: "top-center",
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
              Update Check-In and Check-Out Time
            </Typography>
            <Box sx={{ mt: "20px", display:"flex", flexDirection:"column", gap:"20px" }}>
              {/* Check-In Time */}
              <Controller
                name="checkIn"
                control={control}
                defaultValue=""
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
