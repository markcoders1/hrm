import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import '../../PagesCss/Employee.css'; // Link the same CSS file

const LeaveManagement = () => {
  const [month, setMonth] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState({});
  
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(new Date(event.target.value).getTime());
  };

  const handleToDateChange = (event) => {
    setToDate(new Date(event.target.value).getTime());
  };

  const handleStatusChange = (id, value) => {
    setStatus(prev => ({ ...prev, [id]: value }));
  };

  const leaveData = [
    {
      id: '1',
      empId: '005',
      name: 'M. Aman Raza',
      balance: '9',
      type: 'Sick',
      from: '08-20-2024',
      to: '08-20-2024',
      days: '2',
      lineManagerStatus: 'Approved',
      hodStatus: 'Pending'
    },
    {
      id: '2',
      empId: '006',
      name: 'Syed Muzammil',
      balance: '7',
      type: 'Sick',
      from: '08-20-2024',
      to: '08-20-2024',
      days: '2',
      lineManagerStatus: 'Approved',
      hodStatus: 'Pending'
    },
    {
      id: '3',
      empId: '007',
      name: 'Muzammil Mansoori',
      balance: '5',
      type: 'Casual',
      from: '08-20-2024',
      to: '08-20-2024',
      days: '2',
      lineManagerStatus: 'Approved',
      hodStatus: 'Pending'
    }
  ];

  return (
    <Box className="sheet-container-admin">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="From Date"
            type="date"
            onChange={handleFromDateChange}
            sx={{
              width: '160px',
              '& .MuiInputBase-input': {
                fontSize: '14px',
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="To Date"
            type="date"
            onChange={handleToDateChange}
            sx={{
              width: '160px',
              '& .MuiInputBase-input': {
                fontSize: '14px',
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ width: '160px' }}>
            <InputLabel sx={{ fontSize: '14px' }}>Month</InputLabel>
            <Select
              value={month}
              onChange={handleMonthChange}
              sx={{
                fontSize: '14px',
                '& .MuiSelect-select': {
                  padding: '10px',
                },
              }}
            >
              <MenuItem value="7">July</MenuItem>
              <MenuItem value="8">August</MenuItem>
              <MenuItem value="9">September</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} className="MuiTableContainer-root">
        <Table className="data-table">
          <TableHead className="MuiTableHead-root">
            <TableRow className="header-row"
              sx={{
                backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                '&:hover': {
                  backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                },
                padding: '0px',
              }}
            >
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                borderRadius: '8px 0px 0px 8px',
                color: '#010120',
                paddingLeft: '40px',
              }}>Emp ID</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Name</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Balance</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Type</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>From</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>To</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Days</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Status (Line Manager)</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                color: '#010120',
                paddingLeft: '40px',
              }}>Status (HOD)</TableCell>
              <TableCell className="MuiTableCell-root-head" sx={{
                fontWeight: '500',
                padding: '12px 0px',
                fontSize: {
                  sm: '21px',
                  xs: '16px',
                },
                textAlign: 'start',
                borderRadius: '0px 8px 8px 0px',
                color: '#010120',
                paddingLeft: '40px',
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {leaveData.map((row) => (
              <TableRow key={row.id} className="MuiTableRow-root" sx={{
                border: '2px solid #FFA100',
                '&:hover': {
                  background: '#157AFF',
                  transition: 'ease-in .18s all',
                  cursor: 'pointer',
                }
              }}>
                <TableCell className="MuiTableCell-root" sx={{
                  borderRadius: '8px 0px 0px 8px',
                  color: 'white',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.empId}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: 'white',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.name}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: '#99999C',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.balance}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: 'white',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.type}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: '#99999C',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.from}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: '#99999C',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.to}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: 'white',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.days}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  color: row.lineManagerStatus === 'Approved' ? 'green' : row.lineManagerStatus === 'Pending' ? 'orange' : 'red',
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>{row.lineManagerStatus}</TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  textAlign: 'start !important',
                  paddingLeft: '40px !important',
                }}>
                  {status[row.id] ? (
                    status[row.id]
                  ) : (
                    <Select
                      value={status[row.id] || 'Pending'}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      displayEmpty
                      sx={{
                        width: '120px',
                        '& .MuiSelect-select': {
                          padding: '10px',
                        },
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="MuiTableCell-root" sx={{
                  borderRadius: '0px 8px 8px 0px',
                }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleStatusChange(row.id, status[row.id] || 'Pending')}
                    sx={{
                      fontSize: '14px',
                      padding: '5px 10px',
                      color: '#010120',
                      fontWeight: '500',
                      '&:hover': {
                        backgroundColor: '#157AFF',
                        color: 'darkgreen',
                        borderColor: '#010120',
                      }
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveManagement;
