import React, { useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel'; // Adjust import path as necessary
import { useLocation, useOutletContext } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EditMyProfile = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { setHeadertext } = useOutletContext();
  const { id } = useParams();
  const { state } = useLocation();
  
  useEffect(() => {
    setHeadertext("Edit My Profile");
    console.log(state);
  }, [setHeadertext]);

  const onSubmit = async (data) => {
    console.log('Profile Data:', data);

    const formData = {
      phone: data.phoneNumber,
      emergencyNumber: data.emergencyNumber,
      address: data.address,
    };

    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/update-profile`,
        method: "post",
        data: formData,
      });
      console.log(response.data);
      toast.success(response.data.message.message);
      
    } catch (error) {
      console.log("Error updating profile", error);
      toast.success(error.response.data.message[0].message);
      console.log(error.response.data.message[0].message)
    }
  };

  return (
    <Box className="sheet-container-admin" sx={{ p: { sm: "0px 30px", xs: "0px" } }} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mb: 4, flexDirection: { md: "row", xs: "column" } }}>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue={state?.phone}
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
            name="emergencyNumber"
            control={control}
            defaultValue={state?.emergencyNumber}
            rules={{ required: "Emergency phone number is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 30%' }}>
                <CustomInputLabel
                  label="Emergency Phone Number"
                  id="emergencyPhoneNumber"
                  error={errors.emergencyNumber?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Controller
            name="address"
            control={control}
            defaultValue={state?.address}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <Box sx={{ flex: '1 1 100%' }}>
                <CustomInputLabel
                  label="Address"
                  id="address"
                  error={errors.address?.message}
                  multiline={true}
                  {...field}
                  height={{ md: "64px", xs: "120px" }}
                />
              </Box>
            )}
          />
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Update Profile">
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
              buttonStyle={{ mt: "-17px", height: "45px" }}
            />
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default EditMyProfile;
