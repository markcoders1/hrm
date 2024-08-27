import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/UserDetailsStatic.css';
import { Loader } from '../../components/Loaders';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const LeaveDetails = () => {
  const {setHeadertext , setParaText} = useOutletContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [, set] = useState(null);

  useEffect(() => {
    setHeadertext("WFH Details");
    setParaText(" ")
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/admin/getUser`, { params: { id } });
        set(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // getUserDetails();
  }, [id]);

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
          <Typography variant="subtitle2" className="user-details-label">Date</Typography>
          <Typography variant="body1" className="user-details-value-1">27-08-2024</Typography>
        </Box>
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Days</Typography>
          <Typography variant="body1" className="user-details-value-1">02</Typography>
        </Box>
        
        <Box className="user-details-item" sx={{ flexBasis: '33%' }}>
          <Typography variant="subtitle2" className="user-details-label">Status (HOD)</Typography>
          <Typography variant="body1" className="user-details-value-1">Approved</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { md: 'row', xs: 'column' }, mb: '20px' }}>
        <Box className="user-details-item" sx={{ flexBasis: '100%', }}>
          <Typography variant="subtitle2" className="user-details-label">Comments</Typography>
          <Typography variant="body1" sx={{lineHeight:"35px"}} className="user-details-value-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae obcaecati quis, ipsam, sunt sapiente vitae nobis enim amet numquam provident molestias eum quisquam optio est commodi architecto perferendis id quos rem voluptates! Illo qui, odio consequuntur quos rerum soluta dolorem magnam obcaecati sequi et officiis repudiandae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas iste dolor adipisci id modi rerum quod eos aut ipsam corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quod deserunt exercitationem explicabo dicta. Maiores at fuga similique culpa aliquid?   </Typography>
        </Box>
        
      </Box>

     
    </Box>
  );
};

export default LeaveDetails;
