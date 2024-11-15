import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CustomButton from "../CustomButton/CustomButton"; // Assuming you have this custom component
import { toast } from "react-toastify";
import axiosInstance from "../../auth/axiosInstance";
import { updateProfileImage } from "../../Redux/userSlice"; // Redux action to update user profile image

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    md: "470px",
  },

  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "20px",
  p: 4,
};

const ChangeProfileImageModal = ({ open, handleClose }) => {
  const user = useSelector((state) => state.user); // Get user from Redux
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null); // For selected image
  const [imagePreview, setImagePreview] = useState(user.user.image); // Initial image preview from Redux

  const inputFileRef = useRef(null); // Create a ref for the hidden input element

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display preview of the selected image
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSaveImage = async () => {
    if (selectedImage) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", selectedImage);

      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/update-profile`,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data", // Important to send as multipart form data
          },
          data: formDataToSend, // Send the FormData containing the image
        });

        console.log(response.data);

        // Update Redux store with the new image URL
        dispatch(updateProfileImage(response.data.image)); // Assuming your API returns the updated image URL

        toast.success("Profile image updated successfully!");
        handleClose(); // Close the modal
      } catch (error) {
        console.error("Error updating profile", error);
        toast.error("Failed to update profile image");
      }
    }
  };

  const handleSelectImageClick = () => {
    inputFileRef.current.click(); // Programmatically open file input when button is clicked
  };

  return (
    <Modal
      aria-labelledby="profile-image-modal-title"
      aria-describedby="profile-image-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
        <Box sx={{ mt: 1, textAlign: "center", display:"flex", alignItems:"center", justifyContent:"center",  }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Profile Preview"
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
          </Box>
          <Typography  sx={{ textAlign: "center",mt:"24px", fontWeight:"600", fontSize:"26px", color:"#010120", fontFamily:"poppins" }}>
            Change Profile Image
          </Typography>
          <Typography  sx={{ textAlign: "center", fontWeight:"500", fontSize:"22px", color:"#99999C", fontFamily:"poppins",  }}>
            Are you sure you want to change Profile Picture
          </Typography>

      

          {/* Image Upload Button */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
            <CustomButton
              ButtonText={selectedImage ? "Change Image" : "Select Image"}
             
              background="#157AFF"
              hoverBg="white"
              hovercolor="#010120"
              fontSize="16px"
              color="white"
              fontWeight="500"
              borderRadius="7px"
              // onClick={onConfirm}
              // loading={loading}
              fullWidth={false}
              height="45px"
              width={"170px"}
              
              hoverBorder="1px solid #010120"
              border="1px solid #157AFF"
              onClick={handleSelectImageClick} // Trigger file input click
            />

            <input
              type="file"
              accept="image/*"
              ref={inputFileRef} // Hidden input element reference
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide the file input
            />

            {/* Save Button (Only if an image is selected) */}
            {selectedImage && (
              <CustomButton
              ButtonText={"Submit"}
            background="#157AFF"
            hoverBg="white"
            hovercolor="#010120"
            fontSize="16px"
            color="white"
            fontWeight="500"
            borderRadius="7px"
            // onClick={onConfirm}
            // loading={loading}
            fullWidth={false}
            height="45px"
            width={"140px"}
            
            hoverBorder="1px solid #010120"
            border="1px solid #157AFF"
                onClick={handleSaveImage}
              
              />
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangeProfileImageModal;
