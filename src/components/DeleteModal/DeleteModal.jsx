import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const DeleteModal = ({ open, handleClose, onConfirm, loading, type , description}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Confirm Deletion {type ? type : ""}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomButton
            ButtonText="Cancel"
            background="#157AFF"
            hoverBg="white"
            hovercolor="#157AFF"
            fontSize="16px"
            color="white"
            fontWeight="500"
            borderRadius="7px"
            onClick={handleClose}
            fullWidth={false}
          />
          <CustomButton
            ButtonText={loading ? "Deleting..." : "Confirm"}
            background="#D32F2F"
            hoverBg="white"
            hovercolor="#D32F2F"
            fontSize="16px"
            color="white"
            fontWeight="500"
            borderRadius="7px"
            onClick={onConfirm}
            loading={loading}
            fullWidth={false}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
