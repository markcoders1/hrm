
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

const LastPayrollList = () => {
      // Use React Query to fetch payroll data with caching
  const { data: payrollData, isLoading: payrollLoading } = useQuery({
    queryKey: ["payrollList"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/confirmedPayrolls`);
      console.log(response);
    //   return response.data.unpaidMonths;
    },
    // keepPreviousData: true,

    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll data.");
    },
  });

 
  return (
    <Box>
         <Box sx={{ flexBasis: "100%" }}>
        <TableContainer
          component={Paper}
         
        >
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
                    minWidth: "140px",
                  }}
                >
                  Net Salary
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
                    minWidth: "180px",
                  }}
                >
                  Net Gross salary
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
            {/* <TableBody>
              {payrollData?.map((payroll, index) => (
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
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => handleInputChange(e, index, "CA")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => handleInputChange(e, index, "MA")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => handleInputChange(e, index, "IA")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) =>
                        handleInputChange(e, index, "commission")
                      }
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    {calculateNetGrossSalary(payroll, index).salary}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => handleInputChange(e, index, "tax")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="input-payroll"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => handleInputChange(e, index, "deduction")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "0px !important",
                    }}
                  >
                    {calculateNetGrossSalary(payroll, index).netGrossSalary}
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Approve Request">
                        <img
                          src={tickPng}
                          alt="Approve"
                          style={{
                            width: "34px",
                            height: "34px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            handleApprove(index , payroll);
                            e.stopPropagation(); // Prevent the row click event from firing
                          }}
                        />
                      </Tooltip>

                      <Tooltip title="Reject Request">
                        <img
                          src={cancelPng}
                          alt="Reject"
                          style={{
                            width: "34px",
                            height: "34px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            // validateReject(row._id);
                            e.stopPropagation();
                          }}
                        />
                      </Tooltip>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default LastPayrollList