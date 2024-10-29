import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/UserDetailsStatic.css";
import { Loader, LoaderW } from "../../components/Loaders";
import CustomButton from "../../components/CustomButton/CustomButton";
import FileUpload from "../../components/FileUpload/FileUpload";
import FileDisplay from "../../components/FileDisplay/FileDisplay";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserDetailsStatic = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState();
  const [userActive, setUserActive] = useState(null);
  const daysOfWeek = ["", "M", "T", "W", "Th", "F", "S", ""];

  function convertUnixToTime(unixTimestamp) {
    // Create a Date object from the Unix timestamp (milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, make it 12

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time string
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  // function calculateShiftDuration(fromUnix, toUnix) {
  //   const diffInSeconds = toUnix - fromUnix; // Calculate the difference in seconds
  //   const diffInMinutes = Math.floor(diffInSeconds / 60); // Convert total seconds to minutes
  //   const hours = Math.floor(diffInMinutes / 60); // Get the number of full hours
  //   const minutes = diffInMinutes % 60; // Get the remaining minutes
  //   return `${hours} hours and ${minutes} minutes`;
  // }
  function calculateShiftDuration(fromUnix, toUnix) {
    // Ensure that the Unix timestamps are numbers
    if (typeof fromUnix !== "number" || typeof toUnix !== "number") {
      throw new Error(
        "Both fromUnix and toUnix must be numbers representing Unix timestamps in seconds."
      );
    }

    let adjustedToUnix = toUnix;

    // Check if toUnix is earlier than fromUnix
    if (toUnix < fromUnix) {
      // Assume the shift crosses midnight and add 24 hours (in seconds) to toUnix
      adjustedToUnix += 24 * 3600;
    }

    const diffInSeconds = adjustedToUnix - fromUnix;

    // Prevent negative durations (in case adjustedToUnix is still less than fromUnix)
    const positiveDiffInSeconds = Math.max(diffInSeconds, 0);

    const totalMinutes = Math.floor(positiveDiffInSeconds / 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Full hours
    const minutes = totalMinutes % 60; // Remaining minutes

    // Handle singular and plural forms
    const hoursLabel = hours === 1 ? "hour" : "hours";
    const minutesLabel = minutes === 1 ? "minute" : "minutes";

    return `${hours} ${hoursLabel} ${minutes} ${minutesLabel}`;
  }
  function calculateYearsAndMonthsFromUnix(joiningUnix) {
    const today = new Date(); // Current date
    const joiningDate = new Date(joiningUnix); // Convert Unix timestamp to Date

    let years = today.getFullYear() - joiningDate.getFullYear(); // Difference in years
    let months = today.getMonth() - joiningDate.getMonth(); // Difference in months

    // If months are negative, subtract a year and add 12 to months
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years and ${months} months`;
  }

  // Example usage:
  const joiningUnixTimestamp = 1562889600000; // Example: January 1, 2013 (Unix timestamp in seconds)
  console.log(calculateYearsAndMonthsFromUnix(joiningUnixTimestamp));

  useEffect(() => {
    console.log(calculateShiftDuration(50400000, 64320000));
  }, []);

  useEffect(() => {
    setHeadertext("User Details");
    setParaText("User Details");
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `${apiUrl}/api/admin/getUser`,
          { params: { id } }
        );
        setUserData(response.data.user);
        setImage(response.data.user.image);
        setUserActive(response.data.user.active);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserDetails();
  }, [id]);

  if (loading) {
    return (
      <Box className="loaderContainer">
        <Loader />
      </Box>
    );
  }

  function convertTimestampToDate(timestamp) {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Extract the month, day, and year from the date
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Combine them into the desired format
    return `${month}-${day}-${year}`;
  }
  const formatName = (fullName) => {
    const name = fullName.toLowerCase().includes("muhammad")
      ? fullName.replace(/wildcard|muhammad/i, "M.")
      : fullName;
    return name;
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "2rem", mb: "50px" }}
    >
        <Box
        sx={{
          border: "1px dashed rgba(197, 197, 197, 0.6)",
          width: { lg: "517px", xs: "100%" },
          p: { xs: "1rem 1rem", sm: "1rem 1rem" },
          borderRadius: "7px",
          position: { lg: "absolute", xs: "static" },
          right: "35px",
          top: "20px",
          zIndex: "1000000000 !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <img
            src={userData?.image}
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
            alt=""
          />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            {formatName(userData?.fullName)}
          </Typography>
        </Box>
        <Typography>
          <CustomButton
          
            ButtonText = {userData?.active ? "Activated" : "Deactivated"}
            fontSize="14px"
            color="rgba(49, 186, 150, 1)"
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            background="transparent"
            hoverBg="#157AFF"
            border="1px solid rgba(49, 186, 150, 1)"
            hoverBorder="none"
            hovercolor="white"
            width={"124px"}
            borderRadius="7px"
            height="38px"
            // onClick={ToggleUserStatus}
          />
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px dashed rgba(197, 197, 197, 0.6)",
          width: { md: "517px", xs: "100%" },
          p: { xs: "1rem 1rem", sm: "1rem 2rem" },
          borderRadius: "7px",
          position: { lg: "absolute", xs: "static" },
          right: "35px",
          top: "10px",
          zIndex: "1000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <img
            src={image}
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
            alt=""
          />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            {userData?.fullName}
          </Typography>
        </Box>
        <Typography>
          <CustomButton
            ButtonText={userActive ? "Deactivate" : "Activate"}
            fontSize="14px"
            color="rgba(49, 186, 150, 1)"
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            background="transparent"
            hoverBg="white"
            border="1px solid rgba(49, 186, 150, 1)"
            hoverBorder="1px solid rgba(49, 186, 150, 1)"
            hovercolor="white"
            width={"124px"}
            borderRadius="7px"
            height="38px"
          />
        </Typography>
      </Box>
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
              {userData?.fullName}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Phone Number
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.phone}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33.33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Email
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.email}
            </Typography>
          </Box>
        </Box>

        {/* Address */}
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
          <Box className="user-details-item" sx={{ flexBasis: "66.66%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Address
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.address}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Emergency Contact Number
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.emergencyNumber ? userData.emergencyNumber : "-----"}
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
              {userData.CNIC}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Date of Birth
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {new Date(userData.DOB).toLocaleDateString()}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Employee ID
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.companyId}
            </Typography>
          </Box>
        </Box>

        {/* Password, Shift Timings */}
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
              *********
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Shift Timings From
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {convertUnixToTime(userData.shiftTimingFrom)}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Shift Timings To
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {convertUnixToTime(userData.shiftTimingTo)}
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
              Department
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.department}
            </Typography>
          </Box>

          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Lead
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.teamLead}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Designation
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.designation}
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
            <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
              <Typography variant="subtitle2" className="user-details-label">
                Working Days
              </Typography>
              <Box
                variant="body1"
                className="user-details-value"
                sx={{
                  display: "flex",
                  gap: "0.4rem",
                }}
              >
                {userData.workDays &&
                  userData.workDays.map((day, index) => (
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
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              HOD
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData.hod}
            </Typography>
          </Box>
        </Box>
      </Box>

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
              Total Shift Duration
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {calculateShiftDuration(
                userData.shiftTimingFrom,
                userData.shiftTimingTo
              )}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Joining Date
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {new Date(userData.joiningDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Duration
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {calculateYearsAndMonthsFromUnix(userData?.joiningDate)}
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
              User Role
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.role}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Annual Leaves
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.annualLeaves}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Net Salary
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.basicSalary}
            </Typography>
          </Box>
        </Box>

        {/* Password, Shift Timings */}
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
              Location Type
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.locationType}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              On Probation
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.onProbation}
            </Typography>
          </Box>
          <Box className="user-details-item" sx={{ flexBasis: "33%" }}>
            <Typography variant="subtitle2" className="user-details-label">
              Employement type
            </Typography>
            <Typography variant="body1" className="user-details-value">
              {userData?.employementType}
            </Typography>
          </Box>
        </Box>

        {/* Documents */}
      </Box>
      <Box
        className="user-details-container"
        sx={{
          p: {
            sm: "0px 0px",
            xs: "0px 0px",
            border: "none",
            marginTop: "80px !important",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
          gap: "5rem",
          mt: "100px",
        }}
      >
        <Typography
          sx={{
            color: "#010120",
            fontWeight: "600",
            fontSize: { xl: "40px", xs: "30px" },
          }}
        >
          Documents
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "3rem",
          }}
        >
          <FileDisplay
            label="CNIC Front"
            fileUrl={userData?.documents?.CNICFront}
            labeStyling={{ border: "none" }}
          />
          <FileDisplay
            label="CNIC Back"
            labeStyling={{ border: "none" }}
            fileUrl={userData?.documents?.CNICBack}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "3rem",
            
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FileDisplay
            label="Last Educational (Certificate/Marksheet)"
            fileUrl={userData?.documents?.EducationalCert}
            labeStyling={{ border: "none" }}
            disabled={true}
          />
          <FileDisplay
            label="Last Employer (Employment Letter or Experience)"
            fileUrl={userData?.documents?.EmploymentLetter}
            labeStyling={{ border: "none" }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "3rem",
            zIndex:"00"
          }}
        >
          <FileDisplay
            label="Last Employer Pay slip"
            fileUrl={userData?.documents?.Payslip} // Pass the URL for viewing
            labelStyling={{ border: "none" }}
          />
          <FileDisplay
            label="Photograph-Passport Size (No Selfies)"
            fileUrl={userData?.documents?.photograph} // Pass the URL for viewing
            labelStyling={{ border: "none" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailsStatic;
