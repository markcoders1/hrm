import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Loader } from "../../components/Loaders";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/Employee.css";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/EditIcon.png";
import editIconWhite from "../../assets/editIconWhite.png";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().getTime()); // Initialize with current date as Unix timestamp
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  useEffect(() => {
    const fetchEmployeeData = async (dateTimestamp) => {
      try {
        setHeadertext("Attendance Management");
        setParaText("Lorem Ipsum");
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getToday`,
          method: "get",
          params: {
            date: dateTimestamp, // Pass the selected date as a Unix timestamp
          },
        });
        const dataAllEmployee = response.data.users;
        setAllEmployee(dataAllEmployee);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeData(selectedDate);
  }, [setHeadertext, selectedDate]); // Re-fetch data when the selected date changes

  const handleDateChange = (e) => {
    const newDateTimestamp = new Date(e.target.value).getTime();
    setSelectedDate(newDateTimestamp);
  };

  const buttonForDeleteEdit = (rowData, isHovered) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            width: "45px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // White color with 0.3 opacity
            },
          }}
        >
          <img src={isHovered ? editIconWhite : editIcon} alt="" />{" "}
        </Typography>
        <Typography
          sx={{
            width: "45px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // White color with 0.3 opacity
            },
          }}
        >
          <img src={deleteIcon} alt="" />
        </Typography>
      </Box>
    );
  };

  const handleNavigateToSeeAttendance = (rowData) => {
    navigate(`/dashboard/attendance-management/viewAttendance`);
  };

  return (
    <Box className="sheet-container-admin">
      <Box sx={{ width: { lg: "380px", xs: "100%" }, position: { lg: "fixed", xs: "static" }, right: "70px", top: "40px", zIndex: "100000 " }} >
        <CustomInputLabel
          height={"56px"}
          fontSize={"20px"}
          showSearchIcon={false}
          placeholder={"Search User"}
          type={"date"}
          value={new Date(selectedDate).toISOString().split("T")[0]} // Display the selected date in the input
          onChange={handleDateChange} // Handle date change
        />
      </Box>
      <Box>
        {loading ? (
          <Box className="loaderContainer">
            <Loader />
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }} >
              <Typography sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }} >
                {`Active Users (${allEmployee.length})`}
              </Typography>
              <Typography sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }} >
                {`${new Date(selectedDate).getMonth() + 1}`.padStart(2, '0') + '-' +
                  `${new Date(selectedDate).getDate()}`.padStart(2, '0') + '-' +
                  new Date(selectedDate).getFullYear()}
              </Typography>
            </Box>
            <TableContainer component={Paper} className="MuiTableContainer-root">
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
                      }}
                    >
                      Emp Id
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
                        paddingLeft: "0px",
                      }}
                    >
                      Checked-In Date
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
                        paddingLeft: "10px !important",
                      }}
                    >
                      Check-In
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
                        paddingLeft: "10px !important",
                      }}
                    >
                      Check-Out
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
                        textAlign: "start !important",
                        paddingLeft: "10px !important",
                        borderRadius: "0px 8px 8px 0px",
                        color: "#010120",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="MuiTableBody-root">
                  {allEmployee.map((employee, index) => (
                    <TableRow
                      key={index}
                      className="MuiTableRow-root"
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => handleNavigateToSeeAttendance(employee)}
                      sx={{
                        backgroundColor:
                          hoveredRow === index ? "#D1E4FF" : "inherit",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        sx={{
                          borderRadius: "8px 0px 0px 8px",
                          color: "#010120",
                          textAlign: "start !important",
                          paddingLeft: "40px !important",
                        }}
                        className="MuiTableCell-root"
                      >
                        {employee.employeeId}
                      </TableCell>
                      <TableCell
                        sx={{ color: "#010120", textAlign: "start !important" }}
                        className="MuiTableCell-root"
                      >
                        <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                          <Typography>
                            <img
                              src={employee.image}
                              style={{ width: "38px", height: "38px", backgroundColor: "red", borderRadius: "50%" }}
                              alt=""
                            />
                          </Typography>
                          <Typography sx={{ ml: "10px" }}>{employee.fullName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                          color: "#99999C !important",
                        }}
                        className="MuiTableCell-root"
                      >
                        {employee.checkedInDate || "N/A"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                        className="MuiTableCell-root"
                      >
                        {employee.checkIn ? employee.checkIn : "-- : --"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                        className="MuiTableCell-root"
                      >
                        {employee.checkOut ? employee.checkOut : "-- : --"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "start !important",
                          paddingLeft: "10px !important",
                          borderRadius: "0px 8px 8px 0px",
                        }}
                        className="MuiTableCell-root"
                      >
                        {buttonForDeleteEdit(employee, hoveredRow === index)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeAttendance;
