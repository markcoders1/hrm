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


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "https://your-api-url.com"; // Replace with your actual API URL

const AddSales = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const [selectSalesPerson, setSelectSalesPerson] = useState("all"); 
  const [departments, setDepartments] = useState([]);


  
  // Single sales data object
  const [salesData, setSalesData] = useState({
    paidDate: "",
    billedTo: "",
    salesPerson: "",
    product: "",
    invoiceAmount: "",
    invoiceStatus: "",
    sentDate: "",
    amountPaid: "",
    outstandingAmount: "",
    platform: "",
    amountReceived: "",
    refundAmount: "",
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
        paidDate: "",
        billedTo: "",
        salesPerson: "",
        product: "",
        invoiceAmount: "",
        invoiceStatus: "",
        sentDate: "",
        amountPaid: "",
        outstandingAmount: "",
        platform: "",
        amountReceived: "",
        refundAmount: "",
      });
    } catch (error) {
      console.error("Error submitting sales data:", error);
      toast.error("Failed to submit sales data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSalespersonChange = (event) => {
    setSelectSalesPerson(event.target.value);
  };
  return (
    <Box>
      <Box sx={{ flexBasis: "100%", padding: "20px" }}>
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
                  Paid Date
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
                  Billed To
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
                  Salesperson
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
                  Product
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
                  Invoice Amount
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
                  Invoice Status
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
                  Sent Date
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
                  Amount Paid
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
                  Outstanding Amount
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
                  Platform
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
                  Amount Received
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
                  Refund Amount
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
                    value={salesData.paidDate}
                    onChange={(e) =>
                      handleChange("paidDate", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Billed To */}
                <TableCell align="center">
                  <input
                    type="text"
                    className="input-sales"
                    value={salesData.billedTo}
                    onChange={(e) =>
                      handleChange("billedTo", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Salesperson */}
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
                    value={salesData.product}
                    onChange={(e) =>
                      handleChange("product", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Invoice Amount */}
                <TableCell align="center">
                  <input
                    type="text"
                    className="input-sales"
                    value={salesData.invoiceAmount}
                    onChange={(e) =>
                      handleChange("invoiceAmount", e.target.value)
                    }
                    required
                    min="0"
                    // style={{ width: "100px" }}
                  />
                </TableCell>
                {/* Invoice Status */}
                <TableCell align="center">
                  <select
                    className="input-sales"
                    value={salesData.invoiceStatus}
                    onChange={(e) =>
                      handleChange("invoiceStatus", e.target.value)
                    }
                    required
                    style={{ width: "120px" }}
                  >
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </TableCell>
                {/* Sent Date */}
                <TableCell align="center">
                  <input
                    type="date"
                    className="input-sales sales-date"
                    value={salesData.sentDate}
                    onChange={(e) =>
                      handleChange("sentDate", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Amount Paid */}
                <TableCell align="center">
                  <input
                    type="number"
                    className="input-sales"
                    value={salesData.amountPaid}
                    onChange={(e) =>
                      handleChange("amountPaid", e.target.value)
                    }
                    required
                    min="0"
                    
                  />
                </TableCell>
                {/* Outstanding Amount */}
                <TableCell align="center">
                  <input
                    type="number"
                    className="input-sales"
                    value={salesData.outstandingAmount}
                    onChange={(e) =>
                      handleChange("outstandingAmount", e.target.value)
                    }
                    required
                    min="0"
                    
                  />
                </TableCell>
                {/* Platform */}
                <TableCell align="center">
                  <input
                    type="text"
                    className="input-sales"
                    value={salesData.platform}
                    onChange={(e) =>
                      handleChange("platform", e.target.value)
                    }
                    required
                  />
                </TableCell>
                {/* Amount Received */}
                <TableCell align="center">
                  <input
                    type="number"
                    className="input-sales"
                    value={salesData.amountReceived}
                    onChange={(e) =>
                      handleChange("amountReceived", e.target.value)
                    }
                    required
                    min="0"
                    
                  />
                </TableCell>
                {/* Refund Amount */}
                <TableCell align="center">
                  <input
                    type="number"
                    className="input-sales"
                    value={salesData.refundAmount}
                    onChange={(e) =>
                      handleChange("refundAmount", e.target.value)
                    }
                    required
                    min="0"
                    
                  />
                </TableCell>
                {/* Action */}
                <TableCell align="center"
                sx={{
                    borderRadius: "0px 8px 8px 0px",
                }}
                >
                  <Tooltip title="Submit Sales Data">
                    <Button
                      type="button"
                      onClick={handleActionSubmit}
                      className="action-button"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "8px 16px",
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
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

export default AddSales;
