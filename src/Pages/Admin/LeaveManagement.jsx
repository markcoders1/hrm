import React, { useState } from "react";
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
  Typography,
  FormControl,
} from "@mui/material";
import "../../PagesCss/Employee.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";

import CustomSelectForType from "../../components/CustomSelect/CustomSelect";

const LeaveManagement = () => {
  const [month, setMonth] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState({});
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();

  setHeadertext("Leave Management");
  setParaText(" ");

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
    setStatus((prev) => ({ ...prev, [id]: value }));
  };

  const handleNavigateToLeaveDetail = () => {
    navigate("/dashboard/leave-management/leave-details");
  };

  const handleRowClick = (e) => {
    handleNavigateToLeaveDetail();
  };

  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent the row click event from firing
  };

  const leaveData = [
    {
      id: "1",
      empId: "005",
      name: "M. Aman Raza",
      img: "/path/to/image1.png",
      balance: "9",
      type: "Sick",
      from: "08-20-2024",
      to: "08-20-2024",
      days: "2",
      lineManagerStatus: "Approved",
      hodStatus: "Pending",
    },
    {
      id: "2",
      empId: "006",
      name: "Syed Muzammil",
      img: "/path/to/image2.png",
      balance: "7",
      type: "Sick",
      from: "08-20-2024",
      to: "08-20-2024",
      days: "2",
      lineManagerStatus: "Approved",
      hodStatus: "Pending",
    },
    {
      id: "3",
      empId: "007",
      name: "Muzammil Mansoori",
      img: "/path/to/image3.png",
      balance: "5",
      type: "Casual",
      from: "08-20-2024",
      to: "08-20-2024",
      days: "2",
      lineManagerStatus: "Approved",
      hodStatus: "Pending",
    },
  ];

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
                  // paddingLeft: '40px',
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
                  color: "#010120",
                  // paddingLeft: '40px',
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
                  color: "#010120",
                  // paddingLeft: '40px',
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
                  // paddingLeft: '40px',
                  // minWidth:"120px"
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
                  // paddingLeft: '40px',
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
                  // paddingLeft: '40px',
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
                  // paddingLeft: "40px",
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
                  {row.empId}
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
                    src={row.img}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                  {row.name}
                </TableCell>

                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.balance}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.type}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.from}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "#99999C",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.to}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color: "white",
                    textAlign: "center !important",
                    //  paddingLeft: "40px !important",
                  }}
                >
                  {row.days}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    color:
                      row.lineManagerStatus === "Approved"
                        ? "green"
                        : row.lineManagerStatus === "Pending"
                        ? "orange"
                        : "red",
                    textAlign: "center !important",
                    // paddingLeft: "40px !important",
                  }}
                >
                  {row.lineManagerStatus}
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    // textAlign: "start !important",
                    // paddingLeft: "40px !important",
                    // display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //  border:"2px solid red"
                  }}
                >
                  <div
                    onClick={handleSelectClick}
                    style={{ paddingTop: "8px" }}
                  >
                    <CustomSelectForType
                      height={"62px"}
                      focusBorder={false}
                      border=""
                      value={status[row.id] || "Pending"}
                      handleChange={(value) =>
                        handleStatusChange(row.id, value)
                      }
                      options={[
                        { value: "Pending", label: "Pending" },
                        { value: "Approved", label: "Approved" },
                        { value: "Rejected", label: "Rejected" },
                      ]}
                    />
                  </div>
                </TableCell>
                <TableCell
                  className="MuiTableCell-root"
                  sx={{
                    borderRadius: "0px 8px 8px 0px",
                  }}
                >
                  <CustomButton
                    ButtonText="Update"
                    fontSize="14px"
                    color="#010120"
                    fontWeight="500"
                    fullWidth={false}
                    variant="outlined"
                    padding="6px 10px"
                    background="transparent"
                    hoverBg="#157AFF"
                    hovercolor="blue"
                    type="button"
                    width={"120px"}
                    borderRadius="8px"
                    buttonStyle={{ fontSize: { sm: "18px", xs: "15px", mb:"2px" } }}
                    border="2px solid black"
                    hoverBorder="2px solid black"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click event from firing
                      handleStatusChange(row.id, status[row.id] || "Pending");
                    }}
                  />
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
