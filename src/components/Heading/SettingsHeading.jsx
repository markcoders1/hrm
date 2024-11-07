import { Box, Typography } from '@mui/material'
import React from 'react'

const SettingsHeading = ({
  Heading = "",
  characterText = "",
  count = ""
}) => {
  return (
    <Box
    sx={{
      display:"flex",
      justifyContent:"space-between"
    }}
    >
      <Typography sx={{
        fontSize: "40px",
        fontWeight: "600",
        lineHeight: "33px",
        
      }}>
        {Heading}
      </Typography>
      <Typography sx={{
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "33px"
      }}>
        {characterText} &nbsp; {count}
      </Typography>
    </Box>

  )
}

export default SettingsHeading