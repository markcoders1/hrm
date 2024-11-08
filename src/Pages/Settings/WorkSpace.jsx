
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
import deleteIcon from "../../assets/deleteIcon.png";

import editIconWhite from "../../assets/editIconGroup.png";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import CheckInOutModal from "../../components/CheckInEditModal/CheckInEditModal";
import SpinnerLoader from "../../components/SpinnerLoader";
import DeleteConfirmationModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import ActiveDepartment from './ComponentsTable/ActiveDepartment';
import EmployementSetting from './ComponentsTable/EmployementSetting';



const WorkSpace = () => {
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
        employeeId: "Permanent/ Full time Employee",
      },
      {
        employeeId: "Part Time Employee",
      },
      {
        employeeId: "On Probation Employee",
      },
      {
        employeeId: "Remote Employee",
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
        <SettingsHeading Heading="WorkSpace Organization" />
      </Box>

      <Box>
        <ActiveDepartment
        mockData={allEmployee}
        />
      </Box>

      <Box
      sx={{
        mt:"20px"
      }}
      >
        <EmployementSetting
        mockData={allEmployee1}
        />
      </Box>
    </Box>
  )
}

export default WorkSpace