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
  Tooltip
} from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Loader } from "../../components/Loaders";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/Employee.css";
import downloadIcon from "../../assets/download.png";
import eyeIcon from "../../assets/eye.png";
import editIconWhite from "../../assets/editIconWhite.png";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import CheckInOutModal from "../../components/CheckInEditModal/CheckInEditModal";
import SpinnerLoader from "../../components/SpinnerLoader";
import DeleteConfirmationModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PayslipManagement = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allPayslips, setAllPayslips] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year

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

  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  // States related to modals
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCheckId, setSelectedCheckId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [payslipsData, setPayslipsData] = useState([]);

  useEffect(() => {
    setHeadertext("PaySlip Management");
    setParaText(" ");
  }, [setHeadertext, setParaText]);

  
  useEffect(() => {
    const mockData = [
      {
        employeeId: "E001",
        fullName: "John Doe",
        department: "Finance",
        designation: "Accountant",
        image: "https://via.placeholder.com/38",
      },
      {
        employeeId: "E002",
        fullName: "Jane Smith",
        department: "Human Resources",
        designation: "HR Manager",
        image: "https://via.placeholder.com/38",
      },
      {
        employeeId: "E003",
        fullName: "Michael Brown",
        department: "IT",
        designation: "Software Engineer",
        image: "https://via.placeholder.com/38",
      },
      {
        employeeId: "E004",
        fullName: "Emily Davis",
        department: "Marketing",
        designation: "Marketing Specialist",
        image: "https://via.placeholder.com/38",
      },
      {
        employeeId: "E005",
        fullName: "William Johnson",
        department: "Sales",
        designation: "Sales Executive",
        image: "https://via.placeholder.com/38",
      },
    ];
    setAllEmployee(mockData);
    setLoading(false);
  }, []);

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
      toast.success("Check In Deleted Successfully", { position: "top-center" });

      // Replace this with actual data fetching if API works
      // fetchEmployeeData();

      setLoadingDelete(false);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting leave:", error);
      setLoadingDelete(false);
      toast.error("Leave Delete Could Not be Proceeded", { position: "top-center" });
    }
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedCheckId(null);
  };

  const buttonForDeleteEdit = (rowData, isHovered) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
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
            viewPdf()
          }}
        >
          <img src={isHovered ? eyeIcon : eyeIcon} style={{width:"26.78px", height:"16.07px"}} alt="view" />
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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
             downloadPdf(rowData)
          }}
        >
          <img src={downloadIcon} style={{width:"21.92px", height:"21.92px"}} alt="download" />
        </Typography>
      </Box>
    );
  };
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

  

  const fetchAllPayslip = async () => {
    const date = getUnixTimestampForMonthYear(selectedMonth, selectedYear);
    console.log(date);
    try {
      
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/payslips`,
        { params: { month: date } }
      );
      console.log(response);
      setPayslipsData(response.data.payrolls);
      
      
    
    } catch (error) {
      console.error("Error fetching Payslips data:", error);
    
    }
  };
  const [currentMonth, setCurrentMonth] = useState();
 useEffect(()=>{
  const date = getUnixTimestampForMonthYear(selectedMonth, selectedYear);
    console.log(date);
    setCurrentMonth(date)

    fetchAllPayslip()
 },[selectedMonth, selectedYear])
  const downloadPdf = async (rowData) => {

    console.log(rowData?.userId?._id);
    console.log(currentMonth);

    try {
   
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/payslipPDF`,
        method: "get",
        responseType: "blob",
        params:{
          _id : rowData?.userId?._id,
 
          month: currentMonth
        }
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : "download.pdf";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      if (response) {
        toast.success("PDF Downloaded Sucessfully", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setPdfLoading(false);
    }
  };

  const viewPdf = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/getattendancepdf`, 
        method: "get",
        responseType: "blob", 
      });

     
      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

     
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error viewing PDF:", error);
      toast.error("Unable to view PDF at this time.", { position: "top-center" });
    }
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
          top: "50px",
          zIndex: "100000 ",
        }}
      >
       <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "end",

            width: "100%",
          }}
        >
        <Box
        sx={{
          flexBasis: { lg: "400px", xs: "60%" }
        }}
        >

            <CustomSelectForType
              label="Month"
              value={selectedMonth}
              handleChange={handleMonthChange}
              options={months}
              height={{xl:"56px", xs:"46"}}
              width={{md:"200px", xs:""}}

              
              />
        
              </Box>
              <Box
        sx={{
          flexBasis: { lg: "100%", xs: "60%" },
          
        }}
        >
            <CustomSelectForType
              label="Year"
              value={selectedYear}
              handleChange={handleYearChange}
              options={years}
              height={{xl:"56px", xs:"46"}}
              width={{md:"200px", xs:""}}

            />
          </Box>
        </Box>
      </Box>
      <Box>
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              Sep / 2024
            </Typography>
            <Typography
              sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
            >
              {/* Placeholder for additional actions */}
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
                      textAlign: "start !important",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      minWidth: "80px",
                    
                    }}
                  >
                   &nbsp;&nbsp; Emp ID
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
                    Full Name
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
                    Department
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
                    Designation
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
                {payslipsData.map((payslip, index) => (
                  <TableRow
                    key={payslip?.userId?.companyId}
                    className="MuiTableRow-root"
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                 
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
                      }}
                      className="MuiTableCell-root"
                    >
                     &nbsp;&nbsp; {payslip.userId?.companyId}
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
                            src={payslip?.userId?.image}
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "50%",
                            }}
                            alt={payslip.fullName}
                          />
                        </Typography>
                        <Typography sx={{ ml: "10px" }}>
                          {payslip?.userId?.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        color: "#010120",
                      }}
                      className="MuiTableCell-root"
                    >
                      {payslip?.userId?.department}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        color: "#010120",
                      }}
                      className="MuiTableCell-root"
                    >
                      {payslip?.userId?.designation}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "10px !important",
                        borderRadius: "0px 8px 8px 0px",
                      }}
                      className="MuiTableCell-root"
                    >
                      {buttonForDeleteEdit(payslip, hoveredRow === index)}
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
        handleClose={() => setModalOpen(false)}
        checkId={selectedCheckId} // Pass the checkId to the modal
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleModalClose}
        loading={loadingDelete}
        onConfirm={() => handleDeleteConfirmed(selectedCheckId)}
        requestText={"Are you sure you want to delete this employee?"}
        requestHeading={"Employee Deletion"}
      />
    </Box>
  );
};

export default PayslipManagement;
