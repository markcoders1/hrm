// FileUpload.js
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import picFrame from "../../assets/docImage.png";

const FileUpload = ({ label, name, formData, setFormData, labeStyling, BoxStyling }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
    setSelectedFileName(file?.name || "");
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  return (
    <Box
      sx={{
        flexBasis: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...BoxStyling,
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
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
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
  );
};

export default FileUpload;
