import { Box, FormControl, TextField, Typography, IconButton } from "@mui/material";
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CustomTextField = forwardRef(({
  type = "text",
  rows = 4,
  multiline = false,
  handleKeyDown = () => { },
  onChange = () => { },
  name = "",
  value = "",
  error = "",
  mb = "0px",
  placeholder = "",
  border = true,
  boxShadow = false, // Add default value for boxShadow
  showPasswordToggle = false, // Add prop to control password visibility toggle
  maxLength // Add maxLength prop
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ mb: mb }}>
      <FormControl variant="standard" fullWidth
        sx={{
          border: border ? "1px solid #666666" : "",
          '& fieldset': {
            display: "none",
          },
          display: "flex",
          flexDirection: "column",
          padding: "0px 10px",
          justifyContent: "space-between",
          borderRadius: "10px",
          mb: 2,
          width: '100%',
          position: "relative",
          boxShadow: boxShadow ? "0px 8px 26px -4px rgba(0, 0, 0, 0.15)" : "", // Conditional boxShadow
        }}
      >
        <TextField
          placeholder={placeholder}
          type={showPassword ? "text" : type}
          ref={ref}
          m
          sx={{
            '& ::placeholder': {
              fontSize: {
                lg: "20px"
              },
              lineHeight: {
                lg: "30px"
              },
              fontWeight: {
                lg: "600"
              },
              color: "#2a2b2d",
              fontFamily: "poppins"
            },
            borderRadius: "12px",
            height: "56px",
            '& .MuiOutlinedInput-root': {
              borderRadius: "12px",
              border: "1px solid rgba(102, 102, 102, 0)",
            },
            fontSize: {
              lg: "20px"
            },
            lineHeight: {
              lg: "30px"
            },
            fontWeight: {
              lg: "500"
            },
            color: "black",
            backgroundColor: "none"
          }}
          onKeyDown={handleKeyDown}
          name={name}
          onChange={onChange}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
          multiline={multiline}
          rows={rows}
          inputProps={{
            maxLength: maxLength // Set the maxLength prop here
          }}
        />
        {showPasswordToggle && (
          <IconButton
            onClick={handleTogglePasswordVisibility}
            sx={{
              position: 'absolute',
              right: 25,
              top: '50%',
              transform: 'translateY(-50%)',
              
            }}
          >
            {showPassword ? <FontAwesomeIcon  icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </IconButton>
        )}
      </FormControl>
      {error && (
        <Typography sx={{
          background: "white",
          p: "10px",
          color: "#3d0168",
          mt: "8px",
          wordBreak: "break-word",
          fontWeight:"500"
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default CustomTextField;
