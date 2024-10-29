import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import picFrame from "../../assets/docImage.png";

const FileDisplay = ({ label, fileUrl, labelStyling, boxStyling }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLightbox = () => {
    if (fileUrl) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Box
        onClick={handleOpenLightbox}
        sx={{
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
          cursor: "pointer",
          gap: "1.6rem",
          ...boxStyling,
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "18px",
            color: "#010120",
            ...labelStyling,
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "181px",
            border: "2px dashed rgba(197, 197, 197, 0.6)",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFF",
          }}
        >
          {fileUrl ? (
            <img
              src={fileUrl}
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
                style={{ width: "31px", height: "auto", objectFit: "contain" }}
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
                Supports: JPG, JPEG2000, PNG, PDF
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src: fileUrl }]}
       
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: "10000000000000000000",
            },
          }}
        />
      )}
    </>
  );
};

export default FileDisplay;
