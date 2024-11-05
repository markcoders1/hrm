import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField
} from '@mui/material';
import { FixedSizeList as List } from 'react-window';

const VirtualizedSelect = ({
  label,
  options,
  handleChange,
  value,
  error,
  boxShadow = "0px 8px 26px -4px rgba(0, 0, 0, 0.1)",
  width = "100%",
  height,
  border = "1px solid #E0E0E0",
  focusBorder = true
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useState(false); // Manage the open state

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    // Filter options based on search query
    setFilteredOptions(
      options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

  const handleSelectionChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    handleChange(selectedValue);
    setOpen(false); // Close the dropdown after selection
    setSearchQuery(""); // Reset search query after selection
  };

  const Row = ({ index, style }) => {
    const option = filteredOptions[index];
    return (
      <MenuItem
        key={option.value}
        value={option.value}
        onClick={() => handleSelectionChange(option.value)} // Directly pass the value
        style={style}
      >
        {option.label}
      </MenuItem>
    );
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
            boxShadow: boxShadow,
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
            top: '0%',
            left: "10px",
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            padding: '0px 10px',
            fontSize: "14px",
            color: "#9E9E9E",
            pointerEvents: 'none', // Prevents label from capturing pointer events
          }}
          id={`select-${label}-label`}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`select-${label}-label`}
          id={`select-${label}`}
          value={selectedValue}
          onChange={(e) => handleSelectionChange(e.target.value)}
          displayEmpty
          open={open} // Bind the open state
          onOpen={() => setOpen(true)} // Handle opening
          onClose={() => setOpen(false)} // Handle closing
          sx={{
            width: "100%",
            fontSize: "16px",
            color: selectedValue ? "black" : "#424242",
            height: height,
            "& .MuiSelect-select": {
              padding: "10px 25px",
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
            // Prevent autoFocus on the first item to avoid jumpy behavior
            autoFocus: false,
          }}
          renderValue={(selected) => {
            return selected
              ? options.find(option => option.value === selected)?.label
              : "Select";
          }}
        >
          {/* Search Field */}
          <Box sx={{ px: 2, py: 1 }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()} // Prevent dropdown from closing on mouse down
              onClick={(e) => e.stopPropagation()}     // Prevent dropdown from closing on click
              onKeyDown={(e) => e.stopPropagation()}  // Prevent dropdown from closing on key down
            />
          </Box>

          {/* Virtualized List of Options */}
          {filteredOptions.length > 0 ? (
            <List
              height={200}
              itemCount={filteredOptions.length}
              itemSize={40}
              width="100%"
            >
              {Row}
            </List>
          ) : (
            <MenuItem disabled>No options</MenuItem>
          )}
        </Select>
      </FormControl>
      {error && (
        <Typography
          sx={{
            p: "10px",
            color: "#F44336",
            mt: "8px",
            wordBreak: "break-word",
            fontWeight: "500"
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default VirtualizedSelect;
