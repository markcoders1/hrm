import React, { useState, useEffect } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import CustomSelectForRole from '../../components/CustomSelect/CustomSelect';
import axiosInstance from '../../auth/axiosInstance';

import dateIcon from '../../assets/dateIcon.png';
import { useOutletContext } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const NewLeave = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [totalDays, setTotalDays] = useState(0);
  const { setHeadertext } = useOutletContext();
  const navigate = useNavigate();
  const [leaveDetails, setLeaveDetails] = useState([]);


  const fetchAllLeaves = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/allleaves`,
        method: "get",
      });
      console.log(response.data);
     
      setLeaveDetails(response.data)
    } catch (error) {
      console.log("error making leave request", error);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  useEffect(() => {
    setHeadertext("New Leave Request");
  }, []);

  // Watch the "fromDate" and "toDate" fields to trigger re-calculation of leave days
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  useEffect(() => {
    if (fromDate && toDate) {
      setTotalDays(calculateLeaveDays(new Date(fromDate), new Date(toDate)));
    }
  }, [fromDate, toDate]);

  // Function to calculate leave days excluding weekends
  const calculateLeaveDays = (startDate, endDate) => {
    let days = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Saturday and Sunday
        days++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const onSubmit =async (data) => {
    // Convert dates to Unix timestamps
    const fromDateTimestamp = new Date(data.fromDate).getTime();
    const toDateTimestamp = new Date(data.toDate).getTime();

    const formData = {
      leaveType: data.leaveType,
      startDate: fromDateTimestamp,
      endDate: toDateTimestamp,
      comment: data.comment
    };

    console.log('Form Data with Unix Timestamps:', formData);
    // Handle form submission logic here
try {
  const response = await axiosInstance({
    url: `${apiUrl}/api/leaves`,
    method: "post",
    data : formData
  });
  console.log(response)
  toast.success(response.data.message, { position: "top-center" })
  navigate(-1)

  
} catch (error) {
  console.log("error making leave request", error)
  
  toast.success(error.response.data.message[0].message)


}
  };

  return (
    <Box className="sheet-container-admin">
      <Box sx={{ display: 'flex', justifyContent: 'start',gap:"4rem",  mb: 4 }}>
        <Typography sx={{fontWeight:"600", fontSize:"24px", color:"#010120"}} >Total: {leaveDetails?.annualLeaves}</Typography>
        <Typography sx={{fontWeight:"600", fontSize:"24px", color:"#010120"}} >Availded: {leaveDetails?.leavesTaken}</Typography>
        <Typography sx={{fontWeight:"600", fontSize:"24px", color:"#010120"}} >Remaining:  {leaveDetails?.annualLeaves - leaveDetails?.leavesTaken? leaveDetails?.annualLeaves - leaveDetails?.leavesTaken : "--"}</Typography>

      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mb: 4 }}>
          <Controller
            name="fromDate"
            control={control}
            defaultValue=""
            rules={{ required: "From date is required" }}
            render={({ field }) => (
              <Box sx={{ position: 'relative', flex: '1 1 30%' }}>
                <CustomInputLabel
                  type="date"
                  label="From"
                  id="fromDate"
                  error={errors.fromDate?.message}
                  {...field}
                  height="64px"
                />
               
              </Box>
            )}
          />

          <Controller
            name="toDate"
            control={control}
            defaultValue=""
            rules={{ required: "To date is required" }}
            render={({ field }) => (
              <Box sx={{ position: 'relative', flex: '1 1 30%' }}>
                <CustomInputLabel
                  type="date"
                  label="To"
                  id="toDate"
                  error={errors.toDate?.message}
                  {...field}
                  height="64px"
                />
            
              </Box>
            )}
          />

          <Typography variant="body1" sx={{ flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:"30px", color:"#010120" }}>
            Total: {totalDays} Days
          </Typography>
        </Box>

        <Controller
          name="leaveType"
          control={control}
          defaultValue=""
          rules={{ required: "Leave type is required" }}
          render={({ field }) => (
            <CustomSelectForRole
              label="Type"
              options={[
                { value: 'sick', label: 'Sick' },
                { value: 'casual', label: 'Casual' },
                { value: 'annual', label: 'Annual' },
              ]}
              value={field.value}
              handleChange={field.onChange}
              error={errors.leaveType?.message}
              height="64px"
            />
          )}
        />

        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <CustomInputLabel
              label="Description"
              multiline
              rows={4}
              error={errors.comment?.message}
              {...field}
              height="200px"
            />
          )}
        />

<Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Update Profile">
            <CustomButton
              ButtonText="Submit"
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

export default NewLeave;
