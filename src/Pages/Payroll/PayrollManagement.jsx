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

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const PayrollManagement = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [payrollData, setPayrollData] = useState([]);


  // const { data: graphData, isPending } = useQuery({
  //   queryKey: ["graphData",],
  //   queryFn: () => fetchGraphData(),
  //   staleTime: 600000, 
    
  //   onError: (error) => {
  //     console.error(error);
  //     toast.error("Error fetching profile data.");
  //   },
  // });

  useEffect(()=>{
  const fetchGraphData = async () => {
    try {
      const response =await axiosInstance({
        url : `${apiUrl}/api/admin/getPayrollData`,
        method:"get",


      })
      console.log(response)
      setPayrollData(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  fetchGraphData()
  },[])


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
          border: "2px solid red",
        }}
      >
        Start date , end date
      </Box>
      <Box
      sx={{
        display:"flex",
        gap:"2rem",
        mt:"30px"

      }}
      >
        <Box
        sx={{
          flexBasis:"50%",
          border:"2px solid yellow"
        }}
        >Chart</Box>
         <Box
        sx={{
          flexBasis:"50%",
        
          backgroundColor:"#E0EBFF",
          display:"flex",
          justifyContent:"center",
          alignItems:"start",
          flexDirection:"column",
          p:"25px 50px",
          borderRadius:"10px",
          fontWeight:"600 !important"
          
        }}
        >
          <Box sx={{ fontWeight:"600 !important", fontSize:{xl:"40px", xs:"30px"},}}>
            Total Payroll: {payrollData.totalSalary}
          </Box>
          <Box sx={{ fontWeight:"600", fontSize:{xl:"40px", xs:"30px"},}}>
            Current Employees: {payrollData.currentEmployees}
          </Box>
          <Box sx={{ fontWeight:"600", fontSize:{xl:"40px", xs:"30px"},}}>
          Last Payroll: {payrollData.lastPayroll}
          </Box>
          <Box sx={{ fontWeight:"600", fontSize:{xl:"40px", xs:"30px"},}}>
          Difference: {payrollData.difference}
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
};

export default PayrollManagement;
