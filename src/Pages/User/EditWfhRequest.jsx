import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CustomInputLabel from '../../components/CustomInputField/CustomInputLabel';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import axiosInstance from '../../auth/axiosInstance';
import SnackAlert from "../../components/SnackAlert/SnackAlert"; // Assuming you have this component for toast messages
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EditWFHRequest = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { setHeadertext } = useOutletContext();
    const { id } = useParams(); // Use the WFH ID from the URL
    const navigate = useNavigate();
    const [snackAlertData, setSnackAlertData] = useState({
        message: "",
        severity: "success",
        open: false,
    });

    useEffect(() => {
        setHeadertext("Edit WFH Details");

        const getWFHRequestDetails = async () => {
            try {
                const response = await axiosInstance.get(`${apiUrl}/api/wfh`, { params: { WFHID: id } });
                const wfhData = response.data.wfh;

                // Convert Unix timestamp to date string for the input
                const date = new Date(wfhData.date).toISOString().split('T')[0];
                setValue('date', date);
                setValue('comment', wfhData.comment || '');

            } catch (error) {
                console.error('Error fetching WFH data:', error);
            }
        };

        getWFHRequestDetails();
    }, [id, setValue, setHeadertext]);

    const onSubmit = async (data) => {
        const dateTimestamp = new Date(data.date).getTime();

        const formData = {
            ...data,
            date: dateTimestamp, // Convert date to Unix timestamp
            WFHID: id
        };

        try {
            const response = await axiosInstance({
                url: `${apiUrl}/api/wfh`,
                method: 'put',
                data: formData,
            });

            console.log(response)
            toast.success(response.data.message)
        } catch (error) {
           
            console.error('Failed to update WFH request:', error);
            toast.error(error.response.data.message)

        }
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
                    <Tooltip title="Update WFH Request">
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

            <SnackAlert
                message={snackAlertData.message}
                severity={snackAlertData.severity}
                open={snackAlertData.open}
                handleClose={() => {
                    setSnackAlertData((prev) => ({ ...prev, open: false }));
                }}
            />
        </Box>
    );
};

export default EditWFHRequest;
