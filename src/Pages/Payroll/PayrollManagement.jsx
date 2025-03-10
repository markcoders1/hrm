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
import LastPayrollList from "./LastPayrollList";
import PayrollHistory from "./PayrollHistory";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PayrollManagement = () => {
  const { setHeadertext, setParaText } = useOutletContext();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  ); // Default to current month
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Default to current year
  const [selectedPayrollType, setSelectedPayrollType] = useState("none");
  const [totalPayroll, setTotalPayroll] = useState();

  const [payrollListData, setPayrollListData] = useState([]);
  const [payrollLastData, setPayrollLastData] = useState([]);

  const handlePayrollChange = (event) => {
    setSelectedPayrollType(event.target.value);
  };

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

  const payrollType = [
    { label: "Payroll Type", value: "none" },
    { label: "Tax", value: "tax" },
    { label: "Salary", value: "salary" },
    { label: "comission", value: "comission" }, // Fixed typo here
  ];

  // Use React Query to fetch payroll data with caching
  const { data: payrollData, isLoading: payrollLoading } = useQuery({
    queryKey: ["payrollData"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/getPayrollData`
      );
      // console.log(response);
      return response.data;
    },
    keepPreviousData: true,

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

  // React Query to fetch graph data
  const { data: graphData, isLoading: graphLoading } = useQuery({
    queryKey: ["payrollGraph", selectedMonth, selectedYear],
    queryFn: async () => {
      const date = new Date(parseInt(selectedYear), parseInt(selectedMonth));
      const month = date.getTime();

      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/getPayrollGraph`,
        {
          params: { month: month },
        }
      );
      // console.log("====================>>>>>>>>>>>>>>", response);

      return response;
    },
    keepPreviousData: true,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll graph data.");
    },
  });

  useEffect(() => {
    setHeadertext("Payroll");
    setParaText(" ");
  }, [setHeadertext, setParaText]);
  const { data: payrollList, isLoading: listLoading } = useQuery({
    queryKey: ["payrollList"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/confirmedPayrolls`
      );
      console.log("========================>", response);
      setTotalPayroll(response.data.total);
      setPayrollLastData(response.data.payrolls);
      return response.data.payrolls;
    },
    keepPreviousData: true,

    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll data.");
    },
  });

  useEffect(() => {
    const fetchPayroll = async () => {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/confirmedPayrolls`
      );
      // console.log(response);
      setPayrollListData(response.data.payrolls);
    };
    fetchPayroll();
  }, []);

  // useEffect(()=>{
  //   const fetchPayroll =async () => {

  //     const response = await axiosInstance.get(`${apiUrl}/api/admin/payrollhistory`);
  //     console.log(response)
  //     setPayrollHistoryData(response.data)
  //   }
  //   fetchPayroll()
  // },[])

  // Function to get filtered graph data based on selected payroll type
  const getFilteredGraphData = () => {
    if (!graphData || !graphData.data) return { labels: [], data: [] };
    const { tax, salary, comission } = graphData.data;

    if (selectedPayrollType === "none") {
      return {
        labels: ["comission", "Tax", "Salary"],
        data: [comission, tax, salary],
      };
    } else {
      const valueMap = {
        comission,
        tax,
        salary,
      };
      const labelCapitalized =
        selectedPayrollType.charAt(0).toUpperCase() +
        selectedPayrollType.slice(1);
      return {
        labels: [labelCapitalized],
        data: [valueMap[selectedPayrollType] || 0],
      };
    }
  };

  const { labels, data } = getFilteredGraphData();

  if (payrollLoading) {
    return <SpinnerLoader />;
  }

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexBasis: { md: "48%", xs: "100%" },
            }}
          >
            <Box sx={{ width: { md: "200px", xs: "100%" } }}>
              <CustomSelectForType
                label="Month"
                value={selectedMonth}
                handleChange={handleMonthChange}
                options={months}
                height={"46px"}
                width="100%"
              />
            </Box>
            <Box sx={{ width: { md: "200px", xs: "100%" } }}>
              <CustomSelectForType
                label="Year"
                value={selectedYear}
                handleChange={handleYearChange}
                options={years}
                height={"46px"}
                width="100%"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "end",
              flexBasis: { md: "50%", xs: "100%" },
            }}
          >
            <Box sx={{ width: { md: "200px", xs: "100%" } }}>
              {/* Payroll Type Filter */}
              <CustomSelectForType
                label="Payroll Type"
                value={selectedPayrollType}
                handleChange={handlePayrollChange}
                options={payrollType}
                height={"46px"}
                width="100%"
              />
            </Box>

            <Box sx={{ width: { md: "170px", xs: "100%" } }}>
              <Tooltip title="Manage Payroll">
                <CustomButton
                  ButtonText="Manage Payroll"
                  fontSize="16px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="8px 0px"
                  width={"100%"}
                  background="#157AFF"
                  hoverBg="#303f9f"
                  hovercolor="white"
                  borderRadius="7px"
                  buttonStyle={{ mb: "17px", height: "45px" }}
                  onClick={() =>
                    navigate("/dashboard/payroll-management/manage-payroll")
                  }
                />
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            mt: "30px",
            flexDirection: {
              lg: "row",
              xs: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              flexBasis: "50%",
            }}
          >
            <Box
              sx={{
                flexBasis: "50%",
              }}
            >
              {graphData ? (
                <BasicBars labels={labels} data={data} />
              ) : (
                <BasicBars data={[0, 0, 0]} />
              )}
            </Box>
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
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}
            >
              Current Employees: {payrollData?.currentEmployees}
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}
            >
              Last Payroll: {payrollData?.lastPayroll}
            </Box>
            <Box
              sx={{ fontWeight: "600", fontSize: { xl: "40px", xs: "30px" } }}
            >
              Difference: {payrollData?.difference}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Last Payroll List */}
      <Box
        sx={{
          mt: "100px",
        }}
      >
        <LastPayrollList
          totalPayroll={totalPayroll}
          payrollList={payrollLastData}
          setPayrollList={setPayrollLastData}
          setTotalPayroll={setTotalPayroll}
        />
      </Box>

      <Box
        sx={{
          mt: "120px",
        }}
      >
        <PayrollHistory payrollList={payrollList} />
      </Box>
    </Box>
  );
};

export default PayrollManagement;
