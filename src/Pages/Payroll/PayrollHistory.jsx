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
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import BasicBars from "../../components/BarChat/BarChart";
import CustomButton from "../../components/CustomButton/CustomButton";
import tickPng from "../../assets/tick.png";
import cancelPng from "../../assets/cancel.png";
import EditIcon from "../../assets/Edit.png";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PayrollHistory = ({ payrollList }) => {
  const [loading, setLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  const navigate = useNavigate();
  const [payrollHistoryData, setPayrollHistoryData] = useState([]);
  const [payrollHistoryTotal, setPayrollHistoryTotal] = useState();
  const [departments, setDepartments] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year

  const [selectedMonth2, setSelectedMonth2] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear2, setSelectedYear2] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleMonthChange2 = (event) => {
    setSelectedMonth2(event.target.value);
  };

  const [selectedDepartment, setSelectedDepartment] = useState("newTest"); 

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const months = [
    { label: "Select Start Month", value: "none" },
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
  const departmentsStatic = [
    { label: "newTest", value: "newTest" },
    { label: "Web & Apps", value:"Web & Apps" },
    { label: "Sales", value: "Sales" },
    { label: "Creatives", value: "Creatives" },
    { label: "Development", value: "Development"},
    { label: "HR & Admin", value: "HR & Admin" },
  
  ];
  

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }));

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleYearChange2 = (event) => {
    setSelectedYear2(event.target.value);
  };
  useEffect(() => {
    const fetchPayroll = async () => {
      const date = new Date(parseInt(selectedYear), parseInt(selectedMonth));
      const month = date.getTime();

      const date2 = new Date(parseInt(selectedYear2), parseInt(selectedMonth2));
      const month2 = date2.getTime();

      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/payrollhistory`,
          method: "get",
          params: {
            month: month ? month : "",
            to: month2 ? month2 : "",
          },
        });
        console.log(response);
        setPayrollHistoryData(response?.data?.payrolls);
        setPayrollHistoryTotal(response?.data?.total);
      } catch (error) {
        console.log("=========================> error at ", error);
      }
    };
    fetchPayroll();
  }, [selectedMonth, selectedMonth2, selectedYear, selectedYear2]);

  const calculatePayableAmount = (payroll) => {
    const basicSalary = payroll?.basicSalary || 0;
    const commission = payroll?.commission || 0;
    const ca = payroll?.ca || 0;
    const ma = payroll?.ma || 0;
    const ia = payroll?.ia || 0;
    const tax = payroll?.tax || 0;
    const deduction = payroll?.deduction || 0;

    return basicSalary + commission + ca + ma + ia - tax - deduction;
  };

  function downloadCSV(data) {
    // Convert data to Blob format
    const blob = new Blob([data], { type: "text/csv" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Usage example
  const csvData = "header1,header2\nrow1col1,row1col2"; // Replace with your CSV formatted text from backend

  const exportFile = async () => {
    setLoading(true);

    try {
      setLoading(true);
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/exportconfirmedPayrolls`,
        method: "get",
      });
      setLoading(false);
      console.log(response);
      downloadCSV(response.data);
    } catch (error) {
      console.log("=========================> error at ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  console.log("=================================================+>",departments);


  const getDepartments = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getdepartments`,
        method: "get",
      });
      console.log(response);
      setDepartments
      const tempval = response.data 
      let depart = tempval[Object.keys(tempval)[0]]
      console.log("tempval",tempval[Object.keys(tempval)[0]])
      setDepartments(depart)
    } catch (error) {
      console.log("=========================> error at ", error);
    }
  };

  useEffect(() => {
    getDepartments();
    console.log(departments);
  }, []);
  console.log(departments);

  return (
    <>
      {payrollHistoryData && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: { xl: "40px", xs: "30px" },
                color: "#010120",
              }}
            >
              Payroll History & Reports
            </Typography>

            <Box
              sx={{
                fontWeight: "500",
                color: "#010120",
                fontSize: "22px",
              }}
            >
              {/* here want to  render departments instead of month give just modification of it  */}

              <CustomSelectForType
                label="Department"
                value={selectedDepartment} // Assuming you have a selectedDepartment state
                handleChange={handleDepartmentChange} // Department change handler
                options={departmentsStatic}
                height={"46px"}
                width="220px"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "80px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: { xl: "20px", xs: "16px" },
                color: "#010120",
              }}
            ></Typography>

            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#010120",
                  fontWeight: "500",
                  ":hover": {
                    backgroundColor: "#303f9f",
                    color: "white",
                    border: "none",
                  },
                  borderRadius: "7px",
                  height: "45px",
                  width: "145px",
                  border: "1px solid #010120",
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: ".1s ease-in",
                }}
                onClick={() =>
                  navigate("/dashboard/payroll-management/compare-payroll")
                }
              >
                Compare
              </Typography>
              <Box>
                <Tooltip title="Download CSV">
                  <CustomButton
                    loading={loading}
                    ButtonText="Export"
                    fontSize="16px"
                    color="white"
                    fontWeight="500"
                    fullWidth={false}
                    variant="contained"
                    padding="8px 0px"
                    width={"144px"}
                    background="#157AFF"
                    hoverBg="#303f9f"
                    hovercolor="white"
                    borderRadius="7px"
                    buttonStyle={{ mb: "17px", height: "45px" }}
                    onClick={() => exportFile()}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "80px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  fontWeight: "500",
                  color: "#010120",
                  fontSize: "22px",
                }}
              >
                <CustomSelectForType
                  label="Month"
                  value={selectedMonth}
                  handleChange={handleMonthChange}
                  options={months}
                  height={"46px"}
                  width="180px"
                />
              </Box>
              <Box
                sx={{
                  fontWeight: "500",
                  color: "#010120",
                  fontSize: "22px",
                }}
              >
                <CustomSelectForType
                  label="Year"
                  value={selectedYear}
                  handleChange={handleYearChange}
                  options={years}
                  height={"46px"}
                  width="180px"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  fontWeight: "500",
                  color: "#010120",
                  fontSize: "22px",
                }}
              >
                <CustomSelectForType
                  label="Month"
                  value={selectedMonth2}
                  handleChange={handleMonthChange2}
                  options={months}
                  height={"46px"}
                  width="180px"
                />
              </Box>
              <Box
                sx={{
                  fontWeight: "500",
                  color: "#010120",
                  fontSize: "22px",
                }}
              >
                <CustomSelectForType
                  label="Year"
                  value={selectedYear2}
                  handleChange={handleYearChange2}
                  options={years}
                  height={"46px"}
                  width="180px"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexBasis: "100%", mt: "10px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350, width: "100%" }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      "&:hover": {
                        backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                      },
                      padding: " 0px",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        borderRadius: "8px 0px 0px 8px",
                        color: "#010120 !important",
                        paddingLeft: "40px !important",
                        minWidth: "100px",
                      }}
                    >
                      Emp Id
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "start",

                        color: "#010120 !important",
                        paddingLeft: "20px !important",
                        minWidth: "300px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",

                        minWidth: "150px",
                      }}
                    >
                      Deport
                    </TableCell>{" "}
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "200px",
                      }}
                    >
                      Designation
                    </TableCell>{" "}
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "200px",
                      }}
                    >
                      Basic Salary
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "140px",
                      }}
                    >
                      C/A
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "140px",
                      }}
                    >
                      M/A
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "140px",
                      }}
                    >
                      I/A
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "140px",
                      }}
                    >
                      Commission
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "240px",
                      }}
                    >
                      Net Gross Salary
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "180px",
                      }}
                    >
                      Tax
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        minWidth: "180px",
                      }}
                    >
                      Dedeuction
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        padding: "12px 0px",
                        fontSize: {
                          sm: "21px",
                          xs: "16px",
                        },
                        textAlign: "center",
                        color: "#010120  !important",
                        borderRadius: "0px 8px 8px 0px",
                        minWidth: "280px",
                      }}
                    >
                      Final Payable Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollHistoryData?.map((payroll, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          hoveredRow === index ? "#D1E4FF" : "inherit",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell
                        sx={{
                          textAlign: "center !important",

                          paddingLeft: "40px !important",
                          borderRadius: "8px 0px 0px 8px",
                        }}
                      >
                        {payroll?.companyId ? payroll?.companyId : "-- -- "}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#010120",
                          textAlign: "start !important",
                          paddingLeft: "20px !important",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: "50px", height: "50px" }}>
                            <img
                              src={payroll?.image}
                              style={{
                                borderRadius: "50%",
                                width: "100%",
                                height: "100%",
                              }}
                              alt=""
                            />
                          </Box>
                          <Typography
                            sx={{ ml: "10px", textAlign: "start !important" }}
                          >
                            {payroll?.fullName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.department ? payroll?.department : "-- -- "}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.designation ? payroll?.designation : "-- -- "}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.basicSalary ? payroll?.basicSalary : "00"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.ca ? payroll?.ca : "00"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.ma ? payroll?.ma : "00"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.ia ? payroll?.ia : "00"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.commission ? payroll?.commission : "00"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.basicSalary +
                          payroll?.ca +
                          payroll?.ma +
                          payroll?.ia +
                          payroll?.commission}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.tax ? payroll?.tax : "00"}
                      </TableCell>

                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {payroll?.deduction ? payroll?.deduction : "00"}
                      </TableCell>

                      <TableCell
                        sx={{
                          textAlign: "center !important",
                          paddingLeft: "0px !important",
                        }}
                      >
                        {/* {calculatePayableAmount(payroll)} */}
                        {payroll?.grossSalary ? payroll?.grossSalary : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow
                    // onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center !important",

                        paddingLeft: "40px !important",
                        borderRadius: "8px 0px 0px 8px",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "start !important",
                        paddingLeft: "20px !important",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{ ml: "10px", textAlign: "start !important" }}
                        ></Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.basicSalary
                        ? payrollHistoryTotal?.basicSalary
                        : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.ca ? payrollHistoryTotal?.ca : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total :{" "}
                      {payrollHistoryTotal?.ma ? payrollHistoryTotal?.ma : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.ia ? payrollHistoryTotal?.ia : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.commission
                        ? payrollHistoryTotal?.commission
                        : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.commission +
                        payrollHistoryTotal?.basicSalary +
                        payrollHistoryTotal?.ca +
                        payrollHistoryTotal?.ma +
                        payrollHistoryTotal?.ia}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.tax ? payrollHistoryTotal?.tax : ""}
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.deduction
                        ? payrollHistoryTotal?.deduction
                        : ""}
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#157AFF",
                        fontSize: "18px !important",
                      }}
                    >
                      Total:{" "}
                      {payrollHistoryTotal?.grossValue
                        ? payrollHistoryTotal?.grossValue
                        : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PayrollHistory;
