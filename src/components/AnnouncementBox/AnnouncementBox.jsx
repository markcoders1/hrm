import React from 'react';
import { Box, Tooltip } from '@mui/material';
import deleteIconWhite from '../../assets/deleteIconWhite.png';
import axiosInstance from '../../auth/axiosInstance';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AnnouncementBox = ({ announcementContent, id, onDelete }) => {
  const deleteAnnouncement = async (id) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/announcement`,
        method: 'delete',
        params: {
          announcementId: id,
        },
      });

      console.log('Delete response:', response.data);

      // Call the callback passed from the parent to update the list of announcements
      onDelete(id);
      toast.success(response.data.message);

    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: '#272741',
          borderRadius: '8px',
          minHeight: '150px',
          height: '100%',
          p: '15px 20px',
          overflowY: 'auto',
          fontSize: '14px',
        }}
      >
        {announcementContent}
      </Box>
      <Tooltip title="Delete">
        <Box
          sx={{
            width: '29px',
            height: '29px',
            borderRadius: '50%',
            backgroundColor: '#157AFF',
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
            '&:hover': {
              backgroundColor: '#0e5bb5', // Darker shade on hover
            },
          }}
          onClick={() => deleteAnnouncement(id)}
        >
          <img src={deleteIconWhite} alt="Delete Icon" style={{ width: '13px', height: '13px' }} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default AnnouncementBox;
