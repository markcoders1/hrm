import { Button } from '@mui/material';
import React from 'react';
import { LoaderW } from '../Loaders'; // Adjust the import path as needed
const CustomButton = ({
    border = "",
    borderRadius = "",
    buttonTextStyle = {},
    buttonStyle = {},
    ButtonText = "",
    fontSize = "",
    color = "",
    fontWeight = "",
    fullWidth = false,
    variant = "outlined",
    padding = "",
    onClick = () => {},
    background = "",
    hoverBg = "",
    hovercolor = "",
    type = "",
    width,
    loading = false,
    hoverBorder = "",
    height = "",
    extraText,
    loaderColor = ""
}) => {
    return (
        <Button
            variant={variant} 
            fullWidth={fullWidth}
            onClick={onClick}
            disabled={loading}
            type={type}
            
            sx={{
                border: border,
                borderRadius,
                padding,
                fontSize,
                color,
                background ,
                fontWeight,
                width,
                height,
                boxShadow:"none",
                textTransform: "none",  // Ensures the text is displayed as provided
                ...buttonStyle,
                '&:hover': {
                    background: hoverBg,
                    color: hovercolor,
                    border: hoverBorder
                }
            }}
            
        >
            {loading ? <LoaderW color={loaderColor ? loaderColor : "white"} /> : ButtonText}
            {extraText?<h4>{extraText}</h4>:null}
        </Button>
    );
}
export default CustomButton;
