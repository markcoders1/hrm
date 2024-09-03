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
import IconButton from '@mui/material/IconButton';


const RemoteWork = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();

  useEffect(() => {
    setHeadertext("Remote Work");
    setParaText(" ")
  }, []);

  // Dummy data for the table
  const [leaveData] = useState([
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Sick",
      statusManager: "Approved",
      statusHOD: "Approved",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Casual",
      statusManager: "Pending",
      statusHOD: "Pending",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Annual",
      statusManager: "Rejected",
      statusHOD: "Rejected",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Casual",
      statusManager: "Approved",
      statusHOD: "Approved",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Sick",
      statusManager: "Approved",
      statusHOD: "Approved",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Casual",
      statusManager: "Pending",
      statusHOD: "Pending",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Sick",
      statusManager: "Approved",
      statusHOD: "Approved",
    },
    {
      id: "005",
      from: "08-20-2024",
      to: "08-20-2024",
      day: "2",
      type: "Annual",
      statusManager: "Rejected",
      statusHOD: "Rejected",
    },
  ]);

  const isActionDisabled = (statusManager, statusHOD) => {
    return statusManager !== "Pending" && statusHOD !== "Pending";
  };

  const handleEditClick = (event, leaveId) => {
    event.stopPropagation();
    navigate(`/dashboard/remote-work/edit-wfh-request`);
  };

  const handleDeleteClick = (event, leaveId) => {
    event.stopPropagation();
    console.log("Delete action for leave ID:", leaveId);
    // Add your delete logic here
  };

  return (
    <Box className="sheet-container-admin">
      <Box className="progress-mini-container">
        {/* Date filters and Request New Leave button */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 6 }}>
            <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
              <Typography
                sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
              >
                Start Date{" "}
              </Typography>
              <input
                type="date"
                name=""
                id=""
                style={{
                  border: "none",
                  borderBottom: "2px solid black",
                  width: "195px",
                  outline: "none",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
              <Typography
                sx={{ fontWeight: "500", fontSize: "22px", color: "#010120" }}
              >
                End Date{" "}
              </Typography>
              <input
                type="date"
                name=""
                id=""
                style={{
                  border: "none",
                  borderBottom: "2px solid black",
                  width: "195px",
                  outline: "none",
                }}
              />
            </Box>
          </Box>

          <Tooltip title="Request New WFH">
            <CustomButton
              ButtonText="Request For New WFH"
              fontSize="12px"
              color="white"
              fontWeight="500"
              fullWidth={false}
              variant="contained"
              padding="10px 0px"
              type="submit"
              background="#157AFF"
              hoverBg="#303f9f"
              hovercolor="white"
              width={"189px"}
              borderRadius="7px"
              onClick={() => navigate("/dashboard/remote-work/new-wfh-request")}
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
                  Date
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
                  onClick={() => navigate(`/dashboard/remote-work/wfh-detail`)}
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
                    {leave.id}
                  </TableCell>
                  
                  <TableCell
                    sx={{ textAlign: "start !important" }}
                    className="MuiTableCell-root"
                  >
                    {leave.to}
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
                    {leave.statusManager}
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
                    {leave.statusHOD}
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
                      <Tooltip title={isActionDisabled(leave.statusManager, leave.statusHOD) ? "could not edit": "Click to Edit"}>
                      <IconButton>
                      <Box
                        component="img"
                        src={
                          isActionDisabled(leave.statusManager, leave.statusHOD)
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
                          !isActionDisabled(leave.statusManager, leave.statusHOD) &&
                          handleEditClick(event, leave.id)
                        }
                      /> 
                       </IconButton>
                      </Tooltip>
                      <Tooltip title={isActionDisabled(leave.statusManager, leave.statusHOD) ? "could not Delete": "Click to Delete"}>
                      <IconButton>
                      <Box
                        component="img"
                        src={
                          isActionDisabled(leave.statusManager, leave.statusHOD)
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
                          !isActionDisabled(leave.statusManager, leave.statusHOD) &&
                          handleDeleteClick(event, leave.id)
                        }
                      />
                     </IconButton>
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

export default RemoteWork;
