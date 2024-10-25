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
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosInstance from "../../auth/axiosInstance";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useSelector } from "react-redux";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const WFHManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const [allWfh, setAllWfh] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user.user.role);


  const months = [
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];

  // Generate years starting from 2024
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getUnixTimestampForMonthYear = (month, year) => {
    const date = new Date(year, month, 1);
    return date.getTime();
  };

  const fetchAllWFH = async () => {
    const date = getUnixTimestampForMonthYear(selectedMonth, selectedYear);
    

    try {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/getallwfh`,
        { params: { date: date ? date : null } }
      );
      console.log(response)

      setAllWfh(response?.data?.WFHrequests);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const validateAccepted = async (id) => {
    console.log("hello");
    console.log(id);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/validatewfh`,
        method: "get",
        params: {
          WFHID: id,
          status: "approved",
        },
      });
      console.log(response);
      toast.success("WFH Validate SucessFully", { position: "top-center" });
      fetchAllWFH();
    } catch (error) {
      console.error("Error fetching leave data:", error);
      toast.success("WFH Validate Could not proceed", {
        position: "top-center",
      });
    }
  };

  const validateRejected = async (id) => {
    console.log("hello");
    console.log(id);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/validatewfh`,
        method: "get",
        params: {
          WFHID: id,
          status: "rejected",
        },
      });
      console.log(response);
      toast.success("WFH Validate SucessFully", { position: "top-center" });
      fetchAllWFH();
    } catch (error) {
      console.error("Error fetching leave data:", error);
      toast.success("WFH Validate Could not proceed", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    setHeadertext("WFH Management");
    setParaText("Manage Employees WFH Requests");

    fetchAllWFH();
  }, [selectedMonth, selectedYear]);

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

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setStatusFilter(selectedValue); // Update the filter state
  };


const filteredWFHData = allWfh.filter((row) => {
  const matchesStatus = row.overallStatus === statusFilter;
  const matchesSearchTerm =
    (row.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (row.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

  return matchesStatus && matchesSearchTerm;
});

  useEffect(() => {
    fetchAllWFH(page);
  }, [page]);

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
    <Box className="sheet-container-admin" sx={{
      padding:"0px 0px 40px 0px"
      }} >
      <Box
        sx={{
          width: { lg: "480px", xs: "100%" },
          position: { lg: "fixed", xs: "static" },
          right: "40px",
          top: "40px",
          zIndex: "100000 ",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Box sx={{ flexBasis: { lg: "320px", xs: "60%" } }}>
          <CustomInputLabel
           height={{xs:"36px"}}
           paddingInput={{xs:" 8px 10px"}}
            fontSize={"20px"}
            showSearchIcon={true}
            placeholder={"Search User"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
          />
        </Box>

        <Box sx={{ flexBasis: { lg: "220px", xs: "40%" } }}>
          <CustomSelectForType
            label="Status"
            value={statusFilter}
            handleChange={handleStatusChange}
            height={"46px"}
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "end",
        
          width: "100%",
        }}
      >
        <FormControl
          sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}
        >
          <CustomSelectForType
            label="Month"
            value={selectedMonth}
            handleChange={handleMonthChange}
            options={months}
            height={"46px"}

          />
        </FormControl>
        <FormControl
          sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}
        >
          <CustomSelectForType
            label="Year"
            value={selectedYear}
            handleChange={handleYearChange}
            options={years}
            height={"46px"}

          />
        </FormControl>
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
                  textAlign: "center",
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
              
               
                  minWidth: "150px",

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
                  minWidth: "250px",

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
                  minWidth: "170px",
                }}
              >
                Status (HOD)
              </TableCell>

              {
                user === "HR" ? "" : (
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
                )
              }
             
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {filteredWFHData.map((row) => (
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
                    color: "#010120",
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
                    color: "#010120",
                    minWidth:"300px",

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
                  {convertTimestampToDate(row.date)}
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

                {
                  user === "HR" ? "" : (
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
                            validateRejected(row._id);
                          }}
                        />
                      </Tooltip>
                    </Typography>
                  </TableCell>
                  )
                }
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WFHManagement;
