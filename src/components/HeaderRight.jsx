import { Box } from '@mui/material'
import React from 'react'
import CustomTextField from './CustomInput/CustomInput'
import { useLocation } from 'react-router-dom'
import CustomSelectForType from './CustomSelect/CustomSelect'

const HeaderRight = () => {
    const location = useLocation();
    if(location.pathname == "/dashboard/leave-management" || location.pathname ==  /dashboard/attendance-management/viewAttendance) {
        return (
    <Box>
        <CustomTextField
    
        />
    </Box>  

        )
    }
 
    if( location.pathname == /dashboard/wfh-management ||  location.pathname == /dashboard/leave-management) {
        return (
    <Box>
        <Typography>
        <CustomTextField
    
        />

        </Typography>
        <Typography>
            <CustomSelectForType
            
            />
        </Typography>
    </Box>  

        )
    }
}

export default HeaderRight