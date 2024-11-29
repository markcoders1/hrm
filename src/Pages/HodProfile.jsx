import { useEffect, useState } from "react";
import "../PagesCss/UserDetailsStatic.css"; // Use the same CSS file for consistent styling
import axiosInstance from "../auth/axiosInstance";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Loader } from "../components/Loaders";
import CustomButton from "../components/CustomButton/CustomButton";
import dotpng from "../assets/dot.png";
import Tooltip from "@mui/material/Tooltip";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import ChangePasswordModal from "../components/ChangePasswordModal/ChangePasswordModal";
import { useQuery } from "@tanstack/react-query";


import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SpinnerLoader from "../components/SpinnerLoader";

const fetchUserProfile = async (id) => {
  const response = await axiosInstance.get(`${apiUrl}/api/getUser`, {
    params: { id },
  });
  return response.data.user;
};

const HodProfile = () => {
  const navigate = useNavigate();
  const { setHeadertext , setParaText} = useOutletContext();
  const { id } = useParams();
  // const [yourData, setYourData] = useState({});
  const [loading, setLoading] = useState(false);
  const daysOfWeek = ["", "M", "T", "W", "Th", "F", "S", ""];
  const [open, setOpen] = useState(false);

  setHeadertext("HOD Profile");
  setParaText(" ");
  


  const { data: yourData, isPending } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => fetchUserProfile(id),
    staleTime: 600000, 
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching profile data.");
    },
  });

  if (isPending) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear().toString().slice(-2)}`;
  };

  const handleNavigate = (profileData) => {
    // Store the sauce data in local storage or state
    // localStorage.setItem("selectedSauce", JSON.stringify(sauceData));
    // Navigate to the next page
    navigate(`/dashboard/profile/edit-profile`, { state: profileData });
  };

  return (
    <Box>
      <Box
        className="user-details-container"
        sx={{ p: { sm: "40px 50px", xs: "40px 15px" } }}
      >
        {/* Full Name, Phone Number, Email */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { md: "row", xs: "column" },
            mb: "20px",
            pb: "20px",
            borderBottom: { md: "1px solid #E0E0E0", xs: "none" },
          }}
        >
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Full Name
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.fullName || "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Phone Number
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.phone || "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Email
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.email || "--- ---"}
            </Typography>
          </Box>
        </Box>

        {/* Address */}
        <Box
          sx={{
            mb: "20px",
            pb: "20px",
            borderBottom: { md: "1px solid #E0E0E0", xs: "none" },
            gap: {
              // md:"0rem", xs:"2rem"
            },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box className="user-details-item" sx={{ flexBasis: "68%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Address
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.address || "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "30%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Emergency Number
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.emergencyNumber || "--- ---"}
            </Typography>
          </Box>
        </Box>

        {/* CNIC, DOB, Employee ID */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { md: "row", xs: "column" },
            mb: "20px",
            pb: "20px",
            borderBottom: { md: "1px solid #E0E0E0", xs: "none" },
          }}
        >
        
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Date of Birth
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.DOB
                ? new Date(yourData?.DOB).toLocaleDateString()
                : "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Employee ID
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.companyId || "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Department
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.department || "--- ---"}
            </Typography>
          </Box>
        </Box>

        {/* Password, Shift Timings From/To */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { md: "row", xs: "column" },
            mb: "20px",
            pb: "20px",
            borderBottom: { md: "1px solid #E0E0E0", xs: "none" },
          }}
        >
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Password
            </Typography>
            <Typography
              variant="body1"
              className="user-details-value"
              sx={{ display: "flex" }}
            >
              <Box>
                <img src={dotpng} alt="" />
                &nbsp;
                <img src={dotpng} alt="" />
                &nbsp;
                <img src={dotpng} alt="" /> <img src={dotpng} alt="" />{" "}
                <img src={dotpng} alt="" /> <img src={dotpng} alt="" />{" "}
                <img src={dotpng} alt="" /> <img src={dotpng} alt="" />
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </Box>
              <Tooltip title="Update Password">
                <CustomButton
                  ButtonText="Update Password"
                  fontSize="12px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="8px 0px"
                  type="submit"
                  background="#157AFF"
                  hoverBg="#303f9f"
                  hovercolor="white"
                  height="37.19px"
                  width={"135px"}
                  borderRadius="7px"
                  buttonStyle={{ mt: "-17px" }}
                  onClick={() => setOpen(true)}
                />{" "}
              </Tooltip>
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              User Role
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.role || "--- ---"}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Designation
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {yourData?.designation || "--- ---"}
            </Typography>
          </Box>
        </Box>


        {/* Working Days, HOD, Department */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { md: "row", xs: "column" },
            mb: "20px",
            
          }}
        >
          {yourData?.workDays?.length > 1 && (
            <>
              <Box className="user-details-item" sx={{ flexBasis: "33%", border:"none !important" }}>
                <Typography variant="subtitle2" className="user-details-label">
                  Working Days
                </Typography>
                <Box
                  variant="body1"
                  className="user-details-value"
                  sx={{
                    display: "flex",
                    gap: "0.4rem",
                     border:"none !important"
                  }}
                >
                  {yourData?.workDays &&
                    yourData?.workDays.map((day, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: "41px",
                          height: "41px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          backgroundColor: "#157AFF",
                          color: "#fff",
                          border: "1px solid #DCDCDC",
                          marginRight: "5px",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                          fontWeight: "500",
                        }}
                      >
                        {daysOfWeek[day]}
                      </Box>
                    ))}
                </Box>
              </Box>
            </>
          )}
          
        </Box>
      </Box>
      {/* <br /> */}
      {/* Edit Password & Request Changes */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { md: "row" },
          justifyContent: "end",
          mt: "60px",
        }}
      >
        <Tooltip title="Edit Your Profile ">
          <CustomButton
            ButtonText="Edit "
            fontSize="16px"
            color="white"
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            padding="8px 0px"
            type="submit"
            background="#157AFF"
            hoverBg="#303f9f"
            hovercolor="white"
            width={"100px"}
            borderRadius="7px"
            buttonStyle={{ mt: "-17px" }}
            height="45px"
            onClick={() => handleNavigate(yourData)}
          />{" "}
        </Tooltip>
      </Box>

      <ChangePasswordModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default HodProfile;
