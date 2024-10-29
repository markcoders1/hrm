import { Box, FormControl, TextField, Typography, IconButton } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../assets/searchIcon.png'

const CustomInputLabel = forwardRef(({
  type = "text",
  rows = 6,
  multiline = false,
  onChange,  // Ensure onChange is passed as a prop
  name = "",
  value,  // Ensure value is passed as a prop
  error = "",
  mb = "0px",
  placeholder = "",
  border = true,
  boxShadow = false,
  showPasswordToggle = false,
  showSearchIcon = false,
  maxLength,
  label = "",
  fullWidth = true, // Add fullWidth prop to control width
  height = "64px", // Default height
  bgcolor="",
  color= "#010120",
  fontSize = "18px",
  id= "",
  width = "",
  disabled= false,
  defaultValue= "",
  paddingInput="21px 10px",
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box sx={{ mb: mb, width: fullWidth ? '100%' : 'auto' }}>
      <FormControl variant="standard" fullWidth={fullWidth}
        sx={{
          border: border ?  "1px solid #E0E0E0" : "",
          '& fieldset': {
            display: "none",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "8px",
          mb: 2,
          width: '100%',
          position: "relative",
          padding: {md:"5px 15px", xs:"0px"},
          boxShadow: boxShadow ? "0px 8px 26px -4px rgba(0, 0, 0, 0.15)" : "",
          '&:hover': {
            borderColor: '#BDBDBD',
          },
          backgroundColor: bgcolor,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "14px",
            color: "#9E9E9E",
            position: 'absolute',
            top: '0px',
            left: '10px',
            backgroundColor: 'white !important',
            padding: '0 10px',
            transform: 'translateY(-50%)',
          }}
        >
          {label}
        </Typography>
        <TextField
          placeholder={placeholder}
          type={showPassword ? "text" : type}
          ref={ref}
          id={id}
          disabled={disabled}
          sx={{
            borderRadius: "8px",
            height: height,
            '& .MuiOutlinedInput-root': {
              borderRadius: "8px",
              border: "none",
              
            },
            '& .MuiInputBase-input': {
              padding: "5px 12px",
              fontSize: fontSize,
              color: color,
              height: "100%",
              
            },
            
            '& .MuiInputBase-input': {
              color:color, // Ensures the text color in the input field is white
              padding:paddingInput ? paddingInput :"7px 5px",
           
             
              
              '&:-webkit-autofill': {
                // WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Ensure background color of the autofill
                WebkitTextFillColor: 'black', // Text color of the autofill
                borderRadius: "12px",
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:hover': {
                // WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on hover
                WebkitTextFillColor: 'black',
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:focus': {
                // WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on focus
                WebkitTextFillColor: 'black',
                border: "none", // Ensure no border is added
              },
              '&:-webkit-autofill:active': {
                // WebkitBoxShadow: '0 0 0 1000px #010115 inset !important', // Background color on active
                WebkitTextFillColor: 'black',
                border: "none", // Ensure no border is added
              },
            },
          }}
          onChange={onChange} // Handle onChange
          name={name}
          value={value} // Handle value
          defaultValue={defaultValue}
          multiline={multiline}
          rows={rows}
          inputProps={{
            maxLength: maxLength
          }}
          fullWidth={fullWidth}
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
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </IconButton>
        )}

        { showSearchIcon && (
          <IconButton
          onClick={handleTogglePasswordVisibility}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <img src={SearchIcon} alt="" />
        </IconButton>
        )

        }
      </FormControl>
      {error && (
        <Typography sx={{
          background: "transparent",
          p: "10px",
          color: "red ",
          mt: "-15px",
          wordBreak: "break-word",
          fontWeight: "500",
          borderRadius:"4px",
          letterSpacing:".4px"
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default CustomInputLabel;
