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

import "../../../PagesCss/Employee.css";

import eyeIcon from "../../../assets/eye.png";
import deleteIcon from "../../../assets/deleteIcon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import editIconWhite from "../../../assets/editIconGroup.png";
import { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../../../auth/axiosInstance";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ModuleSetting = ({ moduleData }) => {

  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
      const [selectedId, setSelectedId] = useState(null);
  const queryClient = useQueryClient();


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
     const response = await axiosInstance({
      url: `${apiUrl}/api/admin/settings/modules`,
      method: "delete",
      data : {
        mod : id
      }

    })
    console.log(response)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["settingsData"]);
      setDeleteModalOpen(false);
      toast.success("Module Type Delete Succesfully")
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const openDeleteModal = (id) => {
    console.log(id);
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
        Modules Setting
      </Typography>
      <>
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
                    textAlign: "start !important",
                    borderRadius: "8px 0px 0px 8px",
                    color: "#010120",
                    minWidth: "80px",
                  }}
                >
                  &nbsp;&nbsp; Active Modules
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
                    textAlign: "center !important",
                    color: "#010120",
                    minWidth: "150px",
                  }}
                >
                  View Active List
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
                    textAlign: "center !important",
                    color: "#010120",
                    minWidth: "150px",
                  }}
                >
                  Edit Modules
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
                    textAlign: "center !important",
                    paddingLeft: "10px !important",
                    borderRadius: "0px 8px 8px 0px",
                    color: "#010120",
                  }}
                >
                  Delete Module
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="MuiTableBody-root">
              {moduleData?.map((data, index) => (
                <TableRow
                  key={data.employeeId}
                  className="MuiTableRow-root"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  sx={{
                    backgroundColor:
                      hoveredRow === index ? "#D1E4FF" : "inherit",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      textAlign: "start !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    &nbsp;&nbsp; {data}
                  </TableCell>

                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                    <img src={eyeIcon} alt="" />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                    <img src={editIconWhite} alt="" />
                  </TableCell>

                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "10px !important",
                      borderRadius: "0px 8px 8px 0px",
                    }}
                    className="MuiTableCell-root"
                  >
                    <Tooltip title={"Delete Module"}>
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
                        onClick={() => openDeleteModal(data)}
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
      </>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
        <Tooltip title="Request New WFH">
          <CustomButton
            ButtonText="+ Add New Module"
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
            width={"229px"}
            borderRadius="7px"
          />
        </Tooltip>
      </Box>
      <DeleteModal
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        onConfirm={handleDelete}
        description={"Are you sure you want to delete this Leave type."}
      />
    </Box>
  );
};

export default ModuleSetting;
