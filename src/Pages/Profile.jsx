import { useEffect, useState } from "react";
import "../PagesCss/UserDetailsStatic.css"; // Use the same CSS file for consistent styling
import axiosInstance from "../auth/axiosInstance";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Loader } from "../components/Loaders";
import CustomButton from "../components/CustomButton/CustomButton";
import dotpng from "../assets/dot.png";
import Tooltip from '@mui/material/Tooltip';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { setHeadertext } = useOutletContext();
  const { id } = useParams();
  const [yourData, setYourData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/getUser`,
          method: "get",
          params: { id },
        });
        setYourData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProfileInfo();
    setHeadertext("My Profile");
  }, [id, setHeadertext]);

  if (loading) {
    return (
      <Box className="loaderContainer">
        <Loader />
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
    navigate(`/dashboard/profile/edit-profile`, {state:profileData});
  };

  return (
    <Box >
            <Box
      className="user-details-container"
      sx={{ p: { sm: "40px 50px", xs: "40px 15px" } }}
    >
      {/* Full Name, Phone Number, Email */}
      <Box
        sx={{
          display: "flex",
          gap: "40px",
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
        }}
      >
        <Box className="user-details-item" sx={{ flexBasis: "100%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            Address
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.address || "--- ---"}
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
            CNIC
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.CNIC || "--- ---"}
          </Typography>
        </Box>
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
          <Typography variant="body1" className="user-details-value">
            <img src={dotpng} alt="" />
            &nbsp;
            <img src={dotpng} alt="" />
            &nbsp;
            <img src={dotpng} alt="" /> <img src={dotpng} alt="" />{" "}
            <img src={dotpng} alt="" /> <img src={dotpng} alt="" />{" "}
            <img src={dotpng} alt="" /> <img src={dotpng} alt="" />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Tooltip title="Edit Password">
            <CustomButton
              ButtonText="Edit Password"
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
              width={"125px"}
              borderRadius="7px"
              buttonStyle={{ mt: "-17px" }}
            />{" "}
            </Tooltip>
          </Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            Shift Timings From
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.shiftTimingFrom || "--- ---"}
          </Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            Shift Timings To
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.shiftTimingTo || "--- ---"}
          </Typography>
        </Box>
      </Box>

    

      {/* User Role, Lead, Designation */}
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
            Designation
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.designation || "--- ---"}
          </Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            Line Manager
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.TL || "--- ---"}
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

      {/* Working Days, HOD, Department */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { md: "row", xs: "column" },
          mb: "20px",
        }}
      >
        <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            Working Days
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.workingDays ? yourData?.workingDays.join(", ") : "--- ---"}
          </Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
          <Typography variant="subtitle2" className="user-details-label">
            HOD
          </Typography>
          <Typography variant="body1" className="user-details-value">
            {yourData?.HOD || "--- ---"}
          </Typography>
        </Box>
      
      </Box>

    </Box>
     <br />
     {/* Edit Password & Request Changes */}
     <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "end",
          mt:"20px"
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
    </Box>

  );
};

export default Profile;
