import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import "../../PagesCss/Employee.css";
import { useNavigate, useOutletContext } from "react-router-dom";
// import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import tickPng from "../../assets/tick.png";
import cancelPng from "../../assets/cancel.png";
import Tooltip from '@mui/material/Tooltip';  
import Pagination from '@mui/material/Pagination';

import axiosInstance from "../../auth/axiosInstance";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const WFHManagement = () => {
  const [month, setMonth] = useState("8");
  const [year, setYear] = useState("2024");
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const [allWfh, setAllWfh] = useState([]);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const fetchAllWFH = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/getallwfh`);
   
      setAllWfh(response?.data?.WFHrequests);
      setTotalPages(response?.data?.totalPages);

    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const validateAccepted = async (id) => {
    console.log("hello")
    console.log(id)
    try {
      const response = await axiosInstance({
        url : `${apiUrl}/api/admin/validatewfh`,
        method: "post",
        params : {
          WFHID : id,
          status : "approved"
        }

      });
      console.log(response);
    

    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  }

  const validateRejected = async (id) => {
    console.log("hello")
    console.log(id)
    try {
      const response = await axiosInstance({
        url : `${apiUrl}/api/admin/validatewfh`,
        method: "post",
        params : {
          WFHID : id,
          status : "rejected"
        }

      });
      console.log(response);
    

    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  }


  useEffect(() => {
    setHeadertext("WFH Management");
    setParaText(" ");
    fetchAllWFH()
  }, []);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleNavigateToWfhDetail = (id) => {
    navigate(`/dashboard/wfh-management/wfh-details/${id}`);
  };

  const handleRowClick = (e, id) => {
    e.stopPropagation(); // Prevent event bubbling
    handleNavigateToWfhDetail(id);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchAllWFH(value);
  };
  useEffect(() => {
    fetchAllWFH(page);
  }, [page]);
  return (
    <Box className="sheet-container-admin">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              Start Date{" "}
            </Typography>
            <input
              type="number"
              name=""
              id=""
              style={{
                border: "none",
                borderBottom: "2px solid black",
                width: "195px",
                outline: "none",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              End Date{" "}
            </Typography>
            <input
              type="number"
              name=""
              id=""
              style={{
                border: "none",
                borderBottom: "2px solid black",
                width: "195px",
                outline: "none",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ width: "150px", height: "50px" }}>
            <CustomSelectForType
              label="Year"
              value={year}
              handleChange={handleYearChange}
              options={Array.from(
                { length: new Date().getFullYear() - 2023 },
                (_, i) => ({
                  value: (2024 + i).toString(),
                  label: (2024 + i).toString(),
                })
              )}
            />
          </FormControl>
          <FormControl sx={{ width: "224px", height: "50px" }}>
            <CustomSelectForType
              label="Month"
              value={month}
              handleChange={handleMonthChange}
              options={[
                { value: "0", label: "January" },
                { value: "1", label: "February" },
                { value: "2", label: "March" },
                { value: "3", label: "April" },
                { value: "4", label: "May" },
                { value: "5", label: "June" },
                { value: "6", label: "July" },
                { value: "7", label: "August" },
                { value: "8", label: "September" },
                { value: "9", label: "October" },
                { value: "10", label: "November" },
                { value: "11", label: "December" },
              ]}
            />
          </FormControl>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        className="MuiTableContainer-root"
        sx={{ overflowX: "auto" }}
      >
        <Table className="data-table">
          <TableHead className="MuiTableHead-root">
            <TableRow
              className="header-row"
              sx={{
                backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                "&:hover": {
                  backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                },
                padding: "0px",
              }}
            >
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "start",
                  borderRadius: "8px 0px 0px 8px",
                  color: "#010120",
                  paddingLeft: "40px",
                  minWidth: "150px",
                }}
              >
                Emp ID
              </TableCell>
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "start",
                  color: "#010120",

                  minWidth: "250px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "center",
                  color: "#010120",
                  // paddingLeft: '40px',
                  minWidth: "100px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "center",
                  color: "#010120",
                  // paddingLeft: '40px',
                  minWidth: "150px",
                }}
              >
                Status (Line Manager)
              </TableCell>
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "center",
                  color: "#010120",
                  // paddingLeft: '40px',
                  minWidth: "150px",
                }}
              >
                Status (HOD)
              </TableCell>
              <TableCell
                className="MuiTableCell-root-head"
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: {
                    sm: "21px",
                    xs: "16px",
                  },
                  textAlign: "center",
                  borderRadius: "0px 8px 8px 0px",
                  color: "#010120",
                  // paddingLeft: "40px",
                  minWidth: "150px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {allWfh.map((row) => (
              <TableRow
                onClick={(e) => handleRowClick(e, row._id)}
                key={row.id}
                className="MuiTableRow-root"
                sx={{
                  border: "2px solid red  !important",
                  "&:hover": {
                    background: "#157AFF",
                    transition: "ease-in .18s all",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    borderRadius: "8px 0px 0px 8px",
                    color: "white",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                    // border: "2px solid red  !important",
                  }}
                >
                  {row?.employeeId}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "start !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  <img
                    src={row.image}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                  {row.fullName}
                </TableCell>

                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.startDate}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color:
                      row.statusTL === "approved"
                        ? "#31BA96 !important"
                        : row.statusTL === "pending"
                        ? "#010120 !important"
                        : "red !important",
                    textAlign: "center !important",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.statusTL}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    textAlign: "center !important",
                    color:
                    row.statusHOD === "approved"
                      ? "#31BA96 !important"
                      : row.statusHOD === "pending"
                      ? "#010120 !important"
                      : "red !important",
                  textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {/* <CustomSelectForType
                    height={"42px"}
                    focusBorder={false}
                    border=""
                    value={row.hodStatus}
                    handleChange={(value) =>
                      handleStatusChange(row.id, value)
                    }
                    options={[
                      { value: "Pending", label: "Pending" },
                      { value: "Approved", label: "Approved" },
                      { value: "Rejected", label: "Rejected" },
                    ]}
                  /> */}
                  {row.statusHOD}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    borderRadius: "0px 8px 8px 0px",
                  
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Approved Request">
                    <img
                      src={tickPng}
                      alt="Approve"
                      style={{
                        width: "34px",
                        height: "34px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click event from firing
                        console.log("Approved action");
                        validateAccepted(row._id);
                      }}
                    />
                    </Tooltip>

                    <Tooltip title="Reject Request">

                    <img
                      src={cancelPng}
                      alt="Reject"
                      style={{
                        width: "34px",
                        height: "34px",
                        cursor: "pointer",
                        
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click event from firing
                        console.log("Rejected action");
                        validateRejected(row._id)
                      }}
                    />
                    </Tooltip>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

<Box sx={{
  display:"flex",
  justifyContent:"center",
  mt:"10px"
}} >

<Pagination
  count={totalPages}
  page={page}
  onChange={handlePageChange}
  color="primary"
  shape="rounded"
  sx={{
    "& .MuiPaginationItem-root": {
      color: "#000", // Default text color for inactive pages
      backgroundColor: "#fff", // White background for inactive pages
      "&:hover": {
        backgroundColor: "#f0f0f0", // Slightly darker background on hover for inactive pages
      },
    },
    "& .Mui-selected": {
      color: "#fff", // White text color for the active page
      backgroundColor: "#000", // Black background for the active page (you can adjust this color)
      "&:hover": {
        backgroundColor: "#000", // Keep the active page background color on hover
      },
    },
  }}
/>
      </Box>
    </Box>
  );
};

export default WFHManagement;
