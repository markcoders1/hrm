import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';import Heading from '../Heading/Heading';
import CustomTextField from '../CustomInputField/CustomInputField';
import CustomButton from '../CustomButton/CustomButton';
import { Typography } from '@mui/material';
import SnackAlert from '../SnackAlert/SnackAlert';
import axiosInstance from '../../auth/axiosInstance';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangePasswordModal = ({
    open = false,
    handleClose = () => {
    }
}) => {
    const [loading, setLoading] = React.useState(false);
    const [snackAlertData, setSnackAlertData]= React.useState({
        message:"",
        severity:"success",
        open:false,
    })
    const [data, setData] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""

    })

    const hanldeInput = (e) => {
        setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: "90%",
            md: "600px"
        },
        bgcolor: 'background.paper',
        boxShadow: 24,
        outline: "none",
        borderRadius: "20px",
        p: 4,
    };

const resetPassword = async()=>{
    setSnackAlertData({
        open:false,
        message:"",
        severity:"success",
    })

    if (!data?.oldPassword || !data?.newPassword || !data?.confirmPassword){
        return  setSnackAlertData({
            open:true,
            message:"All fields are required",
            severity:"error",
        })
        
    }
    if(data?.newPassword !== data?.confirmPassword){
       return setSnackAlertData({
            open:true,
            message:"New Password and Confirm password must be same.",
            severity:"error",
        })

    }
        try{

            setLoading(true);
            const response = await axiosInstance({
                url: `${apiUrl}/api/change-password`,
              method: "post",
              data: {
                oldPassword : data.oldPassword,
                newPassword : data.newPassword
              },
            });
            setLoading(false);
            console.log(response)
            if(response){
                console.log(response)
                setSnackAlertData({
                    open:true,
                    message:response?.data?.message,
                    severity:"success",
                })
                if (response?.code>200){
                    setSnackAlertData({
                        open:true,
                        message:response?.message,
                        severity:"error",
                    })
                }
            }
           

        }catch(error){
            setLoading(false);
            setSnackAlertData({
                open:true,
                message:error.toString(),
                severity:"error",
            })

        }

}

// console.log(appUrl)

    // setLoading(false)


    return (
        <>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            
            <Fade in={open}>
                <Box sx={style}>
                    <Heading Heading="Change Password" />
                    <Box sx={{
                        mt: "20px"
                    }}>
                        <Typography sx={{
                            my:"10px"
                        }}>
                            Old Password
                        </Typography>

                        <CustomTextField
                            handleKeyDown={() => { }}
                            onChange={hanldeInput}
                            name="oldPassword"
                            value={data?.oldPassword}
                            //   error={errors?.oldPassword}
                            placeholder="Old Password"
                            border=""
                            boxShadow={true}
                        />
                        <Typography sx={{
                            my:"10px"
                        }}>
                            New Password
                        </Typography>
                        <CustomTextField
                            handleKeyDown={() => { }}
                            onChange={hanldeInput}
                            name="newPassword"
                            value={data?.newPassword}
                            //   error={errors?.oldPassword}
                            placeholder="New Password"
                            border=""
                            boxShadow={true}
                        />
                        <Typography sx={{
                            my:"10px"
                        }}>
                            Confirm Password
                        </Typography>

                        <CustomTextField
                            handleKeyDown={() => { }}
                            onChange={hanldeInput}
                            name="confirmPassword"
                            value={data?.confirmPassword}
                            //   error={errors?.oldPassword}
                            placeholder="Confirm Password"
                            border=""
                            boxShadow={true}
                        />

                        <Box sx={{
                            display:"flex",
                            justifyContent:"center"
                        }}>
                <CustomButton
                loading = {loading}
                border="2px solid #1A0049"
                borderRadius="10px"
                background="#1A0049"
                hoverBg="white"
                hovercolor="#1A0049"
                buttonTextStyle={{}}
                buttonStyle={{
                  padding: {
                    // lg: "12px 20px",
                    xs:"20px 40px"

                  },
                }}
                ButtonText="Change Password"
                fontSize
                color={"white"}
                fontWeight
                fullWidth={false}
                variant="contained"
                padding
                onClick={resetPassword}
              />

                        </Box>

                    </Box>
                </Box>
            </Fade>
          
            
        </Modal>
        <SnackAlert
                message={snackAlertData.message}
                severity={snackAlertData.severity}
                open={snackAlertData.open}
                handleClose={()=>{setSnackAlertData(prev=>({...prev, open:false}))}}

            
            />
        </>

    )
}

export default ChangePasswordModal