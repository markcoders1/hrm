import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const CustomSelectForRole = ({ 
  label, 
  options, 
  handleChange, 
  value, 
  error, 
  boxShadow = "0px 8px 26px -4px rgba(0, 0, 0, 0.1)", 
  width = "100%", 
  height, 
  border="1px solid #E0E0E0",
  focusBorder = true // New prop to control border behavior on focus
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    handleChange(selectedValue); // Call the parent's handler with the selected value
  };

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
          }
        }}
        variant="outlined"
      >
        <InputLabel
          sx={{
            position: 'absolute',
            top:  '',
            left: "10px",
            transform: 'translateY(-50%)',
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
          value={selectedValue}
          onChange={handleSelectionChange}
          sx={{
            width: "100%",
            fontSize: "16px",
            color: selectedValue ? "black" : "#424242",
            // backgroundColor: 'blue',
            height:height,
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
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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

export default CustomSelectForRole;
