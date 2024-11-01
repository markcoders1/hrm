
import FinancePieChart from './FinanceChart'

import BasicBars from "../../components/BarChat/BarChart";
import axiosInstance from "../../auth/axiosInstance";
import "../../PagesCss/Employee.css";


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
import AddFinance from './AddFinance';

import DetailedFinanceList from './DetailedFinanceList';


const FinanceManagement = () => {
    const { setHeadertext, setParaText } = useOutletContext();
    const [addFinance, setAddFinance] = useState(false);
    useEffect(()=>{
        setHeadertext("Finance Management");
        setParaText("");
      
      },[])
    return (
    <div>
        <Box
        sx={{
            display:"flex",
            gap:"2rem"
        }}
        >
            <Box>
        <FinancePieChart />
                
            </Box>
            <Box
            sx={{
              flexBasis: "50%",

              backgroundColor: "#E0EBFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "column",
              p: "25px 80px",
              borderRadius: "10px",
              fontWeight: "600 !important",
              height:"100%",
              gap:"30px",
              flexGrow:"1"

            }}
          >
            <Box
              sx={{
                fontWeight: "600 !important",
                fontSize: { xl: "40px", xs: "25px" },
              }}
            >
              Total Expenses: 100,000
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "25px" } }}
            >
         Budget Utilized: 90,000
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "25px" } }}
            >
             Remaining Budget: 10,000
            </Box>
          
          </Box>

        </Box>
{
    addFinance ? (
        <Box
sx={{
    mt:"100px"
}}
>
    <AddFinance />
</Box>
    ) : null
}

        <Box
        sx={{
            mt:"100px"
        }}
        >
            <DetailedFinanceList
            setAddToShow={setAddFinance}
            />
        </Box>
    </div>
  )
}

export default FinanceManagement