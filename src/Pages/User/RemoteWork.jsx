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
import axiosInstance from "../../auth/axiosInstance";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;



const RemoteWork = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [remoteWorkData  , setRemoteWorkData] =  useState([]);

  const fetchRemoteData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/wfh`,
        method: "get",
        
      });
      console.log("wfh requests",response.data)
      setRemoteWorkData(response.data.requests)
      
    } catch (error) {
      console.log("error fetching leaves request", error)
    }
  }

  useEffect(() => {
    setHeadertext("Remote Work");
    setParaText(" ")
    fetchRemoteData()
  }, []);


  const isActionDisabled = (statusManager, statusHOD) => {
    return statusManager !== "Pending" && statusHOD !== "Pending";
  };

  const handleEditClick = (event, remoteId) => {
    event.stopPropagation();
    navigate(`/dashboard/remote-work/edit-wfh-request`);
  };

  const handleDeleteClick = (event, remoteId) => {
    event.stopPropagation();
    console.log("Delete action for leave ID:", remoteId);
    // Add your delete logic here
  };


  const formatDate = (date) => {
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}-${d.getFullYear()}`;
  };

  return (
    <Box className="sheet-container-admin">
      <Box className="progress-mini-container">
        {/* Date filters and Request New Leave button */}
        <Box sx={{ display: "flex", justifyContent: "end" }}>
    

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
              {remoteWorkData.map((remote, index) => (
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
                    {remote?.companyId}
                  </TableCell>
                  
                  <TableCell
                    sx={{ textAlign: "start !important" }}
                    className="MuiTableCell-root"
                  >
                    {formatDate(remote?.date)}
                  </TableCell>
               
                
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color:
                      remote.statusManager === "Approved"
                          ? "green"
                          : remote.statusManager === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {remote.statusTL}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "start !important",
                      color:
                      remote.statusHOD === "Approved"
                          ? "green"
                          : remote.statusHOD === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {remote.statusHOD}
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
                      <Tooltip title={isActionDisabled(remote.statusManager, remote.statusHOD) ? "could not edit": "Click to Edit"}>
                      <IconButton>
                      <Box
                        component="img"
                        src={
                          isActionDisabled(remote.statusManager, remote.statusHOD)
                            ? disabledEdit
                            : editIcon
                        }
                        sx={{
                          cursor: isActionDisabled(
                            remote.statusManager,
                            remote.statusHOD
                          )
                            ? "not-allowed"
                            : "pointer",
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={(event) =>
                          !isActionDisabled(remote.statusManager, remote.statusHOD) &&
                          handleEditClick(event, remote.id)
                        }
                      /> 
                       </IconButton>
                      </Tooltip>
                      <Tooltip title={isActionDisabled(remote.statusManager, remote.statusHOD) ? "could not Delete": "Click to Delete"}>
                      <IconButton>
                      <Box
                        component="img"
                        src={
                          isActionDisabled(remote.statusTL, remote.statusHOD)
                            ? disabledDelete
                            : deleteIcon
                        }
                        sx={{
                          cursor: isActionDisabled(
                            remote.statusManager,
                            remote.statusHOD
                          )
                            ? "not-allowed"
                            : "pointer",
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={(event) =>
                          !isActionDisabled(remote.statusTL, remote.statusHOD) &&
                          handleDeleteClick(event, remote._id)
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
