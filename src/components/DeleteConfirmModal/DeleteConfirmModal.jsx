import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import logoutImage from '../../assets/logout.webp'

const DeleteConfirmationModal = ({ open, handleClose, onConfirm, loading , requestText , requestHeading}) => {
  return (
        
    <Modal open={open} onClose={handleClose} sx={{  border:"none !important", outline:"none"}} >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "474px",
          maxHeight:"431px",
          height:"100%",
          bgcolor: "background.paper",
          borderRadius: "28px",
          boxShadow: 24,
          p: 4,
          py:6,
          border:"none !important",
          width:"100%",
         
         
          
        }}
      >
        <Box
        sx={{
          // border:"2px solid red",
          width:"120px", 
          height:"120px",
          borderRadius:"50%",
          m:"auto",
       
          boxShadow:"1px 1px 20px 1px inset #aaaaaa5c",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          

        }}
        >
          <img src={logoutImage} alt="" />
        </Box>

        <Typography variant="h6" component="h2" sx={{ mt:"20px",color:"#010120", textAlign:"center", fontWeight:"600",  fontSize:"26px"}}>
          {requestHeading}
        </Typography>
        <Typography variant="body1" sx={{ mt:"0px",color:"#99999C", textAlign:"center", fontWeight:"500",  fontSize:"22px",width:"320px", m:"auto", }}>
          {requestText}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap:"40px", mt:"30px" }}>
          <CustomButton
            ButtonText="Cancel"
            background="white"
            hoverBg="#157AFF"
            hovercolor="white"
            fontSize="16px"
            color="#010120"
            fontWeight="500"
            borderRadius="7px"
            onClick={handleClose}
            fullWidth={false}
            height="45px"
            width={"140px"}
            hoverBorder="1px solid #157AFF"
            border="1px solid #010120"
          />
          <CustomButton
            ButtonText={loading ? "Deleting..." : "Confirm"}
            background="#157AFF"
            hoverBg="white"
            hovercolor="#010120"
            fontSize="16px"
            color="white"
            fontWeight="500"
            borderRadius="7px"
            onClick={onConfirm}
            loading={loading}
            fullWidth={false}
            height="45px"
            width={"140px"}
            
            hoverBorder="1px solid #010120"
            border="1px solid #157AFF"

          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
