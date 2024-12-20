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
  IconButton,
} from "@mui/material";
import "../../PagesCss/Employee.css"; // Adjust the import path as needed
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import editIcon from "../../assets/EditIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import disabledDelete from "../../assets/disabledDelete.png";
import disabledEdit from "../../assets/disabledEdit.png";
import axiosInstance from "../../auth/axiosInstance";
import DeleteConfirmationModal from "../../components/DeleteConfirmModal/DeleteConfirmModal"; // Import the modal component
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RemoteWork = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [remoteWorkData, setRemoteWorkData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Modal state
  const [itemToDelete, setItemToDelete] = useState(null); // Item to delete
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for delete
  const [id , setId] = useState()

  useEffect(() => {
    setHeadertext("Remote Work");
    setParaText(" ");
    fetchRemoteData();
  }, []);

  const fetchRemoteData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/allwfh`,
        method: "get",
      });
      console.log("wfh requests", response.data);
      setRemoteWorkData(response.data.requests);
    } catch (error) {
      console.log("error fetching WFH requests", error);
    }
  };

  // Function to determine if actions (edit/delete) should be enabled or disabled
  const isActionDisabled = (overallStatus) => {
    return overallStatus !== "pending"}

  const handleEditClick = (event, remoteId) => {
    event.stopPropagation();
    navigate(`/dashboard/remote-work/edit-wfh-request/${remoteId}`);
  };

  // Delete click handler that opens the delete confirmation modal
  const handleDeleteClick = (event, WHFID) => {
    event.stopPropagation();
    console.log(WHFID)
    setId(WHFID)
    setItemToDelete(WHFID);
    setDeleteModalOpen(true); // Open the confirmation modal
  };

  // Function to handle confirmed delete
  const handleDeleteConfirmed = async () => {
    setLoadingDelete(true);
    
    try {
      
      const response = await axiosInstance({
        url: `${apiUrl}/api/wfh`,
        method: "delete",
        params: {
          WFHID: id, // Assuming the API requires a wfhID as a parameter
        },
      });
      console.log("Delete response:", response.data);
      toast.success("WFH Request Deleted Sucessfully",  {position : "top-center"})

      // Fetch updated data
      fetchRemoteData();

      // Close modal and reset
      setLoadingDelete(false);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting WFH request:", error);
      toast.success("WFH Request Could not be delete now", {position : "top-center"})
      setLoadingDelete(false);
    }
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };

  return (
    <Box className="sheet-container-admin" sx={{
      padding:"0px 0px 40px 0px"
      }}   >
      <Box className="progress-mini-container">
        {/* Date filters and Request New Leave button */}
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Tooltip title="Request New WFH">
            <CustomButton
              ButtonText="Request For New WFH"
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
              width={"219px"}
              borderRadius="7px"
              height={"45px"}
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
                    // padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center !important",

                    borderRadius: "8px 0px 0px 8px",
                    color: "#010120",
                    
                  }}
                >
                  #
                </TableCell>

                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    // padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },                  
                        textAlign: "center !important",

                    color: "#010120",
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    // padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center !important",

                    color: "#010120",
                  }}
                >
                  Status (Line Manager)
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    // padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center !important",

                    color: "#010120",
                  }}
                >
                  Status (HOD)
                </TableCell>
                <TableCell
                  className="MuiTableCell-root-head"
                  sx={{
                    fontWeight: "500",
                    // padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center !important",

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
                  onClick={() => navigate(`/dashboard/remote-work/wfh-detail/${remote._id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    sx={{
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      textAlign: "center !important",
                    }}
                    className="MuiTableCell-root"
                  >
                {remote?.companyId}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center !important" }} className="MuiTableCell-root">
                 {formatDate(remote?.date)}
                  </TableCell>

                  <TableCell
                    sx={{
                      textAlign: "center !important",

                      color:
                        remote.statusManager === "Approved"
                          ? "green"
                          : remote.statusManager === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {remote?.statusTL}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",

                      color:
                        remote.statusHOD === "Approved"
                          ? "green"
                          : remote.statusHOD === "Rejected"
                          ? "red"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {remote?.statusHOD}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRadius: "0px 8px 8px 0px",
                      textAlign: "center !important",

                    }}
                    className="MuiTableCell-root"
                  >
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}> 
                      <Tooltip
                        title={isActionDisabled(remote.overallStatus) ? "Could not edit" : "Click to Edit"}
                        onClick={(event) =>
                          !isActionDisabled(remote.overallStatus) &&
                          handleEditClick(event, remote._id)
                        }
                      >
                       <Typography
                          sx={{
                            width: "45px",
                            height: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",

                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={isActionDisabled(remote.overallStatus) ? disabledEdit : editIcon}
                            sx={{
                              cursor: isActionDisabled(remote.overallStatus)
                                ? "not-allowed"
                                : "pointer",
                              width: "24px",
                              height: "24px",
                            }}
                          
                          />
                          </Typography>
                      
                      </Tooltip>
                      <Tooltip
                        title={isActionDisabled(remote.overallStatus) ? "Could not Delete" : "Click to Delete"}
                        onClick={(event) =>
                          !isActionDisabled(remote.overallStatus) &&
                          handleDeleteClick(event, remote._id)
                          
                        }
                      >
                       <Typography
                          sx={{
                            width: "45px",
                            height: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",

                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={isActionDisabled(remote.overallStatus) ? disabledDelete : deleteIcon}
                            sx={{
                              cursor: isActionDisabled(remote.overallStatus)
                                ? "not-allowed"
                                : "pointer",
                              width: "24px",
                              height: "24px",
                            }}
                          
                          />
                       </Typography>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleModalClose}
        loading={loadingDelete}
        onConfirm={handleDeleteConfirmed} // Handle confirmed delete
        requestHeading = {"WFH Deletion"}
        requestText={"Are you sure you want to Delete this WFH request"}
      />
    </Box>
  );
};

export default RemoteWork;
