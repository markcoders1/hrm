import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import VirtualizedSelect from "../../components/VirtualizedSelect/VirtualizedSelect";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AddTaxSlab = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { setHeadertext, setParaText } = useOutletContext();
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        // Fetch countries and currencies from the Rest Countries API
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.cca2, // Country code
                    label: country.name.common, // Country name
                }));
                setCountries(countryOptions);

                // Extract unique currencies
                const currencyOptions = [];
                response.data.forEach(country => {
                    if (country.currencies) {
                        Object.keys(country.currencies).forEach(currencyCode => {
                            const currencyName = country.currencies[currencyCode].name;
                            if (!currencyOptions.some(currency => currency.value === currencyCode)) {
                                currencyOptions.push({
                                    value: currencyCode,
                                    label: `${currencyName} (${currencyCode})`,
                                });
                            }
                        });
                    }
                });
                setCurrencies(currencyOptions);
            })
            .catch((error) => console.error("Error fetching countries and currencies:", error));
    }, []);

    useEffect(() => {
        setHeadertext("Add Tax Slab");
        setParaText("");
    }, [setHeadertext]);

    const onSubmit = async (data) => {
        const dateTimestamp = new Date(data.date).getTime();

        const formData = {
            ...data,
            date: dateTimestamp,
        };

        console.log("Form Data with Unix Timestamp:", formData);

        try {
            const response = await axiosInstance({
                url: `${apiUrl}/api/wfh`,
                method: "post",
                data: {
                    date: formData.date,
                    comment: formData.description,
                },
            });

            console.log(response.data);
            toast.success(response.data.message, { position: "top-center" });
            reset();
            navigate(-1);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <Box>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    padding: "0px",
                    gap: "15px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: { md: "30px", xs: "15px" },
                        flexDirection: { md: "row", xs: "column" }
                    }}
                >


                    <Controller
                        name="currency"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Currency is required" }}
                        render={({ field }) => (
                            <VirtualizedSelect
                                label="Currency"
                                height={{ xl: "76px !important", md: "58px !important" }}
                                options={currencies}
                                value={field.value}
                                handleChange={field.onChange}
                                error={errors.currency?.message}
                            />
                        )}
                    />
                </Box>
                <Box   sx={{
                        display: "flex",
                        gap: { md: "30px", xs: "15px" },
                        flexDirection: { md: "row", xs: "column" }
                    }}>
                    <Controller
                        name="col1"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Over-Column 1 is required" }}
                        render={({ field }) => (
                            <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                                <CustomInputLabel
                                    label="Over - Column 1"
                                    id="col1"
                                    error={errors.col1?.message}
                                    {...field}
                                    height={{ xl: "64px", md: "45px" }}
                                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                                />
                            </Box>
                        )}
                    />

                    <Controller
                        name="notover"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Not Over is required" }}
                        render={({ field }) => (
                            <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                                <CustomInputLabel
                                    label="Not Over"
                                    id="notover"
                                    error={errors.notover?.message}
                                    {...field}
                                    height={{ xl: "64px", md: "45px" }}
                                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                                />
                            </Box>
                        )}
                    />
                </Box>
                <Box   sx={{
                        display: "flex",
                        gap: { md: "30px", xs: "15px" },
                        flexDirection: { md: "row", xs: "column" }
                    }}>
                    <Controller
                        name="taxCol1"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Tax on Column 1 is required" }}
                        render={({ field }) => (
                            <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                                <CustomInputLabel
                                    label="Over - Column 1"
                                    id="taxCol1"
                                    error={errors.taxCol1?.message}
                                    {...field}
                                    height={{ xl: "64px", md: "45px" }}
                                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                                />
                            </Box>
                        )}
                    />

                    <Controller
                        name="taxExcess"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Not Over is required" }}
                        render={({ field }) => (
                            <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                                <CustomInputLabel
                                    label="Tax on Excess (%)"
                                    id="taxExcess"
                                    error={errors.taxExcess?.message}
                                    {...field}
                                    height={{ xl: "64px", md: "45px" }}
                                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                                />
                            </Box>
                        )}
                    />
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
                    <Tooltip title="Request New WFH">
                        <CustomButton
                            ButtonText="Submit"
                            fontSize="16px"
                            color="white"
                            fontWeight="500"
                            fullWidth={false}
                            variant="contained"
                            padding="10px 0px"
                            type="submit"
                            background="#157AFF"
                            hoverBg="#303f9f"
                            hovercolor="white"
                            width={"159px"}
                            borderRadius="7px"
                        />
                    </Tooltip>
                </Box>
            </form>
        </Box>
    );
};

export default AddTaxSlab;
