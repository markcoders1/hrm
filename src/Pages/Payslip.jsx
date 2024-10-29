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
import CheckInOutModal from "../../components/CheckInEditModal/CheckInEditModal";
import SpinnerLoader from "../../components/SpinnerLoader";
import DeleteConfirmationModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PayslipManagement = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row


  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year
 
 

  useEffect(()=>{
    setHeadertext("PaySlip Management");
    setParaText(" ");
  },[])

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
  const handleDeleteConfirmed = async (id) => {
    setLoadingDelete(true);
    
    console.log(id);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/deleteAttendance`,
        method: "delete",
        params: {
          id: id,
        },
      });
      console.log("Delete response:", response.data);
      toast.success("Check In Deleted Sucessfully", { position: "top-center" });

   
      fetchEmployeeData();

      setLoadingDelete(false);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting leave:", error);
      setLoadingDelete(false);
      toast.success("Leave Delete Could Not be Proceed Now");
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async (dateTimestamp) => {
      console.log(dateTimestamp);
      setHeadertext("PaySlip Management");
      setParaText(" ");
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getToday`,
          method: "get",
        //   params: {
        //     date: dateTimestamp, // Directly pass the selected date
        //   },
        });
        console.log("get today -----------------------===", response);
        const dataAllEmployee = response.data.users;
        setAllEmployee(dataAllEmployee);
        setEmployeeActiveCount(dataAllEmployee.length);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeData();
  }, []); // Re-fetch data when the selected date changes

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDateChange = (e) => {
    const newDateTimestamp = new Date(e.target.value).getTime();
    setSelectedDate(newDateTimestamp);
    console.log(newDateTimestamp);
  };
  const buttonForDeleteEdit = (rowData, isHovered) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
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
            borderRadius: "50%",

            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal(rowData.checkId);
            console.log(rowData);
          }}
        >
          <img src={isHovered ? editIconWhite : editIcon} alt="edit" />{" "}
        </Typography>
        <Typography
          sx={{
            width: "45px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // White color with 0.3 opacity
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log(rowData.checkId)
            handleDeleteConfirmed(rowData.checkId);
            alert("Delete clicked for " + rowData.fullName);
          }}
        >
          <img src={deleteIcon} alt="delete" />
        </Typography>
      </Box>
    );
  };

  const handleNavigateToSeeAttendance = (id) => {
    navigate(`/dashboard/attendance-management/viewAttendance/${id}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleOpenModal = (checkId) => {
    setSelectedCheckId(checkId); // Pass the checkId to modal
    setModalOpen(true);
    console.log(checkId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCheckId(null);
  };

  if (loading) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  return (
    <Box
      className="sheet-container-admin"
      sx={{
        padding: "0px 0px 40px 0px",
      }}
    >
      <Box
        sx={{
          width: { lg: "220px", xs: "100%" },
          position: { lg: "fixed", xs: "static" },
          right: "55px",
          top: "40px",
          zIndex: "100000 ",
        }}
      >
        <CustomInputLabel
          height={{ xs: "36px" }}
          paddingInput={{ xs: " 8px 10px" }}
          fontSize={"20px"}
          showSearchIcon={false}
          placeholder={"Search User"}
          type={"date"}
          value={new Date(selectedDate).toISOString().split("T")[0]} // Display the selected date in the input
          onChange={handleDateChange} // Handle date change
          fullWidth={false}
        />
      </Box>
      <Box>
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              {`Active Users (${employeeActiveCoount})`}
            </Typography>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
             
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
                      textAlign: "center !important",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      minWidth: "120px",
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
                      textAlign: "start !important",
                      color: "#010120",
                      pl: "40px !important",
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
                      textAlign: "center !important",

                      color: "#010120",

                      minWidth: "250px",
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
                      textAlign: "center !important",

                      color: "#010120",

                      minWidth: "150px",
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
                      textAlign: "center !important",

                      color: "#010120",

                      minWidth: "250px",
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
                      textAlign: "center !important",

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
                    onClick={() =>
                      handleNavigateToSeeAttendance(employee.userId)
                    }
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
                        textAlign: "center !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.employeeId}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "start !important",
                        pl: "40px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          <img
                            src={employee.image}
                            style={{
                              width: "38px",
                              height: "38px",
                              backgroundColor: "red",
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                        </Typography>
                        <Typography sx={{ ml: "10px" }}>
                          {employee.fullName}
                        </Typography>
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
                      {employee.checkIn ? formatDate(employee.checkIn) : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.checkIn
                        ? formatTime(employee.checkIn)
                        : "-- : --"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.checkOut
                        ? formatTime(employee.checkOut)
                        : "-- : --"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",

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
      </Box>
      <CheckInOutModal
        open={modalOpen}
        handleClose={handleCloseModal}
        checkId={selectedCheckId} // Pass the checkId to the modal
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleModalClose}
        loading={loadingDelete}
        onConfirm={handleDeleteConfirmed}
        requestText={"Are you sure you want to Delete this User Check In"}
        requestHeading={"checkIn Deletion"}
      />
    </Box>
  );
};

export default PayslipManagement;