import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/UserDetailsStatic.css';
import { Loader } from '../../components/Loaders';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserDetailsStatic = () => {
  const {setHeadertext , setParaText} = useOutletContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setHeadertext("User Details");
    setParaText("User Details")
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/admin/getUser`, { params: { id } });
        setUserData(response.data.user);
        setLoading(false);
       
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

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:"2rem"}}>
        <Box
        sx={{
          border: "1px dashed #C5C5C5",
          width: "517px",
          p: "1rem",
          borderRadius: "7px",
          position: { lg: "fixed", xs: "static" },
          right: "40px",
          top: "20px",
          zIndex: "100000 ",
        }}
      >
        <Box sx={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <img src="" style={{ width: "64px", height: "64px" }} alt="" />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            Aman Raza Khan
          </Typography>
        </Box>
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
          <Typography variant="body1" className="user-details-value">{userData.shiftTimingFrom}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Shift Timings To</Typography>
          <Typography variant="body1" className="user-details-value">{userData.shiftTimingTo}</Typography>
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
          <Typography variant="subtitle2" className="user-details-label">Working Days</Typography>
          <Typography variant="body1" className="user-details-value">{userData.workingDays}</Typography>
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
          <Typography variant="body1" className="user-details-value">{userData?.shiftTimingFrom - userData?.shiftTimingTo}Hours</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Joining Date</Typography>
          <Typography variant="body1" className="user-details-value">{new Date(userData.DOB).toLocaleDateString()}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Duration</Typography>
          <Typography variant="body1" className="user-details-value">{userData?.joiningDate} Years</Typography>
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
          <Typography variant="body1" className="user-details-value">{userData?.netSalary}</Typography>
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
          <Typography variant="body1" className="user-details-value">{userData?.employmentType}</Typography>
        </Box>
      </Box>

     
    </Box>
    </Box>
  );
};

export default UserDetailsStatic;
