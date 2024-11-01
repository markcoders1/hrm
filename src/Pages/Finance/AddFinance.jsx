import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../PagesCss/Employee.css"; // Ensure this contains styles for input-sales and other classes
// import "../../PagesCss/AddSales.css"; // Add any additional styles if necessary
import tickSinglePng from "../../assets/tickSingle.png";
import cancelImage from "../../assets/ban.png";
import axios from "axios"; // Ensure axios is installed via npm/yarn
import axiosInstance from "../../auth/axiosInstance";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import CustomButton from "../../components/CustomButton/CustomButton";


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL ;

const AddFinance = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const [selectSalesPerson, setSelectSalesPerson] = useState("all"); 
  const [departments, setDepartments] = useState([]);


  
  // Single sales data object
  const [salesData, setSalesData] = useState({
    date: "",
    description: "",
    category: "",
    Amount: "",
   
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Optional: To handle loading state

  const getDepartments = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getdepartments`,
        method: "get",
      });
      console.log(response);
    
      const tempval = response.data 
      let depart = tempval[Object.keys(tempval)[0]]
      console.log("tempval",tempval[Object.keys(tempval)[0]])
      setDepartments(depart)
    } catch (error) {
      console.log("=========================> error at ", error);
    }
  };

  useEffect(() => {
    getDepartments();
    console.log(selectSalesPerson);
  }, []);



  const handleChange = (field, value) => {
    setSalesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleActionSubmit = async () => {
   
    setIsSubmitting(true);
    console.log(salesData);
    try {
      const response = await axios.post(`${apiUrl}/api/sales`, salesData);
      console.log("API Response:", response.data);
      toast.success("Sales data submitted successfully!");
      // Optionally, reset the form
      setSalesData({
        date: "",
        description: "",
        Amount: "",
        category: "",
        
        
      });
    } catch (error) {
      console.error("Error submitting Finance data:", error);
      toast.error("Failed to submit Finance data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSalespersonChange = (event) => {
    setSelectSalesPerson(event.target.value);
  };
  return (
    <Box>
      <Box sx={{ flexBasis: "100%", padding: "0px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="add sales table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#E0EBFF",
                  
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    borderRadius: "8px 0px 0px 8px",
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    color: "#010120 !important",
                    minWidth: "240px",
                    border: "none !important",
                  }}
                >
                   Date
                </TableCell>
              
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    color: "#010120 !important",
                    minWidth: "540px",
                    border: "none !important",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    color: "#010120 !important",
                    minWidth: "240px",
                    border: "none !important",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    color: "#010120 !important",
                    minWidth: "240px",
                    border: "none !important",
                  }}
                >
                   Amount
                </TableCell>
             
                <TableCell
                  align="center"
                  sx={{
                    borderRadius: "0px 8px 8px 0px",
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    color: "#010120 !important",
                    minWidth: "240px",
                    border: "none !important",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
           
            >
              <TableRow
              sx={{
                ":hover":{
                    backgroundColor:"white !important"
                }
              }}
              >
                {/* Paid Date */}
                <TableCell align="center"
                sx={{
                    borderRadius:"8px 0px 0px 8px",
                 

                }}
                >
                  <input
                    type="date"
                    className="input-sales sales-date"
                    value={salesData.date}
                    onChange={(e) =>
                      handleChange("date", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Billed To */}
                <TableCell align="center">
                  <input
                    type="text"
                    className="input-sales"
                    value={salesData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    style={{
                        width:"90%"
                    }}
                    required
                  />
                </TableCell>
                
                <TableCell align="center">
                
              <CustomSelectForType
                label="Department"
                value={selectSalesPerson} // Assuming you have a selectedDepartment state
                handleChange={handleSalespersonChange} // Department change handler
                options={departments}
                height={"36px"}
                width="180px"
              />
                </TableCell>
                {/* Product */}
                <TableCell align="center">
                  <input
                    type="text"
                    className="input-sales"
                    value={salesData.Amount}
                    onChange={(e) =>
                      handleChange("Amount", e.target.value)
                    }
                    required
                  />
                </TableCell>
           
                {/* Action */}
                <TableCell align="center"
                sx={{
                    borderRadius: "0px 8px 8px 0px",
                }}
                >
                  <Tooltip title="Submit Sales Data">
                  <CustomButton
                //   loading={loading}
                  border= "1px solid #010120"

                  borderRadius="7px"
                  background="white"
                  hoverBg="#157AFF"
                  
                  buttonTextStyle={{}}
                  buttonStyle={{
                  height:"45px",
                  width:"145px"
                  }}
                  ButtonText="Add +"
                  
                  hoverBorder="none"
                  fontSize="16px"
                  color="#010120"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="10px 20px"
                  loaderColor=" #010120"
                //   onClick={handleProcess}
                  hovercolor="white"
                />
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AddFinance;
