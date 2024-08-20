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
          onChange={onChange} // Ensure onChange is linked
          name={name}
          value={value} // Ensure value is linked
          sx={{
            '& ::placeholder': {
              fontSize: {
                lg: "20px",
                xs: "16px"
              },
              lineHeight: {
                lg: "30px",
                xs: "24px"
              },
              fontWeight: {
                lg: "600",
                xs: "500"
              },
              color: "#2a2b2d",
              fontFamily: "poppins"
            },
            borderRadius: "12px",
            height: "56px",
            '& .MuiOutlinedInput-root': {
              borderRadius: "12px",
              color: "white", // Ensures the text color in the input field is white
            },
            '& .MuiInputBase-input': {
              color: "white", // Ensures the text color in the input field is white
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Ensure background color of the autofill
                WebkitTextFillColor: 'white', // Text color of the autofill
                borderRadius: "12px",
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on hover
                WebkitTextFillColor: 'white',
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on focus
                WebkitTextFillColor: 'white',
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:active': {
                WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on active
                WebkitTextFillColor: 'white',
                border: "none", // Ensure no border is added
              },
            },
            fontSize: {
              lg: "20px",
              xs: "16px"
            },
            lineHeight: {
              lg: "30px",
              xs: "24px"
            },
            fontWeight: {
              lg: "500",
              xs: "400"
            },
            backgroundColor: "none"
          }}
          onKeyDown={handleKeyDown}
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
              color: "white"
            }}
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </IconButton>
        )}
      </FormControl>
      {error && (
        <Typography sx={{
          background: "white",
          p: "10px",
          color: "black",
          mt: "8px",
          wordBreak: "break-word",
          fontWeight: "500",
          borderRadius:"5px"
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default CustomTextField;
