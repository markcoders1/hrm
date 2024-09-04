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
  const [statusFilter, setStatusFilter] = useState("pending");
 


  useEffect(() => {
    setHeadertext("Leave Management");
    setParaText("Manage Employee Leaves");
  }, [setHeadertext, setParaText]);

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const fetchAllLeaves = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/getallleaves`);
      if (response.data && response.data.leaves) {
        setLeaveData(response.data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value; // Ensure event.target exists
    if (selectedValue) {
      setStatusFilter(selectedValue);
    } else {
      console.error("Invalid selection, event target value is undefined");
    }
  };
  

  const handleMonthChange = (event) => {
    // setMonth(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(new Date(event.target.value).getTime());
  };

  const handleToDateChange = (event) => {
    setToDate(new Date(event.target.value).getTime());
  };

  const filteredLeaveData = leaveData.filter((row) => row.overallStatus === statusFilter);

  const validateAccept = async (leaveId) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/validateleaves`, {
        params: {
          leaveID: leaveId,
          status: "approved",
        },
      });
      console.log(response)
      fetchAllLeaves(); // Refresh data after updating status
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const validateReject = async (leaveId) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/validateleaves`, {
        params: {
          leaveID: leaveId,
          status: "rejected",
        },
      });
      fetchAllLeaves(); // Refresh data after updating status
    } catch (error) {
      console.error("Error rejecting leave request:", error);
    }
  };

  const calculateLeaveDays = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let totalDays = 0;

    while (start <= end) {
      const dayOfWeek = start.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
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

  const handleRowClick = (id,e) => {
    navigate(`/dashboard/leave-management/leave-details/${id}`);
  };

  return (
    <Box className="sheet-container-admin">
      <Box
        sx={{
          width: { lg: "500px", xs: "100%",  },
          position: { lg: "fixed", xs: "static" },
          right: "50px",
          top: "40px",
          zIndex: "100000 ",
          display: "flex",
          gap: "1rem",
          // border:"2px solid red",
          flexDirection:{
            sm:"row",
            xs:"column"
          }
        }}
      >
        <Box sx={{flexBasis:{lg:"300px", xs:"60%"}}} >

        <CustomInputLabel
          height={"56px"}
          fontSize={"20px"}
          showSearchIcon={true}
          placeholder={"Search User"}
          />
          </Box>
          <Box sx={{flexBasis:{lg:"200px", xs:"40%"}}}>

        <CustomSelectForType
          label="Status"
          value={statusFilter}
          handleChange={handleStatusChange}
          height={"56px"}
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
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%",
    mb: 3,
    flexDirection: {
      md: "row",  // Row on larger screens
      xs: "column",  // Column on smaller screens
    },
    // border:"2px solid blue"
  }}
>
  {/* Start and End Date Box */}
  <Box sx={{ display: "flex", gap: 6, flexDirection: { xs: "column", md: "row" }, flexBasis:{md:"", xs:"100%"} }}>
    <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
      <Typography sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}>
        Start Date
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
      <Typography sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}>
        End Date
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

  {/* Month Select Box */}
  <Box
    sx={{
      display: "flex",
      gap: 2,
    }}
  >
    <FormControl sx={{ width: {md:"200px", xs:"100%"}, height: "50px" }}>
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


      <TableContainer component={Paper} className="MuiTableContainer-root" sx={{ overflowX: "auto" }}>
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
                  color: "#31BA96",
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
                  color: "#31BA96",
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
            {filteredLeaveData.map((row) => (
              <TableRow
                onClick={() => handleRowClick(row._id)}
                key={row._id}
                className="MuiTableRow-root"
                sx={{
                  border: "2px solid red !important",
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
                  {row?.employeeId || "-- -- "}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "start !important",
                  }}
                >
                  <img
                    src={row?.image}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                    alt="employee"
                  />
                  {row?.fullName}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                  }}
                >
                  {row?.balance}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "center !important",
                  }}
                >
                  {row?.leaveType}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#31BA96",
                    textAlign: "center !important",
                  }}
                >
                  {formatDate(row?.startDate)}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#31BA96",
                    textAlign: "center !important",
                  }}
                >
                  {formatDate(row?.endDate)}
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
                  {row?.statusTL}
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
                  {row?.statusHOD}
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
