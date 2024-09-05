import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import AnnouncementBox from '../../components/AnnouncementBox/AnnouncementBox';
import { Loader } from '../../components/Loaders';
import plusIcon from '../../assets/plusIcon.png';
import axiosInstance from '../../auth/axiosInstance';
import '../../PagesCss/Employee.css';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const DashboardAdmin = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]); // Simulated employee data
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  const [announcementText, setAnnouncementText] = useState('');
  const [fetchAnnouncements, setFetchAnnouncements] = useState([]);
  const [fetchAttendanceDate, setAttendanceData] = useState([]);

  useEffect(() => {
    setHeadertext('Dashboard');
    setParaText(' ');
    fetchAnnouncementsData();
    fetchTodatAttendanceData();
  }, [setHeadertext, setParaText]);

  const fetchAnnouncementsData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/announcements`,
        method: 'get',
      });
      setFetchAnnouncements(response.data.announcements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!announcementText.trim()) {
      return; // Don't add empty announcements
    }

    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/announcement`,
        method: 'post',
        data: { message: announcementText },
      });

      // Append the new announcement to the existing list
      setFetchAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        { _id: response.data._id, announcement: announcementText }, // Adjust the key if necessary
      ]);

      setAnnouncementText(''); // Clear the input after adding
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAnnouncement = (announcementId) => {
    // Remove the deleted announcement from the state
    setFetchAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement._id !== announcementId)
    );
  };

  const fetchTodatAttendanceData = async (dateTimestamp) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getToday`,
        method: 'get',
        params: {
          date: dateTimestamp, // Pass the selected date as a Unix timestamp
        },
      });
      const dataAllEmployee = response.data.users;
      setAttendanceData(dataAllEmployee);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '10px' }}>
        <Typography sx={{ fontWeight: '500', fontSize: '22px', color: '#010120' }}>
          {`Active Users (${allEmployee.length})`}
        </Typography>
        <Typography sx={{ fontWeight: '500', fontSize: '22px', color: '#010120' }}>
          {new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '3rem',
          justifyContent: 'space-between',
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
          height: '75vh',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flexBasis: '50%' }}>
          {loading ? (
            <Box className="loaderContainer">
              <Loader />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none', mt: '-14px' }}>
              <Table sx={{ minWidth: 350 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      '&:hover': {
                        backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      },
                      padding: '0px',
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: '500',
                        padding: '12px 0px',
                        fontSize: {
                          sm: '21px',
                          xs: '16px',
                        },
                        textAlign: 'start',
                        borderRadius: '8px 0px 0px 8px',
                        color: '#010120 !important',
                        paddingLeft: '40px',
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: '500',
                        padding: '12px 0px',
                        fontSize: {
                          sm: '21px',
                          xs: '16px',
                        },
                        textAlign: 'center',
                        color: '#010120  !important',
                      }}
                    >
                      Check-In
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: '500',
                        padding: '12px 0px',
                        fontSize: {
                          sm: '21px',
                          xs: '16px',
                        },
                        textAlign: 'center',
                        color: '#010120  !important',
                        borderRadius: '0px 8px 8px 0px',
                      }}
                    >
                      Duration
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchAttendanceDate.map((employee, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: hoveredRow === index ? '#D1E4FF' : 'inherit',
                        transition: 'background-color 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell
                        sx={{
                          borderRadius: '8px 0px 0px 8px',
                          color: '#010120',
                          textAlign: 'start !important',
                          paddingLeft: '40px !important',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '50px', height: '50px' }}>
                            <img
                              src={employee.image}
                              style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                              alt=""
                            />
                          </Box>
                          <Typography sx={{ ml: '10px' }}>{employee.fullName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center !important', paddingLeft: '0px !important' }}>
                        {employee?.checkIn ? formatTime(employee?.checkIn) : ''}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center !important', paddingLeft: '0px !important', borderRadius: '0px 8px 8px 0px' }}>
                        {employee?.duration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Box
          sx={{
            flexBasis: '50%',
            backgroundColor: '#010120',
            color: 'white',
            p: '24px 17px',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: '500' }}>Announcement</Typography>
          </Box>
          <Box
            sx={{ mt: '30px', display: 'flex', flexDirection: 'column', gap: '1rem', height: '70vh', overflow: 'hidden', overflowY: 'scroll' }}
          >
            <Box sx={{ position: 'relative' }}>
              <CustomInputLabel
                multiline="true"
                height={'150px'}
                border={false}
                bgcolor="#272741"
                color="white"
                fontSize="14px"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
              <Tooltip title="Add">
                <Box
                  sx={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#157AFF',
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                    '&:hover': {
                      backgroundColor: '#0e5bb5', // Darker shade on hover
                    },
                  }}
                  onClick={handleAddAnnouncement}
                >
                  <img src={plusIcon} alt="Add Icon" style={{ width: '16px', height: '16px' }} />
                </Box>
              </Tooltip>
            </Box>
            {fetchAnnouncements.map((announcement, index) => (
              <AnnouncementBox
                key={index}
                id={announcement._id}
                announcementContent={announcement.announcement}
                onDelete={handleDeleteAnnouncement}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardAdmin;
