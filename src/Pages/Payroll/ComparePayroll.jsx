import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import BasicBars from "../../components/BarChat/BarChart";
import { Box, Tooltip } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import CompareBars from "../../components/BarChat/compareChart";

const ComparePayroll = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); 

    // State for second graph's month and year
    const [selectedMonth2, setSelectedMonth2] = useState(new Date().getMonth().toString());
    const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear().toString());

  const [selectedPayrollType, setSelectedPayrollType] = useState("none")

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }));

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange2 = (event) => {
    setSelectedYear2(event.target.value);
  };

  const handleMonthChange2 = (event) => {
    setSelectedMonth2(event.target.value);
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
    { label: "Commission", value: "comission" },
    
  ];
  const handlePayrollChange = (event) => {
    setSelectedPayrollType(event.target.value);
  };

    // Filtering data for the selected payroll type
    const filterData = (data) => {
      if (!data) return [0, 0, 0]; // Default to [0, 0, 0] if data is unavailable
  
      const { tax = 0, salary = 0, comission = 0 } = data.data;
      switch (selectedPayrollType) {
        case "tax":
          return [0, tax, 0];
        case "salary":
          return [0, 0, salary];
        case "comission":
          return [comission, 0, 0];
        default:
          return [comission, tax, salary];
      }
    };
  

 // React Query to fetch graph data for 1st graph
 const { data: graphData1, isLoading: graphLoading ,  } = useQuery({
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
      console.log("response === 1 ==> ",response)
      
      return response;
    },
    // keepPreviousData: true, 
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll graph data.");
    },
  });

   // React Query to fetch graph data for 2nd graph
 const { data: graphData2  } = useQuery({
    queryKey: ["payrollGraph", selectedMonth2, selectedYear2],
    queryFn: async () => {
        const date = new Date(parseInt(selectedYear2), parseInt(selectedMonth2));
        const month = date.getTime();

        console.log("hello world")

      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/getPayrollGraph`,
        {
          params: { month: month },
        }
      );
      console.log("response === 2 ==> ",response)
      return response;
    },
    // keepPreviousData: true, 
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll graph data.");
    },
  });

  const fetchGraph2 = async () => {
    const date = new Date(parseInt(selectedYear2), parseInt(selectedMonth2));
    const month = date.getTime();

    try {
      const response = await axiosInstance({
        url : `${apiUrl}/api/admin/getPayrollGraph`,
        method : "get",
        params : {
          month : month
        },
      });
      console.log("============================>  2",response)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchGraph2()
  },[selectedYear2,selectedMonth2])

  
  useEffect(() => {
    setHeadertext("Compare Payroll");
    setParaText(" ");

  }, [setHeadertext, setParaText]);



  return (
   <div>
     <Box>
     <Box
         sx={{
          display: "flex",
          gap: "1.5rem",
          alignItems:"center",
          justifyContent:"end"
        }}
        >
          <Box>
          <CustomSelectForType
            label="Payroll Type"
            value={selectedPayrollType ? selectedPayrollType : ""}
            handleChange={handlePayrollChange}
            options={payrollType}
            height={"46px"}
            width="220px"
          />
          

          </Box>

          {/* <Box>
            //designation array will be render here
          <CustomSelectForType
            label="Designation"
            value={selectedPayrollType ? selectedPayrollType : ""}
            handleChange={handlePayrollChange}
            options={payrollType}
            height={"46px"}
            width="220px"
          />
          </Box> */}
        </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt:"30px"
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
              value={ selectedMonth}
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
              value={ selectedMonth2}
              handleChange={handleMonthChange2}
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
              value={selectedYear2}
              handleChange={handleYearChange2}
              options={years}
              height={"46px"}
              width="220px"
            />
          </Box>

          
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
          <Box
            sx={{
              flexBasis: "50%",
            }}
          >
            {graphData1 ? (
              <CompareBars
              data={filterData(graphData1)}
              />
            ) : (
              <CompareBars
              tax={"0"}
              salary={"0"}
              commission={"0"}
            />
            )}
          </Box>
        </Box>
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
            {graphData2 ? (
              <CompareBars
              data={filterData(graphData2)} 
              />
            ) : (
              <CompareBars
              
              tax={"5"}
              salary={"0"}
              commission={"0"}
            />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
   </div>
  )
}

export default ComparePayroll