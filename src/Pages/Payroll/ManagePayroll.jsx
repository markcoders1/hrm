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
import tickSinglePng from "../../assets/tickSingle.png";
import cancelImage from "../../assets/ban.png";

import cancelPng from "../../assets/cancel.png";
import EditIcon from "../../assets/editIconGroup.png";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ManagePayroll = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [isPending, setIsPending] = useState(true);
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  const [inputValues, setInputValues] = useState({});
  const [payrollList, setPayrollList] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const [editableAllowances, setEditableAllowances] = useState({});
const [fixedInputs, setFixedInputs] = useState({});

  const { data: payrollData, isLoading: payrollLoading } = useQuery({
    queryKey: ["payrollData"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/payroll`);
      console.log(response);
      const data = response?.data?.unpaidMonths;
      setPayrollList(data);
      return data;
    },
    keepPreviousData: true,

    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll data.");
    },
  });

  const handleInputChange = (e, index, field) => {
     const value = e.target.value.replace(/[^0-9]/g, ""); 
    setInputValues((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const calculateNetGrossSalary = (rowData, index) => {
    const { basicSalary } = rowData;
    const inputs = inputValues[index] || {};
    
    // Use edited values if available, otherwise fallback to original data
    const CA = parseFloat(inputs.CA) || parseFloat(rowData.commuteAllowance) || 0;
    const MA = parseFloat(inputs.MA) || parseFloat(rowData.mobileAllowance) || 0;
    const IA = parseFloat(inputs.IA) || parseFloat(rowData.internetAllowance) || 0;
    const commission = parseFloat(inputs.commission) || 0;
    const tax = parseFloat(inputs.tax) || 0;
    const deduction = parseFloat(inputs.deduction) || 0;
  
    const salary = basicSalary + CA + MA + IA;
    const netSalary = salary + commission;
    const netGrossSalary = netSalary - tax - deduction;
  
    return { netSalary, netGrossSalary, salary };
  };

  //   const calculateNetSalary = (rowData, index) => {
  //     const { basicSalary } = rowData;
  //     const inputs = inputValues[index] || {};
  //     const ca = parseFloat(inputs.CA || 0);
  //     const ma = parseFloat(inputs.MA || 0);
  //     const ia = parseFloat(inputs.IA || 0);
  //     const commission = parseFloat(inputs.commission || 0);
  //     const tax = parseFloat(inputs.tax || 0);
  //     const deduction = parseFloat(inputs.deduction || 0);

  //     // Calculate net salary and gross salary
  //     const netSalary = basicSalary + ca + ma + ia + commission;
  //     const netGrossSalary = netSalary - tax - deduction;

  //     return { netSalary, netGrossSalary };
  //   };

  const handleApprove = async (index, payroll) => {
    const { netSalary, netGrossSalary } = calculateNetGrossSalary(
      payroll,
      index
    );
    const inputs = inputValues[index];

    //     const inputValues3 = {
    //         userId: payroll.userId,
    //         ca: +inputs?.CA,
    //         ma: +inputs?.MA,
    //         ia: +inputs?.IA,
    //         commission: +inputs?.commission,
    //         tax: +inputs?.tax,
    //         deduction: +inputs?.deduction,
    //     }
    // console.log(inputValues3.tax)

    const obj = {
      userId: payroll?.userId,
      ca: parseFloat(inputs?.CA ?? payroll?.commuteAllowance ?? 0),
      ma: parseFloat(inputs?.MA ?? payroll?.mobileAllowance ?? 0),
      ia: parseFloat(inputs?.IA ?? payroll?.internetAllowance ?? 0),
      commission: parseFloat(inputs?.commission ?? 0),
      tax: parseFloat(inputs?.tax ?? 0),
      deduction: parseFloat(inputs?.deduction ?? 0),
      month: payroll?.month,
    }
    console.log(obj)

    // try {
    //   const response = await axiosInstance({
    //     url: `${apiUrl}/api/admin/payroll`,
    //     method: "post",
    //     data: {
    //       userId: payroll?.userId,
    //       ca: parseFloat(inputs?.CA ?? payroll?.commuteAllowance ?? 0),
    //       ma: parseFloat(inputs?.MA ?? payroll?.mobileAllowance ?? 0),
    //       ia: parseFloat(inputs?.IA ?? payroll?.internetAllowance ?? 0),
    //       commission: parseFloat(inputs?.commission ?? 0),
    //       tax: parseFloat(inputs?.tax ?? 0),
    //       deduction: parseFloat(inputs?.deduction ?? 0),
    //       month: payroll?.month,
    //     },
    //   });

    //   console.log(response);
    //   setPayrollList((prev) =>
    //     prev.filter((item) => item.userId !== payroll.userId)
    //   );
    //   toast.success("Payroll updated successfully!");
    // } catch (error) {
    //   console.error("Error updating payroll:", error);
    //   toast.error("Failed to update payroll.");
    // }
  };

  useEffect(() => {
    setHeadertext("Payroll Management");
    setParaText(" ");
  }, [setHeadertext, setParaText]);

  if (payrollLoading) {
    return <SpinnerLoader />;
  }

  return (
    <Box>
      <Box sx={{ flexBasis: "100%" }}>
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
            {payrollList?.length > 0 ? (
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
                    <TableCell>
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) => handleInputChange(e, index, "CA")}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ))
                          }
                          value={inputValues[index]?.CA || ""}
                        />
                      ) : payroll?.commuteAllowance ? (
                        payroll?.commuteAllowance
                      ) : (
                        "0"
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) => handleInputChange(e, index, "MA")}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ))
                          }
                          value={inputValues[index]?.MA || ""}
                        />
                      ) : payroll?.mobileAllowance ? (
                        payroll?.mobileAllowance
                      ) : (
                        "0"
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) => handleInputChange(e, index, "IA")}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ))
                          }
                          value={inputValues[index]?.IA || ""}
                        />
                      ) : payroll?.internetAllowance ? (
                        payroll?.internetAllowance
                      ) : (
                        "0"
                      )}
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
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ))
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
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ))
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
                          handleInputChange(e, index, "deduction")
                        }
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ))
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
                      {editingRow === index ? (
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1.5rem",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Save Changes">
                            <img
                              src={tickSinglePng}
                              alt="Save"
                              style={{
                                width: "12.5px",
                                height: "9.6px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                handleApprove(index, payroll);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <img
                              src={cancelImage}
                              alt="Cancel"
                              style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                setEditingRow(null); // Exit edit mode
                                setInputValues((prev) => {
                                  const updatedValues = { ...prev };
                                  delete updatedValues[index];
                                  return updatedValues;
                                });
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1.5rem",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Approve Request">
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                border: "2px solid grey",
                              }}
                            >
                              <img
                                src={tickSinglePng}
                                alt="Approve"
                                style={{
                                  width: "12.5px",
                                  height: "9.6px",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  handleApprove(index, payroll);
                                  e.stopPropagation(); // Prevent the row click event from firing
                                }}
                              />
                            </Typography>
                          </Tooltip>

                          <Tooltip title="Edit Fields">
                            <img
                              src={EditIcon}
                              alt="Edit"
                              style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                setEditingRow(index);
                                setInputValues((prev) => ({
                                  ...prev,
                                  [index]: {
                                    ...prev[index],
                                    CA:
                                      prev[index]?.CA ||
                                      payroll.commuteAllowance,
                                    MA:
                                      prev[index]?.MA ||
                                      payroll.mobileAllowance,
                                    IA:
                                      prev[index]?.IA ||
                                      payroll.internetAllowance,
                                    commission: prev[index]?.commission || 0,
                                    tax: prev[index]?.tax || 0,
                                    deduction: prev[index]?.deduction || 0,
                                  },
                                }));
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              ""
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ManagePayroll;
