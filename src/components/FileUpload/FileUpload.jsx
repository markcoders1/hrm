import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import picFrame from "../../assets/docImage.png";

const FileUpload = ({
  label,
  name,
  formData,
  setFormData,
  labeStyling,
  BoxStyling,
  existingFile, // Add this to handle prefilled file URL
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  // Handle file change
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
      setSelectedFileName(file.name);
      setPreviewImage(URL.createObjectURL(file)); // Preview the new file
    }
  };

  // Update the preview image when the component mounts or when existingFile changes
  useEffect(() => {
    if (existingFile && !previewImage) {
      // Use the existing file URL if no new file is selected
      setPreviewImage(existingFile);
      setSelectedFileName(existingFile.split("/").pop()); // Set the file name from the URL
    }
  }, [existingFile, previewImage]);

  return (
    <Box
      sx={{
        flexBasis: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        ...BoxStyling,
        gap: "1.6rem",
      }}
    >
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "18px",
          color: "#010120",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <label
          htmlFor={`upload-${name}`}
          style={{
            cursor: "pointer",
            color: "#FFA100",
            textAlign: "center",
            border: "2px dashed rgba(197, 197, 197, 0.6)",
            height: "181px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFF",
            borderRadius: "8px",
            flexDirection: "column",
            width: "100%",
            overflow: "hidden",
            ...labeStyling,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "165px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt={selectedFileName || label}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={picFrame}
                  alt="Placeholder"
                  style={{
                    width: "31px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { sm: "20px", xs: "16px" },
                    fontWeight: "600",
                    mt: "10px",
                    fontFamily: "Poppins",
                    color: "#010120",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: "10px", xs: "9px" },
                    fontWeight: "600",
                    mt: "10px",
                    fontFamily: "Poppins",
                    color: "#878787",
                  }}
                >
                  Supports: JPG, JPEG2000, PNG
                </Typography>
              </Box>
            )}
          </Box>
          <input
            type="file"
            id={`upload-${name}`}
            name={name}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </label>
      </Box>
    </Box>
  );
};

export default FileUpload;
