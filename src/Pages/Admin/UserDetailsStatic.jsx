import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/UserDetailsStatic.css';
import { Loader } from '../../components/Loaders';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserDetailsStatic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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
    <Box className="user-details-container">
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
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Email</Typography>
          <Typography variant="body1" className="user-details-value">{userData.email}</Typography>
        </Box>
      </Box>

      {/* Address */}
      <Box sx={{ mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '100%' }}>
          <Typography variant="subtitle2" className="user-details-label">Address</Typography>
          <Typography variant="body1" className="user-details-value">{userData.address}</Typography>
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
          <Typography variant="body1" className="user-details-value">{userData.timefrom}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Shift Timings To</Typography>
          <Typography variant="body1" className="user-details-value">{userData.timeto}</Typography>
        </Box>
      </Box>

      {/* User Role, Lead, Designation */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">User Role</Typography>
          <Typography variant="body1" className="user-details-value">{userData.role}</Typography>
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
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Department</Typography>
          <Typography variant="body1" className="user-details-value">{userData.department}</Typography>
        </Box>
      </Box>

     
    </Box>
  );
};

export default UserDetailsStatic;
