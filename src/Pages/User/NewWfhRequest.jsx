import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import { useOutletContext } from 'react-router-dom';

const NewWFHRequest = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { setHeadertext } = useOutletContext();

    useEffect(() => {
        setHeadertext("New WFH Request");
    }, [setHeadertext]);

    const onSubmit = (data) => {
        // Convert date to Unix timestamp
        const dateTimestamp = new Date(data.date).getTime();

        const formData = {
            ...data,
            date: dateTimestamp,
        };

        console.log('Form Data with Unix Timestamp:', formData);
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
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default NewWFHRequest;
