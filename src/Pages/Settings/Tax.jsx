
import React from 'react'
import SettingsHeading from '../../components/Heading/SettingsHeading'
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


import editIconb from "../../assets/editIconGroup.png";
import BankPlatform from './ComponentsTable/BankPlatform';
import TaxableIncome from './ComponentsTable/TaxableIncome';



const Tax = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [allEmployee1, setAllEmployee1] = useState([]);

  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  useEffect(() => {
    const mockData = [
      {
        employeeId: "Top Management",
      },
      {
        employeeId: "Creatives",
      },
      {
        employeeId: "Developers",
      },
    ];
    setAllEmployee(mockData);

  }, []);

  useEffect(() => {
    const mockData1 = [
      {
        pkr: 40000,
        notPkr: 40000,
        col1: 5000,
        excess: 3
      },
      {
        pkr: 40000,
        notPkr: 40000,
        col1: 5000,
        excess: 8

      },
      {
        pkr: 40000,
        notPkr: 40000,
        col1: 5000,
        excess: 3

      },
      {
        pkr: 40000,
        notPkr: 40000,
        col1: 5000,
        excess: 3

      },
    ];
    setAllEmployee1(mockData1);

  }, []);
  return (
    <Box>
      <Box

        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xl: "3rem", xs: "2rem" },
        }}
      >
        <SettingsHeading Heading="Tax Setting" />
      </Box>

      <Box>
        <TaxableIncome
        mockData={allEmployee1}
        />
      </Box>
    </Box>
  )
}

export default Tax