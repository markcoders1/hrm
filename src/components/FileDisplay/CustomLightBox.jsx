import React, { useState } from "react";
import { Dialog, DialogContent, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomLightbox = ({ fileUrl, open, onClose }) => {
  const isImage = fileUrl && /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "500px",
            zIndex:"100000000000000000000000"
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          {isImage ? (
            <img
              src={fileUrl}
              alt="File Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <iframe
              src={fileUrl}
              title="PDF Preview"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLightbox;
