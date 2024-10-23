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

      const initialFixedInputs = {};
      data.forEach((payroll, index) => {
        initialFixedInputs[index] = {
          commission: payroll.commission || "",
          tax: payroll.tax || "",
          deduction: payroll.deduction || "",
        };
      });
      setFixedInputs(initialFixedInputs);

      return data;
    },
    keepPreviousData: true,

    onError: (error) => {
      console.error(error);
      toast.error("Error fetching payroll data.");
    },
  });

  const handleInputChange = (e, index, field, type) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (type === "allowance") {
      setEditableAllowances((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: value,
        },
      }));
    } else if (type === "fixed") {
      setFixedInputs((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: value,
        },
      }));
    }
  };

  const calculateNetGrossSalary = (rowData, index) => {
    const { basicSalary } = rowData;
    const allowanceInputs = editableAllowances[index] || {};
    const fixedInput = fixedInputs[index] || {};


    const basicSal =
      editingRow === index
        ? parseFloat(allowanceInputs.basicSalary) ||
          parseFloat(rowData.basicSalary) ||
          0
        : parseFloat(rowData.basicSalary) || 0;
    const CA =
      editingRow === index
        ? parseFloat(allowanceInputs.CA) ||
          parseFloat(rowData.commuteAllowance) ||
          0
        : parseFloat(rowData.commuteAllowance) || 0;
    const MA =
      editingRow === index
        ? parseFloat(allowanceInputs.MA) ||
          parseFloat(rowData.mobileAllowance) ||
          0
        : parseFloat(rowData.mobileAllowance) || 0;
    const IA =
      editingRow === index
        ? parseFloat(allowanceInputs.IA) ||
          parseFloat(rowData.internetAllowance) ||
          0
        : parseFloat(rowData.internetAllowance) || 0;
    const commission = parseFloat(fixedInput.commission) || 0;
    const tax = parseFloat(fixedInput.tax) || 0;
    const deduction = parseFloat(fixedInput.deduction) || 0;

    const salary = basicSal + CA + MA + IA;
    const netSalary = salary + commission;
    const netGrossSalary = netSalary - tax - deduction;

    return { netSalary, netGrossSalary, salary };
  };

  const handleApprove = async (index, payroll) => {
    const { netSalary, netGrossSalary } = calculateNetGrossSalary(
      payroll,
      index
    );
    const allowanceInputs = editableAllowances[index] || {};
    const fixedInput = fixedInputs[index] || {};

    const obj = {
      userId: payroll?.userId,
      basicSalary:
        editingRow === index
          ? parseFloat(allowanceInputs.basicSalary) ||
            parseFloat(payroll.basicSalary) ||
            0
          : parseFloat(payroll.basicSalary) || 0,
      ca:
        editingRow === index
          ? parseFloat(allowanceInputs.CA) ||
            parseFloat(payroll.commuteAllowance) ||
            0
          : parseFloat(payroll.commuteAllowance) || 0,
      ma:
        editingRow === index
          ? parseFloat(allowanceInputs.MA) ||
            parseFloat(payroll.mobileAllowance) ||
            0
          : parseFloat(payroll.mobileAllowance) || 0,
      ia:
        editingRow === index
          ? parseFloat(allowanceInputs.IA) ||
            parseFloat(payroll.internetAllowance) ||
            0
          : parseFloat(payroll.internetAllowance) || 0,
      commission: parseFloat(fixedInput.commission) || 0,
      tax: parseFloat(fixedInput.tax) || 0,
      deduction: parseFloat(fixedInput.deduction) || 0,
      month: payroll?.month,
    };
    console.log(obj);

    try {
      const response = await axiosInstance.post(`${apiUrl}/api/admin/payroll`, {
        userId: payroll?.userId,
        basicSalary:
          editingRow === index
            ? parseFloat(allowanceInputs.basicSalary) ||
              parseFloat(payroll.basicSalary) ||
              0
            : parseFloat(payroll.basicSalary) || 0,
        ca:
          editingRow === index
            ? parseFloat(allowanceInputs.CA) ||
              parseFloat(payroll.commuteAllowance) ||
              0
            : parseFloat(payroll.commuteAllowance) || 0,
        ma:
          editingRow === index
            ? parseFloat(allowanceInputs.MA) ||
              parseFloat(payroll.mobileAllowance) ||
              0
            : parseFloat(payroll.mobileAllowance) || 0,
        ia:
          editingRow === index
            ? parseFloat(allowanceInputs.IA) ||
              parseFloat(payroll.internetAllowance) ||
              0
            : parseFloat(payroll.internetAllowance) || 0,
        commission: parseFloat(fixedInput.commission) || 0,
        tax: parseFloat(fixedInput.tax) || 0,
        deduction: parseFloat(fixedInput.deduction) || 0,
        month: payroll?.month,
      });
      console.log(response);
      setPayrollList((prev) =>
        prev.filter((item) => item.userId !== payroll.userId)
      );
      setFixedInputs({})
      setEditableAllowances({})

      toast.success("Payroll updated successfully!");

      // Exit edit mode and clear editable allowances
      setEditingRow(null);
      setEditableAllowances((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    } catch (error) {
      console.error("Error updating payroll:", error);
      toast.error("Failed to update payroll.");
    }
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
                  Gross salary
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
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              "basicSalary",
                              "allowance"
                            )
                          }
                          value={editableAllowances[index]?.basicSalary || ""}
                          style={{ width: "100px" }}
                        />
                      ) : payroll?.basicSalary ? (
                        payroll.basicSalary
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
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) =>
                            handleInputChange(e, index, "CA", "allowance")
                          }
                          value={editableAllowances[index]?.CA || ""}
                          style={{ width: "100px" }}
                        />
                      ) : payroll?.commuteAllowance ? (
                        payroll.commuteAllowance
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
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) =>
                            handleInputChange(e, index, "MA", "allowance")
                          }
                          value={editableAllowances[index]?.MA || ""}
                          style={{ width: "100px" }}
                        />
                      ) : payroll?.mobileAllowance ? (
                        payroll.mobileAllowance
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
                      {editingRow === index ? (
                        <input
                          type="text"
                          className="input-payroll"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) =>
                            handleInputChange(e, index, "IA", "allowance")
                          }
                          value={editableAllowances[index]?.IA || ""}
                          style={{ width: "100px" }}
                        />
                      ) : payroll?.internetAllowance ? (
                        payroll.internetAllowance
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
                          handleInputChange(e, index, "commission", "fixed")
                        }
                        value={fixedInputs[index]?.commission || ""}
                        style={{ width: "100px" }}
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
                        onChange={(e) =>
                          handleInputChange(e, index, "tax", "fixed")
                        }
                        value={fixedInputs[index]?.tax || ""}
                        style={{ width: "100px" }}
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
                          handleInputChange(e, index, "deduction", "fixed")
                        }
                        value={fixedInputs[index]?.deduction || ""}
                        style={{ width: "100px" }}
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
                          {/* Save Button */}
                          <Tooltip title="Save Changes">
                            <Typography
                              sx={{
                                border: "2px solid #31BA96",
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
                              }}
                              onClick={(e) => {
                                handleApprove(index, payroll);
                                e.stopPropagation();
                              }}
                            >
                              <img
                                src={tickSinglePng}
                                alt="Save"
                                style={{
                                  width: "12.5px",
                                  height: "9.6px",
                                  cursor: "pointer",
                                }}
                              />
                            </Typography>
                          </Tooltip>

                          {/* Cancel Button */}
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
                                setEditableAllowances((prev) => {
                                  const updated = { ...prev };
                                  delete updated[index]; // Remove editable allowances for the current row
                                  return updated;
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
                          {/* Approve Button */}
                          <Tooltip title="Approve Request">
                            <Typography
                              onClick={(e) => {
                                handleApprove(index, payroll);
                                e.stopPropagation();
                              }}
                              sx={{
                                border: "2px solid #31BA96",
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
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
                              />
                            </Typography>
                          </Tooltip>

                          {/* Edit Button */}
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
                                // Prevent multiple rows from being edited simultaneously
                                if (
                                  editingRow !== null &&
                                  editingRow !== index
                                ) {
                                  toast.warn(
                                    "Please save or cancel the current edit before editing another row."
                                  );
                                  return;
                                }
                                setEditingRow(index); // Set the current row as being edited
                                setEditableAllowances((prev) => ({
                                  ...prev,
                                  [index]: {
                                    CA: payroll.commuteAllowance || "",
                                    MA: payroll.mobileAllowance || "",
                                    IA: payroll.internetAllowance || "",
                                    basicSalary: payroll.basicSalary || "",
                                  },
                                }));
                                e.stopPropagation(); // Prevent triggering other row events
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
