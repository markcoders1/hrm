import React, { useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const CustomSelectForType = ({ 
  label, 
  options, 
  handleChange, 
  value = "", // Fallback value to avoid undefined issues
  error, 
  boxShadow = "0px 8px 26px -4px rgba(0, 0, 0, 0.1)", 
  width = "100%", 
  height, 
  border = "1px solid #E0E0E0", 
  focusBorder = true ,
  
}) => {
  
  useEffect(() => {
    // Sync selected value with parent whenever `value` changes
    if (!value) {
      handleChange(""); // Ensure the value is passed correctly to parent
    }
  }, [value, handleChange]);

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "8px",
          width: width,
          height: height,
          position: "relative",
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            border: border,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: focusBorder ? "black" : "transparent",
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: focusBorder ? "black" : "transparent",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: focusBorder ? "black" : "transparent",
          },
   
        }}
        variant="outlined"
      >
        <InputLabel
          sx={{
            position: value ? 'absolute' : 'absolute',
            top: value ? '-10px' : '50%',
            left: "10px",
            transform: value ? 'translateY(0%)' : 'translateY(-50%)',
            backgroundColor: 'white',
            padding: '0px 10px',
            fontSize: "14px",
            color: "#9E9E9E",
          }}
          id={`select-${label}-label`}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`select-${label}-label`}
          id={`select-${label}`}
          value={value} // Directly use the value from props
          onChange={(e) => handleChange(e)} // Pass the full event to the handler
          sx={{
            width: "100%",
            fontSize: "16px",
            height: height,
            color: value ? "black" : "#424242",
            "& .MuiSelect-select": {
              padding: "10px 12px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "& .MuiSvgIcon-root": {
              color: "#424242",
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "white",
                "& .MuiMenuItem-root": {
                  fontSize: "16px",
                  color: "#424242",
                  "&.Mui-selected": {
                    backgroundColor: "#E0E0E0",
                    color: "black",
                  },
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  },
                },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography sx={{
          p: "10px",
          color: "#F44336",
          mt: "8px",
          wordBreak: "break-word",
          fontWeight: "500"
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomSelectForType;
