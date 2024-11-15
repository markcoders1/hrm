
import BasicBars from "../../components/BarChat/BarChart";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/Employee.css";
import SalesEnteries from "./SalesEnteries";

import { useNavigate, useOutletContext } from "react-router-dom";

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
import SpinnerLoader from "../../components/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import BasicBarsForSales from "../../components/BarChat/BarChart";
import AddSales from "./AddSale";
import BankTransaction from "./BankTransactions";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;



const SalesManagement = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [addSale, setAddSale] = useState(false)
  const navigate = useNavigate();


    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth().toString()
      ); // Default to current month
      const [selectedYear, setSelectedYear] = useState(
        new Date().getFullYear().toString()
      ); // Default to current year

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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }));

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(()=>{
    setHeadertext("Sales");
    setParaText("");
    const date = new Date(parseInt(selectedYear), parseInt(selectedMonth));
    const month = date.getTime();
    console.log(month)
  },[])


  return (
    <Box>
         <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
                width="220px"
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
                width="220px"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </Box>
        </Box>
        <Box
        sx={{
          display:"flex",
          gap: "2rem",
          mt: "30px",
          flexDirection:{
            xs:"column-reverse",
            lg:"row"
          }
        }}
        >
          <Box
            sx={{
              flexBasis: "50%",
             
            }}
          >
            <BasicBarsForSales
           
            />

          </Box>
          <Box>
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
              height:"100%",
              gap:"30px"

            }}
          >
            <Box
              sx={{
                fontWeight: "600 !important",
                fontSize: { xl: "40px", xs: "25px" },
              }}
            >
              Total Sales: 100,000
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "25px" } }}
            >
         Total Outstanding Amount: 90,000
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "25px" } }}
            >
              Number of Sales: 40
            </Box>
          
          </Box>
          </Box>
        </Box>
        {
          addSale ? (
            <Box>
            <AddSales />
          </Box>
          ) : null
        }
       
        <Box
        sx={{
          marginTop:"100px"
        }}
        >
          <SalesEnteries
          
          setAddSaleToShow={setAddSale}/>
        </Box>

        <Box
        sx={{
          marginTop:"100px"
        }}
        >
          <BankTransaction />
          
          
        </Box>
    </Box>
  )
}

export default SalesManagement