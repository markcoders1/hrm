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

const WFHManagement = () => {
  const [month, setMonth] = useState("8");
  const [year, setYear] = useState("2024");
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadertext("WFH Management");
    setParaText(" ");
  }, []);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleNavigateToWfhDetail = (id) => {
    navigate(`/dashboard/wfh-management/wfh-details`);
  };

  const handleRowClick = (e, id) => {
    e.stopPropagation(); // Prevent event bubbling
    handleNavigateToWfhDetail(id);
  };

  const wfhData = [
    {
      id: "1",
      empId: "005",
      name: "M. Aman Raza",
      img: "/path/to/image1.png",
      date: "08-20-2024",
      lineManagerStatus: "Approved",
      hodStatus: "Pending",
    },
    {
      id: "2",
      empId: "006",
      name: "Syed Muzammil",
      img: "/path/to/image2.png",
      date: "08-20-2024",
      lineManagerStatus: "Approved",
      hodStatus: "Pending",
    },
    {
      id: "3",
      empId: "007",
      name: "Muzammil Mansoori",
      img: "/path/to/image3.png",
      date: "08-20-2024",
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
            {wfhData.map((row) => (
              <TableRow
                onClick={(e) => handleRowClick(e, row.id)}
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
                  {row.date}
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
                    textAlign: "center !important",
                    color: "#99999C",
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
                  {row.hodStatus}
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

export default WFHManagement;
