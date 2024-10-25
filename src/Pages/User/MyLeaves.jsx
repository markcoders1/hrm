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
import DeleteConfirmationModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SpinnerLoader from "../../components/SpinnerLoader";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const MyLeaves = () => {
  const navigate = useNavigate();
  const { setHeadertext } = useOutletContext();
  const [leaveData, setLeaveData] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Item to be deleted
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [leaveIdToDelete, SetLeaveIdToDelete] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHeadertext("My Leaves");
  }, []);

  const fetchAllLeaves = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        url: `${apiUrl}/api/allleaves`,
        method: "get",
      });
      console.log(response.data);
      setLeaveData(response.data.leaves);
      setLeaveDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error making leave request", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  // Function to determine if actions (edit/delete) should be enabled or disabled
  const isActionDisabled = (overallStatus) => {
    return overallStatus !== "pending";
  };

  const handleEditClick = (event, leaveId) => {
    event.stopPropagation();
    navigate(`/dashboard/my-leaves/edit-leave/${leaveId}`);
  };

  // const handleDeleteClick = (event, leaveId) => {
  //   event.stopPropagation();
  //   console.log("Delete action for leave ID:", leaveId);
  //   // Add your delete logic here
  // };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, "-");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // const deleteLeave = async (id) => {
  //   try {
  //     const response = await axiosInstance({
  //       url: `${apiUrl}/api/delete-leave`,
  //       method: "delete",
  //       params : {
  //         leaveID : id
  //       }
  //     });
  //     console.log(response.data);

  //   } catch (error) {
  //     console.log("error making Delete leave Request", error);
  //   }
  // }

  const handleDeleteClick = (event, leaveId) => {
    event.stopPropagation();
    console.log(leaveId);
    SetLeaveIdToDelete(leaveId);
    setItemToDelete(leaveId);
    setDeleteModalOpen(true); // Open the confirmation modal
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirmed = async () => {
    setLoadingDelete(true);
    console.log(leaveIdToDelete);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/leaves`,
        method: "delete",
        params: {
          leaveId: leaveIdToDelete,
        },
      });
      console.log("Delete response:", response.data);
      toast.success("Leave Deleted Sucessfully", { position: "top-center" });

      // Fetch the updated leave data
      fetchAllLeaves();

      // Close the modal and reset
      setLoadingDelete(false);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting leave:", error);
      setLoadingDelete(false);
      toast.success("Leave Delete Could Not be Proceed Now");
    }
  };

    if (loading) {
      return (
        <Box className="loaderContainer">
          <SpinnerLoader />
        </Box>
      );
    }

  return (
    <Box className="sheet-container-admin" sx={{
      padding:"0px 0px 40px 0px"
      }} >
      <Box
        sx={{
          display: "flex",
          justifyContent: { sm: "start", xs: "space-between" },
          gap: { sm: "4rem", xs: "0.2rem" },
          mb: 4,
          position: { lg: "fixed", xs: "static" },
          right: "60px",
          top: "40px",
          zIndex: "100000 ",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { sm: "24px", xs: "14px" },
            color: "#010120",
          }}
        >
          Total: {leaveDetails?.annualLeaves}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { sm: "24px", xs: "14px" },
            color: "#010120",
          }}
        >
          Availed: {leaveDetails?.leavesTaken}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { sm: "24px", xs: "14px" },
            color: "#010120",
          }}
        >
          Remaining:{" "}
          {leaveDetails?.annualLeaves - leaveDetails?.leavesTaken
            ? leaveDetails?.annualLeaves - leaveDetails?.leavesTaken
            : "--"}
        </Typography>
      </Box>
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
                    textAlign: "center",
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
                    padding: "12px 0px",
                    fontSize: {
                      sm: "21px",
                      xs: "16px",
                    },
                    textAlign: "center",
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
                    textAlign: "center",
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
                    textAlign: "center",
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
                    textAlign: "center",
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
                    textAlign: "center",
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
                    textAlign: "center",
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
                  onClick={() =>
                    navigate(
                      `/dashboard/my-leaves/my-leave-detail/${leave._id}`
                    )
                  }
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
                    {leave.companyId}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
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
                      textAlign: "center !important",
                      color: "#99999C !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    <span className="formatted-date">
                      {formatDate(leave.endDate)}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center !important" }}
                    className="MuiTableCell-root"
                  >
                    {leave.leaveCount}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center !important" }}
                    className="MuiTableCell-root"
                  >
                    {capitalizeFirstLetter(leave.leaveType)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color:
                        leave.statusTL === "approved"
                          ? "#31BA60 !important"
                          : leave.statusTL === "rejected"
                          ? "red !important"
                          : "black",
                    }}
                    className="MuiTableCell-root"
                  >
                    {capitalizeFirstLetter(leave.statusTL)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color:
                        leave.statusHOD === "approved"
                          ? "#31BA60 !important"
                          : leave.statusHOD === "rejected"
                          ? "red !important"
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
                          isActionDisabled(leave.overallStatus)
                            ? "Could not edit"
                            : "Click to Edit"
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
                            src={
                              isActionDisabled(leave.overallStatus)
                                ? disabledEdit
                                : editIcon
                            }
                            sx={{
                              cursor: isActionDisabled(leave.overallStatus)
                                ? "not-allowed"
                                : "pointer",
                            }}
                            onClick={(event) =>
                              !isActionDisabled(leave.overallStatus) &&
                              handleEditClick(event, leave._id)
                            }
                          />
                        </Typography>
                      </Tooltip>
                      <Tooltip
                        title={
                          isActionDisabled(leave.overallStatus)
                            ? "Could not Delete"
                            : "Click to Delete"
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
                          src={
                            isActionDisabled(leave.overallStatus)
                              ? disabledDelete
                              : deleteIcon
                          }
                          sx={{
                            cursor: isActionDisabled(leave.overallStatus)
                              ? "not-allowed"
                              : "pointer",
                            width: "25px",
                            height: "25px",
                          }}
                          onClick={(event) =>
                            !isActionDisabled(leave.overallStatus) &&
                            handleDeleteClick(event, leave._id)
                          }
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
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleModalClose}
        loading={loadingDelete}
        onConfirm={handleDeleteConfirmed}
        requestText={"Are you sure you want to Delete this Leave request"}
        requestHeading={"Leave Deletion"}
      />
    </Box>
  );
};

export default MyLeaves;
