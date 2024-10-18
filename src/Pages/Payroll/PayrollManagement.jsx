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

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PayrollManagement = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year
  const [graphData, setGraphData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  


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


  // Use React Query to fetch payroll data with caching
  const { data: payrollData, isLoading: payrollLoading } = useQuery({
    queryKey: ["payrollData"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/getPayrollData`);
      console.log(response)
      return response.data;
    },
    staleTime: 60000, // Cache the data for 1 minute
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll data.");
    },
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }));

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  
  const fetchGraphData = async () => {
    const date = new Date(parseInt(selectedYear), parseInt(selectedMonth));
    const month = date.getTime(); 
    console.log(month)
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getPayrollGraph`,
        method: "get",
        params: {
         month : month
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Convert date to Unix timestamp (in milliseconds)
  const convertToUnixTimestamp = (date) => {
    return date ? new Date(date).getTime() : null;
  };

 
  const handleFetchGraphData = () => {
 
      const from = convertToUnixTimestamp(startDate);
      const to = convertToUnixTimestamp(endDate);
      fetchGraphData(from, to);
  
  };

  useEffect(()=>{

    handleFetchGraphData()
  },[selectedMonth, selectedYear])

  useEffect(() => {
    setHeadertext("Payroll");
    setParaText(" ");

    // console.log("===========>", yourData)
  }, [setHeadertext, setParaText]);

  if (!loading) {
    return <SpinnerLoader />;
  }
  return (
    <Box>
      <Box
        sx={{
          
          display:"flex",
          justifyContent:"space-between"
        }}
      >
        <Box
        sx={{
          display:"flex",
          gap:"3rem"
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
              width="250px"
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
              width="250px"
            />
          </Box>
        </Box>

        <Box>
       
            <CustomSelectForType
              label="Month"
              value={selectedMonth}
              handleChange={handleMonthChange}
              options={months}
              height={"46px"}
              width="250px"
            />
       
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          mt: "30px",
        }}
      >
        <Box
          sx={{
            flexBasis: "50%",

          }}
        >
        <BasicBars />
        </Box>
        <Box
          sx={{
            flexBasis: "50%",

            backgroundColor: "#E0EBFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "column",
            p: "25px 50px",
            borderRadius: "10px",
            fontWeight: "600 !important",
          }}
        >
          <Box
            sx={{
              fontWeight: "600 !important",
              fontSize: { xl: "40px", xs: "30px" },
            }}
          >
            Total Payroll: {payrollData?.totalSalary}
          </Box>
          <Box sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}>
            Current Employees: {payrollData?.currentEmployees}
          </Box>
          <Box sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}>
            Last Payroll: {payrollData?.lastPayroll}
          </Box>
          <Box sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}>
            Difference: {payrollData?.difference}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PayrollManagement;
