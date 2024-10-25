import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import CustomSelectForRole from '../../components/CustomSelect/CustomSelect';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import axiosInstance from '../../auth/axiosInstance';

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EditMyLeave = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [totalDays, setTotalDays] = useState(0);
  const [leaveData, setLeaveData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setHeadertext } = useOutletContext();
  const [snackAlertData, setSnackAlertData] = useState({
    message: "",
    severity: "success",
    open: false,
  });

  useEffect(() => {
    setHeadertext("Edit Leave");
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/leaves`,
        method: "get",
        params: { leaveID: id },
      });

      const leaveData = response.data.leave;

      setLeaveData(leaveData);

      // Convert Unix timestamps to date strings
      const startDate = new Date(leaveData.startDate).toISOString().substr(0, 10);
      const endDate = new Date(leaveData.endDate).toISOString().substr(0, 10);

      setValue('startDate', startDate);
      setValue('endDate', endDate);
      setValue('leaveType', leaveData?.leaveType);
      setValue('comment', leaveData?.comment || '');

      // Calculate total days based on fetched dates
      setTotalDays(calculateLeaveDays(new Date(startDate), new Date(endDate)));
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };

  const fromDate = watch('startDate');
  const toDate = watch('endDate');

  useEffect(() => {
    if (fromDate && toDate) {
      setTotalDays(calculateLeaveDays(new Date(fromDate), new Date(toDate)));
    }
  }, [fromDate, toDate]);

  const calculateLeaveDays = (startDate, endDate) => {
    let days = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
        days++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const onSubmit = async (data) => {
    const fromDateTimestamp = new Date(data.startDate).getTime();
    const toDateTimestamp = new Date(data.endDate).getTime();

    console.log(data)
    const formData = {
      ...data,
      startDate: fromDateTimestamp,
      endDate: toDateTimestamp,
      leaveID : id
    };
    console.log(formData.startDate)
    console.log(formData.endDate)
    console.log(formData)
    console.log(id)



    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/leaves`,
        
        method: 'put',
        data: formData,
      });

     toast.success("Leave Request Edited")
    } catch (error) {
      toast.error("Leave Request Edited")

      console.error('Failed to update leave:', error);
      toast.error("Leave Request Could Not Be Edited")

    }
  };

  return (
    <Box className="sheet-container-admin" sx={{p:"0px"}} >
      <Box sx={{ display: 'flex', justifyContent: 'start', gap: "4rem", mb: 4 }}>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>
          Total: {leaveData?.annualLeaves || "--"}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>
          Availed: {leaveData?.leavesTaken || "--"}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>
          Remaining: {leaveData?.annualLeaves - leaveData?.leavesTaken || "--"}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} style={{padding:"0px"}} >
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mb: 4 }}>
          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            rules={{ required: "From date is required" }}
            render={({ field }) => (
              <Box sx={{ position: 'relative', flex: '1 1 30%' }}>
                <CustomInputLabel
                  type="date"
                  label="From"
                  id="startDate"
                  error={errors.startDate?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Controller
            name="endDate"
            control={control}
            defaultValue=""
            rules={{ required: "To date is required" }}
            render={({ field }) => (
              <Box sx={{ position: 'relative', flex: '1 1 30%' }}>
                <CustomInputLabel
                  type="date"
                  label="To"
                  id="endDate"
                  error={errors.endDate?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />

          <Typography variant="body1" sx={{ flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "30px", color: "#010120" }}>
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

      {/* <SnackAlert
        message={snackAlertData.message}
        severity={snackAlertData.severity}
        open={snackAlertData.open}
        handleClose={() => {
          setSnackAlertData((prev) => ({ ...prev, open: false }));
        }}
      /> */}
    </Box>
  );
};

export default EditMyLeave;
