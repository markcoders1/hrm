import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";
import "../../PagesCss/Employee.css"; // Adjust the import path as needed
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import editIcon from "../../assets/EditIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import disabledDelete from "../../assets/disabledDelete.png";
import disabledEdit from "../../assets/disabledEdit.png";
import axiosInstance from "../../auth/axiosInstance";
// import './MyLeaves.css'; // Assuming you have a CSS file for custom styles

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const MyLeaves = () => {
  const navigate = useNavigate();
  const { setHeadertext } = useOutletContext();
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    setHeadertext("My Leaves");
  }, []);

  const fetchAllLeaves = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/leaves`,
        method: "get",
      });
      console.log(response.data);
      setLeaveData(response.data.leaves);
    } catch (error) {
      console.log("error making leave request", error);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const isActionDisabled = (statusTL, statusHOD) => {
    return statusTL !== "Pending" && statusHOD !== "Pending";
  };

  const handleEditClick = (event, leaveId) => {
    event.stopPropagation();
    navigate(`/dashboard/my-leaves/edit-leave/${leaveId}`);
  };

  const handleDeleteClick = (event, leaveId) => {
    event.stopPropagation();
    console.log("Delete action for leave ID:", leaveId);
    // Add your delete logic here
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options).replace(/\//g, "-");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Box className="sheet-container-admin">
      <Box className="progress-mini-container">
        <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
          <Tooltip title="Request For New Leave">
            <CustomButton
              ButtonText="Request New Leave"
              fontSize="16px"
              color="white"
              fontWeight="500"
              fullWidth={false}
              variant="contained"
              padding="10px 0px"
              type="submit"
              background="#157AFF"
              hoverBg="#303f9f"
              hovercolor="white"
              width={"199px"}
              borderRadius="7px"
              height={"45px"}
              onClick={() => navigate("/dashboard/my-leaves/new-leave")}
            />
          </Tooltip>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} className="MuiTableContainer-root">
          <Table className="data-table">
            <TableHead className="MuiTableHead-root">
              <TableRow
                className="header-row"
                sx={{
                  backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                  "&:hover": {
                    backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                  },
                  padding: "0px",
                }}
              >
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    borderRadius: "8px 0px 0px 8px",
                    color: "#010120",
                    paddingLeft: "40px",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  From
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  To
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  Day
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  Status (Line Manager)
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "start",
                    color: "#010120",
                  }}
                >
                  Status (HOD)
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
                    borderRadius: "0px 8px 8px 0px",
                    color: "#010120",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="MuiTableBody-root">
              {leaveData.map((leave, index) => (
                <TableRow
                  key={index}
                  className="MuiTableRow-root"
                  onClick={() => navigate(`/dashboard/my-leaves/my-leave-detail`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    sx={{
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      textAlign: "start !important",
                      paddingLeft: "40px !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    {leave.companyId}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color: "#99999C !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    <span className="formatted-date">
                      {formatDate(leave.startDate)}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color: "#99999C !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    <span className="formatted-date" >
                      {formatDate(leave.endDate)}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "start !important" }}
                    className="MuiTableCell-root"
                  >
                    {leave.leaveCount}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "start !important" }}
                    className="MuiTableCell-root"
                  >
                    {capitalizeFirstLetter(leave.leaveType)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color:
                        leave.statusManager === "Approved"
                          ? "green"
                          : leave.statusManager === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {capitalizeFirstLetter(leave.statusTL)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color:
                        leave.statusHOD === "Approved"
                          ? "green"
                          : leave.statusHOD === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {capitalizeFirstLetter(leave.statusHOD)}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRadius: "0px 8px 8px 0px",
                      textAlign: "center",
                    }}
                    className="MuiTableCell-root"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Tooltip
                        title={
                          isActionDisabled(leave.statusManager, leave.statusHOD)
                            ? "Could not edit"
                            : "Click to Edit"
                        }
                      >
                        <Box
                          component="img"
                          src={
                            isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            )
                              ? disabledEdit
                              : editIcon
                          }
                          sx={{
                            cursor: isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            )
                              ? "not-allowed"
                              : "pointer",
                            width: "24px",
                            height: "24px",
                          }}
                          onClick={(event) =>
                            !isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            ) && handleEditClick(event, leave.id)
                          }
                        />
                      </Tooltip>
                      <Tooltip
                        title={
                          isActionDisabled(leave.statusManager, leave.statusHOD)
                            ? "Could not Delete"
                            : "Click to Delete"
                        }
                      >
                        <Box
                          component="img"
                          src={
                            isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            )
                              ? disabledDelete
                              : deleteIcon
                          }
                          sx={{
                            cursor: isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            )
                              ? "not-allowed"
                              : "pointer",
                            width: "24px",
                            height: "24px",
                          }}
                          onClick={(event) =>
                            !isActionDisabled(
                              leave.statusManager,
                              leave.statusHOD
                            ) && handleDeleteClick(event, leave.id)
                          }
                        />
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyLeaves;
