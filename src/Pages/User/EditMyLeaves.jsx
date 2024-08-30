import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import CustomSelectForRole from '../../components/CustomSelect/CustomSelect';
import { useOutletContext, useParams } from 'react-router-dom';

const EditMyLeave = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [totalDays, setTotalDays] = useState(0);
  const { setHeadertext } = useOutletContext();
  const { leaveId } = useParams(); // Assuming leaveId is passed as a route parameter

  useEffect(() => {
    setHeadertext("Edit Leave");
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      // Placeholder for API request to fetch leave data
      // const response = await axios.get(`/api/leaves/${leaveId}`);
      const response = {
        data: {
          fromDate: 1730000000000, // Example Unix timestamp for "fromDate"
          toDate: 1730600000000, // Example Unix timestamp for "toDate"
          type: 'casual',
          description: 'Personal work',
          total: 12,
          availed: 4,
          remaining: 8,
        }
      };

      const leaveData = response.data;

      // Convert Unix timestamps to date strings for input fields
      setValue('fromDate', new Date(leaveData.fromDate).toISOString().substr(0, 10));
      setValue('toDate', new Date(leaveData.toDate).toISOString().substr(0, 10));
      setValue('type', leaveData.type || '--');
      setValue('description', leaveData.description || '--');

      // Set the total, availed, and remaining days based on the fetched data
      setTotalDays(calculateLeaveDays(new Date(leaveData.fromDate), new Date(leaveData.toDate)));

    } catch (error) {
      console.error('Failed to fetch leave data:', error);
    }
  };

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

  const onSubmit = (data) => {
    // Convert dates to Unix timestamps
    const fromDateTimestamp = new Date(data.fromDate).getTime();
    const toDateTimestamp = new Date(data.toDate).getTime();

    const formData = {
      ...data,
      fromDate: fromDateTimestamp,
      toDate: toDateTimestamp
    };

    console.log('Form Data with Unix Timestamps:', formData);
    // Placeholder for API request to update leave data
    // axios.put(`/api/leaves/${leaveId}`, formData)
    //   .then(response => {
    //     // Handle successful update
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  };

  return (
    <Box className="sheet-container-admin">
      <Box sx={{ display: 'flex', justifyContent: 'start', gap: "4rem", mb: 4 }}>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>Total: {12}</Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>Availed: {4}</Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "24px", color: "#010120" }}>Remaining: {8}</Typography>
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

          <Typography variant="body1" sx={{ flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "30px", color: "#010120" }}>
            Total: {totalDays} Days
          </Typography>
        </Box>

        <Controller
          name="type"
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
              error={errors.type?.message}
              height="64px"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <CustomInputLabel
              label="Description"
              multiline
              rows={4}
              error={errors.description?.message}
              {...field}
              height="200px"
            />
          )}
        />

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMyLeave;
