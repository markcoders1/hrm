
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

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;



const SalesManagement = () => {
  const { setHeadertext, setParaText } = useOutletContext();

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
  },[])

  return (
    <Box>SalesManagement</Box>
  )
}

export default SalesManagement