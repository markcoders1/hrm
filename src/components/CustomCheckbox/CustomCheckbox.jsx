import React from 'react';
import { Box } from '@mui/material';

const CustomCheckbox = ({ label, selected, onChange }) => {
  
  return (
    <Box
      onClick={() => onChange(label)}
      sx={{
        width: '41px',
        height: '41px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: selected ? '#157AFF' : '#fff',
        color: selected ? '#fff' : '#878787',
        border: selected ? '1px solid #DCDCDC' : '1px solid #DCDCDC',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        fontWeight:"500"
      }}
    >
      {label[0]}
    </Box>
  );
};

export default CustomCheckbox;
