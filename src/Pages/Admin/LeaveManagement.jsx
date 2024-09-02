import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";
import "../../PagesCss/Employee.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import tickPng from "../../assets/tick.png";
import cancelPng from "../../assets/cancel.png";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const LeaveManagement = () => {
  const [month, setMonth] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);

  setHeadertext("Leave Management");
  setParaText("Manage Employee Leaves");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(new Date(event.target.value).getTime());
  };

  const handleToDateChange = (event) => {
    setToDate(new Date(event.target.value).getTime());
  };

  const fetchAllLeaves = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getallleaves`,
        method: "get",
      });
      console.log(response.data);
      setLeaveData(response?.data?.leaves || []);
    } catch (error) {
      console.log("error making leave request", error);
    }
  };

  const validateAccept = async (leaveId) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/validateleaves`,
        method: "get",
        params: {
          leaveID: leaveId,
          status: "accepted",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("error making leave request", error);
    }
  };

  const validateReject = async (leaveId) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/validateleaves`,
        method: "get",
        params: {
          leaveID: leaveId,
          status: "rejected",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("error making leave request", error);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const calculateLeaveDays = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let totalDays = 0;

    while (start <= end) {
      const dayOfWeek = start.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Exclude Saturdays and Sundays
        totalDays++;
      }
      start.setDate(start.getDate() + 1);
    }
    return totalDays;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const handleRowClick = (e) => {
    navigate("/dashboard/leave-management/leave-details");
  };

  return (
    <Box className="sheet-container-admin">
      <Box
        sx={{
          width: { lg: "380px", xs: "100%" },
          position: { lg: "fixed", xs: "static" },
          right: "60px",
          top: "40px",
          zIndex: "100000 ",
          display:"flex",
          gap:"1rem"
        }}
      >
        <CustomInputLabel
          height={"56px"}
          fontSize={"20px"}
          showSearchIcon={true}
          placeholder={"Search User"}
          
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
        />
         <CustomSelectForType
              label=""
              value={month}
              handleChange={handleMonthChange}
              height={"56px"}
              options={[
                { value: "0", label: "January" },
                { value: "1", label: "February" },
                { value: "2", label: "March" },
               
              ]}
            />
      </Box>

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
              type="date"
              style={{
                border: "none",
                borderBottom: "2px solid black",
                width: "195px",
                outline: "none",
              }}
              onChange={handleFromDateChange}
            />
          </Box>
          <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              End Date{" "}
            </Typography>
            <input
              type="date"
              style={{
                border: "none",
                borderBottom: "2px solid black",
                width: "195px",
                outline: "none",
              }}
              onChange={handleToDateChange}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
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
                  minWidth: "100px",
                }}
              >
                Balance
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
                  minWidth: "100px",
                }}
              >
                Type
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
                  color: "#31BA96", // Updated color code
                  minWidth: "190px ",
                }}
              >
                From
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
                  color: "#31BA96", // Updated color code
                  minWidth: "190px ",
                }}
              >
                To
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
                  minWidth: "120px",
                }}
              >
                Days
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
                  minWidth: "290px",
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
                  minWidth: "200px",
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
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {leaveData.map((row) => (
              <TableRow
                onClick={handleRowClick}
                key={row._id}
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
                  }}
                >
                  {row?.userID || "-- -- "}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "start !important",
                  }}
                >
                  <img
                    src={row.img}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                    alt="employee"
                  />
                  {row.name}
                </TableCell>

                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                  }}
                >
                  {row.balance}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "center !important",
                  }}
                >
                  {row.leaveType}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#31BA96", // Updated color code
                    textAlign: "center !important",
                  }}
                >
                  {formatDate(row.startDate)}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#31BA96", // Updated color code
                    textAlign: "center !important",
                  }}
                >
                  {formatDate(row.endDate)}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "center !important",
                  }}
                >
                  {calculateLeaveDays(row.startDate, row.endDate)}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color:
                      row.statusTL === "accepted"
                        ? "#31BA96 !important"
                        : row.statusTL === "pending"
                        ? "#010120 !important"
                        : "red !important",
                    textAlign: "center !important",
                  }}
                >
                  {row.statusTL}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color:
                      row.statusHOD === "accepted"
                        ? "#31BA96 !important "
                        : row.statusHOD === "pending"
                        ? "#010120 !important"
                        : "red !important",
                    textAlign: "center !important",
                  }}
                >
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
                    <Tooltip title="Approve Request">
                      <img
                        src={tickPng}
                        alt="Approve"
                        style={{
                          width: "34px",
                          height: "34px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          validateAccept(row._id);
                          e.stopPropagation(); // Prevent the row click event from firing
                          console.log("Approved action");
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
                          validateReject(row._id);
                          e.stopPropagation(); // Prevent the row click event from firing
                          console.log("Rejected action");
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
    </Box>
  );
};

export default LeaveManagement;
