import React, { useState } from "react";
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
import eyeIcon from "../../../assets/eye.png";
import deleteIcon from "../../../assets/deleteIcon.png";

import editIconWhite from "../../../assets/editIconGroup.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import axiosInstance from "../../../auth/axiosInstance";
import { toast } from "react-toastify";
import CustomButton from "../../../components/CustomButton/CustomButton";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const LocationTypeSetting = ({ locationSettings }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
     const response = await axiosInstance({
      url: `${apiUrl}/api/admin/settings/dropdown/${id}`,
      method: "delete",

    })
    console.log(response)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["settingsData"]);
      setDeleteModalOpen(false);
      toast.success("Location Type Delete Succesfully")
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteMutation.mutate(selectedId);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "30px",
          color: "#010120",
          mt: "35px",
        }}
      >
        Location Type Setting
      </Typography>

      <TableContainer component={Paper} className="MuiTableContainer-root">
        <Table className="data-table">
          <TableHead className="MuiTableHead-root">
            <TableRow
              className="header-row"
              sx={{
                backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                padding: "0px",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: { sm: "21px", xs: "16px" },
                  textAlign: "start",
                  borderRadius: "8px 0px 0px 8px",
                  color: "#010120",
                  minWidth: "80px",
                }}
              >
                &nbsp;&nbsp; Location Setting
              </TableCell>
           
              <TableCell
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: { sm: "21px", xs: "16px" },
                  textAlign: "center",
                  color: "#010120",
                  minWidth: "150px",
                }}
              >
                Edit Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "500",
                  padding: "12px 0px",
                  fontSize: { sm: "21px", xs: "16px" },
                  textAlign: "center",
                  paddingLeft: "10px",
                  borderRadius: "0px 8px 8px 0px",
                  color: "#010120",
                }}
              >
                Delete Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {locationSettings?.location?.map((data, index) => (
              <TableRow
                key={data._id}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                sx={{
                  backgroundColor: hoveredRow === index ? "#D1E4FF" : "inherit",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <TableCell
                  sx={{
                    borderRadius: "8px 0px 0px 8px",
                    color: "#010120",
                    textAlign: "start",
                  }}
                >
                  &nbsp;&nbsp; {data?.value}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#010120",
                  }}
                >
                  <Tooltip title={"Edit Location"}>
                    <Typography
                      sx={{
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        m: "auto",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                      onClick={() => navigate("edit-location-type", {state: data})}
                    >
                      <img src={editIconWhite} alt="" />
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    paddingLeft: "10px",
                    borderRadius: "0px 8px 8px 0px",
                  }}
                >
                  <Tooltip title={"Delete Location Type"}>
                    <Typography
                      sx={{
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        m: "auto",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                      onClick={() => openDeleteModal(data._id)}
                    >
                      <img src={deleteIcon} alt="" />
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Request New WFH">
            <CustomButton 

              ButtonText="+ Add New Type"
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
              width={"180px"}
              borderRadius="7px"
              onClick={()=> navigate("add-location-type")}
            />
          </Tooltip>
        </Box>

      <DeleteModal
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        onConfirm={handleDelete}
        description={"Are you sure you want to delete this Location type."}
      />
    </Box>
  );
};

export default LocationTypeSetting;
