import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import { useOutletContext } from 'react-router-dom';

const EditWFHRequest = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { setHeadertext } = useOutletContext();

    useEffect(() => {
        setHeadertext("Edit WFH Request");

        // Pseudo code for fetching data from the backend
        // Replace this with the actual API call
        const fetchWFHRequestData = async () => {
            // Example API call
            // const response = await fetch(`/api/wfh-request/${requestId}`);
            // const data = await response.json();

            // Assuming the data object has the structure { date: 1692902400000, description: "Work from home due to medical reasons." }

            // Pseudo-data for demonstration
            const data = {
                date: 1692902400000, // Example timestamp
                description: "Work from home due to medical reasons."
            };

            // Convert Unix timestamp to date string for the input
            const date = new Date(data.date).toISOString().split('T')[0];

            // Set form values using `setValue`
            setValue('date', date);
            setValue('description', data.description || '--');
        };

        fetchWFHRequestData();
    }, [setHeadertext, setValue]);

    const onSubmit = (data) => {
        // Convert date to Unix timestamp
        const dateTimestamp = new Date(data.date).getTime();

        const formData = {
            ...data,
            date: dateTimestamp,
        };

        console.log('Edited Form Data with Unix Timestamp:', formData);
        // Handle form submission logic here
    };

    return (
        <Box className="sheet-container-admin">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mb: 4 }}>
                    <Controller
                        name="date"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                            <Box sx={{ position: 'relative', flex: '1 1 100%' }}>
                                <CustomInputLabel
                                    type="date"
                                    label="Date"
                                    id="date"
                                    error={errors.date?.message}
                                    {...field}
                                    height="64px"
                                />
                               
                            </Box>
                        )}
                    />
                </Box>

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
                        Save Changes
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default EditWFHRequest;
