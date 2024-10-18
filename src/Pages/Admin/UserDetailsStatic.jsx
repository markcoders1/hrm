import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/UserDetailsStatic.css';
import { Loader, LoaderW } from '../../components/Loaders';
import CustomButton from '../../components/CustomButton/CustomButton';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserDetailsStatic = () => {
  const {setHeadertext , setParaText} = useOutletContext()
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
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, make it 12

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Return the formatted time string
  return `${hours}:${formattedMinutes} ${ampm}`;
}

function calculateShiftDuration(fromUnix, toUnix) {
  const diffInSeconds = toUnix - fromUnix; // Calculate the difference in seconds
  const diffInMinutes = Math.floor(diffInSeconds / 60); // Convert total seconds to minutes
  const hours = Math.floor(diffInMinutes / 60); // Get the number of full hours
  const minutes = diffInMinutes % 60; // Get the remaining minutes
  return `${hours} hours and ${minutes} minutes`;
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

useEffect(()=>{
  console.log(calculateShiftDuration(50400000 , 64320000 ))
},[])

  useEffect(() => {
    setHeadertext("User Details");
    setParaText("User Details")
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/admin/getUser`, { params: { id } });
        setUserData(response.data.user);
         setImage(response.data.user.image);
        setUserActive(response.data.user.active);
        setLoading(false);
        console.log(response)
       
      } catch (error) {
        console.error('Error fetching user data:', error);
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // Combine them into the desired format
    return `${month}-${day}-${year}`;
}



  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:"2rem"}}>
       <Box
        sx={{
          border: "1px dashed rgba(197, 197, 197, 0.6)",
          width: { md: "517px", xs: "100%" },
          p: { xs: "1rem 1rem", sm: "1rem 2rem" },
          borderRadius: "7px",
          position: { lg: "fixed", xs: "static" },
          right: "35px",
          top: "10px",
          zIndex: {lg: "1000" , xs:"0"},
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
            {userData.fullName}
          </Typography>
        </Box>
        <Typography>
          <CustomButton
            ButtonText={
              userActive ? (
                "Deactivate"
              ) : (
                "Activate"
              )
            }
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
    <Box className="user-details-container" sx={{p:{sm: "40px 50px", xs:"40px 15px"}}} >
      {/* Full Name, Phone Number, Email */}
      <Box sx={{ display: 'flex', gap: '40px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Full Name</Typography>
          <Typography variant="body1" className="user-details-value">{userData.fullName}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Phone Number</Typography>
          <Typography variant="body1" className="user-details-value">{userData.phone}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33.33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Email</Typography>
          <Typography variant="body1" className="user-details-value">{userData.email}</Typography>
        </Box>
      </Box>

      {/* Address */}
      <Box sx={{ display: 'flex', gap: '40px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }} >
        <Box className="user-details-item" sx={{ flexBasis: '66.66%' }}>
          <Typography variant="subtitle2" className="user-details-label">Address</Typography>
          <Typography variant="body1" className="user-details-value">{userData.address}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Emergency Contact Number</Typography>
          <Typography variant="body1" className="user-details-value">{userData.emergencyNumber?userData.emergencyNumber : "-----" }</Typography>
        </Box>
      </Box>

      {/* CNIC, DOB, Employee ID */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">CNIC</Typography>
          <Typography variant="body1" className="user-details-value">{userData.CNIC}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Date of Birth</Typography>
          <Typography variant="body1" className="user-details-value">{new Date(userData.DOB).toLocaleDateString()}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Employee ID</Typography>
          <Typography variant="body1" className="user-details-value">{userData.companyId}</Typography>
        </Box>
      </Box>

      {/* Password, Shift Timings */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Password</Typography>
          <Typography variant="body1" className="user-details-value">*********</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Shift Timings From</Typography>
          <Typography variant="body1" className="user-details-value">{convertUnixToTime(userData.shiftTimingFrom)}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Shift Timings To</Typography>
          <Typography variant="body1" className="user-details-value">{convertUnixToTime(userData.shiftTimingTo)}</Typography>
        </Box>
      </Box>

      {/* User Role, Lead, Designation */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
      <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Department</Typography>
          <Typography variant="body1" className="user-details-value">{userData.department}</Typography>
        </Box>
      
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Lead</Typography>
          <Typography variant="body1" className="user-details-value">{userData.teamLead}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Designation</Typography>
          <Typography variant="body1" className="user-details-value">{userData.designation}</Typography>
        </Box>
      </Box>

      {/* Working Days, HOD, Department */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px' }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          
          
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
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">HOD</Typography>
          <Typography variant="body1" className="user-details-value">{userData.hod}</Typography>
        </Box>
     
      </Box>

     
    </Box>


    <Box className="user-details-container" sx={{p:{sm: "40px 50px", xs:"40px 15px"}}} >
      {/* Full Name, Phone Number, Email */}
     
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Total Shift Duration</Typography>
          <Typography variant="body1" className="user-details-value">
          {calculateShiftDuration(userData.shiftTimingFrom, userData.shiftTimingTo)}
  </Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Joining Date</Typography>
          <Typography variant="body1" className="user-details-value">{new Date(userData.joiningDate).toLocaleDateString()}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Duration</Typography>
          <Typography variant="body1" className="user-details-value">{calculateYearsAndMonthsFromUnix(userData?.joiningDate)}</Typography>
        </Box>
      </Box>
      {/* CNIC, DOB, Employee ID */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">User Role</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.role}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Annual Leaves</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.annualLeaves}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Net Salary</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.basicSalary}</Typography>
        </Box>
      </Box>

      {/* Password, Shift Timings */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Location Type</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.locationType}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">On Probation</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.onProbation}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Employement type</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.employementType}</Typography>
        </Box>
      </Box>

     
    </Box>
    </Box>
  );
};

export default UserDetailsStatic;
