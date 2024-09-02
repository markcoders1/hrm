import React, { useEffect } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel'; // Adjust import path as necessary
import { useOutletContext } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';

const EditMyProfile = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { setHeadertext } = useOutletContext(); // Assuming this is being used elsewhere in your application

  useEffect(() => {
    setHeadertext("Edit My Profile");
  }, [setHeadertext]);

  const onSubmit = (data) => {
    console.log('Profile Data:', data);
    // Handle profile update logic here
  };

  return (
    <Box className="sheet-container-admin" sx={{p:{sm:"0px 30px",xs:"0px"}}} >
   

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mb: 4, flexDirection:{md:"row", xs:"column"} }}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 30%' }}>
                <CustomInputLabel
                  type="password"
                  label="Password"
                  id="password"
                  error={errors.password?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 30%' }}>
                <CustomInputLabel
                  label="Phone Number"
                  id="phoneNumber"
                  error={errors.phoneNumber?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Controller
            name="emergencyPhoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Emergency phone number is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 30%' }}>
                <CustomInputLabel
                  label="Emergency Phone Number"
                  id="emergencyPhoneNumber"
                  error={errors.emergencyPhoneNumber?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 100%' }}>
                <CustomInputLabel
                  label="Address"
                  id="address"
                  error={errors.address?.message}
                  multiline={true}
                  {...field}
                  height={{md:"64px", xs:"120px" }}
                />
              </Box>
            )}
          />
        </Box>

        <Box sx={{ mt: 4, display:"flex", justifyContent:"end" }}>
        <Tooltip title="Edit Password">
            <CustomButton
              ButtonText="Update"
              fontSize="16px"
              color="white"
              fontWeight="500"
              fullWidth={false}
              variant="contained"
              padding="8px 0px"
              type="submit"
              background="#157AFF"
              hoverBg="#303f9f"
              hovercolor="white"
              width={"125px"}
              borderRadius="7px"
              buttonStyle={{ mt: "-17px", height:"45px" }}
             
              
            />{" "}
            </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default EditMyProfile;
