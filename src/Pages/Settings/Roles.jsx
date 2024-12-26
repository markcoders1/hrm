
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
import ActiveRoles from './ComponentsTable/ActiveRoles';
import ModuleSetting from './ComponentsTable/ModuleSetting';
import { useQuery } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const fetchCompanyData = async (id) => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/general`);
  console.log("response from company data",response);
  return response.data.data.settings.modules;
};



const fetchRolesData = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/roles`); 
  console.log("response from Roles data",response);
  return response?.data;
};
const Roles = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [allEmployee1, setAllEmployee1] = useState([]);

  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  const { data: rolesData, isPending : rolesPending } = useQuery({
    queryKey: ["rolesData"],
    queryFn: () => fetchRolesData(),
    staleTime: 600000, 
    keepPreviousData:true,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching Roles data.");
    },
  });

  const { data: companyData, isPending } = useQuery({
    queryKey: ["companyData"],
    queryFn: () => fetchCompanyData(),
    staleTime: 600000, 
    keepPreviousData:true,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching Settings data.");
    },
  });


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


  if (isPending || rolesPending) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  return (
    <Box>
      <Box

        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xl: "3rem", xs: "2rem" },
        }}
      >
        <SettingsHeading Heading="Roles Setting" />
      </Box>

      <Box>
        <ActiveRoles
        rolesData={rolesData}
        />
      </Box>

      <Box
      sx={{
        mt:"20px"
      }}
      >
        <ModuleSetting
        moduleData={companyData}
        />
      </Box>
    </Box>
  )
}

export default Roles