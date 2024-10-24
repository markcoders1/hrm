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
import tickPng from "../../assets/tick.png";
import cancelPng from "../../assets/cancel.png";
import EditIcon from "../../assets/Edit.png";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const LastPayrollList = ({ payrollList, totalPayroll }) => {
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  const calculatePayableAmount = (payroll) => {
    const basicSalary = payroll?.basicSalary || 0;
    const commission = payroll?.commission || 0;
    const ca = payroll?.ca || 0;
    const ma = payroll?.ma || 0;
    const ia = payroll?.ia || 0;
    const tax = payroll?.tax || 0;
    const deduction = payroll?.deduction || 0;

    return basicSalary + commission + ca + ma + ia - tax - deduction;
  };

  const handleProcess = async () => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/processpayroll`
      );
      // console.log("last Payroll ",response)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    {
      totalPayroll && (
        <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xl: "40px", xs: "30px" },
              color: "#010120",
            }}
          >
            Last Payroll List
          </Typography>
  
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: { xl: "20px", xs: "16px" },
              color: "#010120",
              display:"none"
            }}
          >
            Status: Pending
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "80px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: { xl: "20px", xs: "16px" },
              color: "#010120",
            }}
          >
            Sep / 2024
          </Typography>
  
          <Typography
            sx={{
              fontSize: "16px",
              color: "#010120",
              fontWeight: "500",
              ":hover": {
                backgroundColor: "#303f9f",
                color: "white",
                border: "none",
              },
              borderRadius: "7px",
              height: "45px",
              width: "145px",
              border: "1px solid #010120",
              boxShadow: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: ".1s ease-in",
            }}
            onClick={handleProcess}
          >
            Process
          </Typography>
        </Box>
        <Box sx={{ flexBasis: "100%", mt: "20px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350, width: "100%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    "&:hover": {
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    },
                    padding: " 0px",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120 !important",
                      paddingLeft: "40px !important",
                      minWidth: "100px",
                    }}
                  >
                    Emp Id
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "start",
  
                      color: "#010120 !important",
                      paddingLeft: "20px !important",
                      minWidth: "300px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
  
                      minWidth: "150px",
                    }}
                  >
                    Deport
                  </TableCell>{" "}
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "200px",
                    }}
                  >
                    Designation
                  </TableCell>{" "}
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "200px",
                    }}
                  >
                    Basic Salary
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "140px",
                    }}
                  >
                    C/A
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "140px",
                    }}
                  >
                    M/A
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "140px",
                    }}
                  >
                    I/A
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "140px",
                    }}
                  >
                    Commission
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "240px",
                    }}
                  >
                    Net Gross Salary
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "180px",
                    }}
                  >
                    Tax
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      minWidth: "180px",
                    }}
                  >
                    Dedeuction
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120  !important",
                      borderRadius: "0px 8px 8px 0px",
                      minWidth: "280px",
                    }}
                  >
                    Final Payable Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrollList?.map((payroll, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        hoveredRow === index ? "#D1E4FF" : "inherit",
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center !important",
  
                        paddingLeft: "40px !important",
                        borderRadius: "8px 0px 0px 8px",
                      }}
                    >
                      {payroll?.companyId ? payroll?.companyId : "-- -- "}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "start !important",
                        paddingLeft: "20px !important",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "50px", height: "50px" }}>
                          <img
                            src={payroll?.image}
                            style={{
                              borderRadius: "50%",
                              width: "100%",
                              height: "100%",
                            }}
                            alt=""
                          />
                        </Box>
                        <Typography
                          sx={{ ml: "10px", textAlign: "start !important" }}
                        >
                          {payroll?.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.department ? payroll?.department : "-- -- "}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.designation ? payroll?.designation : "-- -- "}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.basicSalary ? payroll?.basicSalary : "00"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.ca ? payroll?.ca : "00"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.ma ? payroll?.ma : "00"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.ia ? payroll?.ia : "00"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.commission ? payroll?.commission : "00"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                       {(payroll?.basicSalary + payroll?.commission + payroll?.ca + payroll?.ma + payroll?.ia)}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.tax ? payroll?.tax : "00"}
                    </TableCell>
  
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {payroll?.deduction ? payroll?.deduction : "00"}
                    </TableCell>
  
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {calculatePayableAmount(payroll)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  // onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell
                    sx={{
                      textAlign: "center !important",
  
                      paddingLeft: "40px !important",
                      borderRadius: "8px 0px 0px 8px",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      color: "#010120",
                      textAlign: "start !important",
                      paddingLeft: "20px !important",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ ml: "10px", textAlign: "start !important" }}
                      ></Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total:{" "}
                    {totalPayroll?.basicSalary 
                      ? totalPayroll?.basicSalary 
                      : "-- --"}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total: {totalPayroll?.ca ? totalPayroll?.ca : "-- --"}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total: {totalPayroll?.ma ? totalPayroll?.ma : "-- --"}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total: {totalPayroll?.ia ? totalPayroll?.ia  : "-- --"}
  
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                    
                  >
                    Total: {totalPayroll?.commission ? totalPayroll?.commission  : "-- --"}
  
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total: {(totalPayroll?.basicSalary + totalPayroll?.commission + totalPayroll?.ca + totalPayroll?.ma + totalPayroll?.ia)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
               Total: {totalPayroll?.tax ? totalPayroll?.tax  : "-- --"}
  
                  </TableCell>
  
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
               Total: {totalPayroll?.deduction ? totalPayroll?.deduction    : "-- --"}
  
                  </TableCell>
  
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                      color: "#157AFF",
                      fontSize: "18px !important",
                    }}
                  >
                    Total: {(totalPayroll?.basicSalary + totalPayroll?.commission + totalPayroll?.ca + totalPayroll?.ma + totalPayroll?.ia) - (totalPayroll?.tax + totalPayroll?.deduction)}
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      )
    }
  
    </>
  );
};

export default LastPayrollList;
