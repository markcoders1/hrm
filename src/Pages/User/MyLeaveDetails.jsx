import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/UserDetailsStatic.css';
import { Loader } from '../../components/Loaders';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const MyLeaveDetails = () => {
  const {setHeadertext , setParaText} = useOutletContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [leaveData, setLeaveData] = useState(null);

  useEffect(() => {
    setHeadertext("Leave Details");
    setParaText(" ")
    const getLeaveDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/leaveData`,
          method: "get",
          params: {
            leaveID : id
          }
        })
        setLeaveData(response.data.leave)
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getLeaveDetails();
  }, [id]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear().toString().slice(-2)}`;
  };

  if (loading) {
    return (
      <Box className="loaderContainer">
        <Loader />
      </Box>
    );
  }


  return (
    <Box className="user-details-container" sx={{p:{sm: "40px 50px", xs:"40px 15px"}}} >
      {/* Full Name, Phone Number, Email */}
      <Box sx={{ display: 'flex', gap: '40px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">From</Typography>
          <Typography variant="body1" className="user-details-value-1">{formatDate(leaveData?.startDate)}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">To</Typography>
          <Typography variant="body1" className="user-details-value-1">{formatDate(leaveData?.startDate)}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Type</Typography>
          <Typography variant="body1" className="user-details-value-1">{leaveData?.leaveType}</Typography>
        </Box>
      </Box>



      {/* User Role, Lead, Designation */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px', pb: '20px', borderBottom: { md: '1px solid #E0E0E0', xs: 'none' } }}>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Annual Leaves</Typography>
          <Typography variant="body1" className="user-details-value-1">{leaveData?.annualLeaves}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Avail</Typography>
          <Typography variant="body1" className="user-details-value-1">{leaveData?.leaveCount}</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Remaining</Typography>
          <Typography variant="body1" className="user-details-value-1">{leaveData?.annualLeaves -  leaveData?.leaveCount}</Typography>
        </Box>
      </Box>

      {/* Working Days, HOD, Department */}
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px' }}>
        <Box className="user-details-item" sx={{ flexBasis: '100%', }}>
          <Typography variant="subtitle2" className="user-details-label">Working Days</Typography>
          <Typography variant="body1" sx={{lineHeight:"35px"}} className="user-details-value-1">{leaveData?.comment}</Typography>
        </Box>
        
      </Box>

     
    </Box>
  );
};

export default MyLeaveDetails;
