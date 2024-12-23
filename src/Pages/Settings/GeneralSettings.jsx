import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SettingsHeading from "../../components/Heading/SettingsHeading";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import SpinnerLoader from "../../components/SpinnerLoader";

import VirtualizedSelect from "../../components/VirtualizedSelect/VirtualizedSelect";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GeneralSettings = () => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      logo: null,
      phone: "",
      website: "",
      about: "",
      primaryCurrency: "",
      secondaryCurrency: "",
      timezone: "",
      weekStart: "",
      weekEnd: "",
      dayStart: "",
      workTimeStart: "",
      workTimeEnd: "",
    },
  });

  useEffect(() => {
    fetchCompanyData();
    fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/settings/general`
      );
      const data = response.data.data;

      reset({
        name: data?.name || "",
        address: data?.address || "",
        logo: null, // File inputs cannot be set programmatically
        phone: data?.phone || "",
        website: data?.website || "",
        about: data?.about || "",
        primaryCurrency: data?.primaryCurrency || "",
        secondaryCurrency: data?.secondaryCurrency || "",
        timezone: data?.timezone || "",
        weekStart: data?.weekStart || "",
        weekEnd: data?.weekEnd || "",
        dayStart: data?.dayStart || "",
        workTimeStart: data?.workTimeStart || "",

      });
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await axiosInstance.get(
        "https://restcountries.com/v3.1/all"
      );

      const currencyOptions = [];
      response.data.forEach((country) => {
        if (country.currencies) {
          Object.keys(country.currencies).forEach((currencyCode) => {
            const currencyName = country.currencies[currencyCode].name;
            if (
              !currencyOptions.some(
                (currency) => currency.value === currencyCode
              )
            ) {
              currencyOptions.push({
                value: currencyCode,
                label: `${currencyName} (${currencyCode})`,
              });
            }
          });
        }
      });
      setCurrencies(currencyOptions);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      toast.error("Failed to fetch currencies.");
    }
  };

  const timeZones = [
    { label: "UTC-12:00", value: -720 },
    { label: "UTC-11:00", value: -660 },
    { label: "UTC-10:00", value: -600 },
    { label: "UTC-09:30", value: -570 },
    { label: "UTC-09:00", value: -540 },
    { label: "UTC-08:00", value: -480 },
    { label: "UTC-07:00", value: -420 },
    { label: "UTC-06:00", value: -360 },
    { label: "UTC-05:00", value: -300 },
    { label: "UTC-04:00", value: -240 },
    { label: "UTC-03:30", value: -210 },
    { label: "UTC-03:00", value: -180 },
    { label: "UTC-02:00", value: -120 },
    { label: "UTC-01:00", value: -60 },
    { label: "UTC+00:00", value: 0 },
    { label: "UTC+01:00", value: 60 },
    { label: "UTC+02:00", value: 120 },
    { label: "UTC+03:00", value: 180 },
    { label: "UTC+03:30", value: 210 },
    { label: "UTC+04:00", value: 240 },
    { label: "UTC+04:30", value: 270 },
    { label: "UTC+05:00", value: 300 },
    { label: "UTC+05:30", value: 330 },
    { label: "UTC+05:45", value: 345 },
    { label: "UTC+06:00", value: 360 },
    { label: "UTC+06:30", value: 390 },
    { label: "UTC+07:00", value: 420 },
    { label: "UTC+08:00", value: 480 },
    { label: "UTC+08:45", value: 525 },
    { label: "UTC+09:00", value: 540 },
    { label: "UTC+09:30", value: 570 },
    { label: "UTC+10:00", value: 600 },
    { label: "UTC+10:30", value: 630 },
    { label: "UTC+11:00", value: 660 },
    { label: "UTC+12:00", value: 720 },
    { label: "UTC+12:45", value: 765 },
    { label: "UTC+13:00", value: 780 },
    { label: "UTC+14:00", value: 840 },
  ];

  const times = [
    { label: "1AM", value: "1AM" },
    { label: "2AM", value: "2AM" },
    { label: "3AM", value: "3AM" },
    { label: "4AM", value: "4AM" },
    { label: "5AM", value: "5AM" },
    { label: "6AM", value: "6AM" },
    { label: "7AM", value: "7AM" },
    { label: "8AM", value: "8AM" },
    { label: "9AM", value: "9AM" },
    { label: "10AM", value: "10AM" },
    { label: "11AM", value: "11AM" },
    { label: "12AM", value: "12AM" },
    { label: "12PM", value: "12PM" },
    { label: "1PM", value: "1PM" },
    { label: "2PM", value: "2PM" },
    { label: "3PM", value: "3PM" },
    { label: "4PM", value: "4PM" },
    { label: "5PM", value: "5PM" },
    { label: "6PM", value: "6PM" },
    { label: "7PM", value: "7PM" },
    { label: "8PM", value: "8PM" },
    { label: "9PM", value: "9PM" },
    { label: "10PM", value: "10PM" },
    { label: "11PM", value: "11PM" },
  ];

  const daysOfWeek = [
    { label: "Monday", value: "0" },
    { label: "Tuesday", value: "1" },
    { label: "Wednesday", value: "2" },
    { label: "Thursday", value: "3" },
    { label: "Friday", value: "4" },
    { label: "Saturday", value: "5" },
    { label: "Sunday", value: "6" },
  ];

  const onSubmit = async (data) => {
    console.log(data)
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      if (data.logo && data.logo.length > 0) {
        formData.append("logo", data.logo[0]); // Append the first selected file
      }
      formData.append("phone", data.phone);
      formData.append("website", data.website);
      formData.append("about", data.about);
      formData.append("primaryCurrency", data.primaryCurrency);
      formData.append("secondaryCurrency", data.secondaryCurrency);
      formData.append("timezone", data.timezone);
      formData.append("weekStart", data.weekStart);
      formData.append("weekEnd", data.weekEnd);
      formData.append("dayStart", data.dayStart);
      formData.append("dayStart", data.workTimeStart);


      // Log the FormData entries
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await axiosInstance.put(`${apiUrl}/api/admin/settings/general`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
      toast.success("Settings updated successfully.");


      // For now, just reset the form
      reset();
      toast.success("Form data logged to console.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form.");
    }
  };

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "80vh",
  //       }}
  //     >
  //       <SpinnerLoader />
  //     </Box>
  //   );
  // }

  const timeZoneNow = () => {
    const date = new Date().toLocaleString();
    setCurrentTime(date)
  }
  setInterval(timeZoneNow, 1000);

  useEffect(() => {
    timeZoneNow()
  }, [setInterval])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Company Information */}
        <Box>
          <SettingsHeading Heading="General Settings" />
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "30px",
              color: "#010120",
              mt: "35px",
            }}
          >
            Company's Information
          </Typography>
        </Box>

        <Box sx={{ mt: "50px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Company Name is required" }}
              render={({ field }) => (
                <CustomInputLabel
                  label="Company Name"
                  id="name"
                  {...field}
                  error={errors.name?.message}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <CustomInputLabel
                  label="Company's Phone Number"
                  id="phone"
                  {...field}
                  error={errors.phone?.message}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              )}
            />
            <Controller
              name="website"
              control={control}
              rules={{ required: "Website is required" }}
              render={({ field }) => (
                <CustomInputLabel
                  label="Company's Website"
                  id="website"
                  {...field}
                  error={errors.website?.message}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Box sx={{ flexBasis: "32.7%" }}>
              <Controller
                name="logo"
                control={control}
                render={({ field }) => (
                  <CustomInputLabel
                    type="file"
                    label="Company's Logo"
                    id="logo"
                    onChange={(e) => field.onChange(e.target.files)}
                    height={{ xl: "64px", md: "45px" }}
                    paddingInput={{ xl: "0px 0px", md: "0px 0px" }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flexBasis: "67%" }}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Company's Address"
                    id="address"
                    {...field}
                    error={errors.address?.message}
                    height={{ xl: "64px", md: "45px" }}
                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <Controller
              name="about"
              control={control}
              rules={{ required: "About Company is required" }}
              render={({ field }) => (
                <CustomInputLabel
                  label="About Company"
                  id="about"
                  {...field}
                  error={errors.about?.message}
                  multiline
                  height="200px"
                  paddingInput="7px 5px"
                />
              )}
            />
          </Box>
        </Box>

        {/* Time Zone and Currency Settings */}
        <Box sx={{ mt: "50px", display: "flex", flexDirection: "column", gap: "1.8rem" }}>
          <SettingsHeading Heading="Time Zone Setting" />

          <Box>
            <Typography sx={{ color: "#010120", fontSize: "18px", fontWeight: "500" }}>
              Current Date and Time
            </Typography>
            <Typography sx={{ color: "#010120", fontSize: "18px", fontWeight: "500" }}>
              {currentTime}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}
          >
            <Controller
              name="timezone"
              control={control}
              rules={{ required: "Time Zone is required" }}
              render={({ field }) => (
                <CustomSelectForType
                  label="Organization Time Zone"
                  id="timezone"
                  {...field}
                  value={field.value || ""}
                  handleChange={field.onChange}
                  options={timeZones}
                  height="64px"
                  error={errors.timezone?.message}
                />
              )}
            />

            {/* Work Day Start and End */}
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Controller
                name="workDayStart"
                control={control}
                rules={{ required: "Work Day Start is required" }}
                render={({ field }) => (
                  <CustomSelectForType
                    label="Work Day Start"
                    id="workDayStart"
                    {...field}
                    value={field.value}
                    handleChange={field.onChange}
                    options={daysOfWeek}
                    height="64px"
                    error={errors.workDayStart?.message}
                  />
                )}
              />
              <Controller
                name="workDayEnd"
                control={control}
                rules={{ required: "Work Day End is required" }}
                render={({ field }) => (
                  <CustomSelectForType
                    label="Work Day End"
                    id="workDayEnd"
                    {...field}
                    value={field.value}
                    handleChange={field.onChange}
                    options={daysOfWeek}
                    height="64px"
                    error={errors.workDayEnd?.message}
                  />
                )}
              />

            </Box>

            {/* Work Time Start and End */}
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Controller
                name="workTimeStart"
                control={control}
                rules={{ required: "Work Time Start is required" }}
                render={({ field }) => (
                  <CustomSelectForType
                    label="Work Time Start"
                    id="workTimeStart"
                    {...field}
                    value={field.value}
                    handleChange={field.onChange}
                    options={times}
                    height="64px"
                    error={errors.workTimeStart?.message}
                  />
                )}
              />

            </Box>
          </Box>

          {/* Currency Setting */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <SettingsHeading Heading="Currency Setting" />
          </Box>

          <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            gap:"10px"
          }}
          >

          
          <Box sx={{ mt: "30px" }}>
            <Controller
              name="primaryCurrency"
              control={control}
              rules={{ required: "Primary Currency is required" }}
              render={({ field }) => (
                <VirtualizedSelect
                  label="Primary Currency"
                  id="primaryCurrency"
                  {...field}
                  value={field.value}
                  handleChange={field.onChange}
                  options={currencies}
                  height={{ xl: "65px !important", md: "58px !important" }}
                  error={errors.primaryCurrency?.message}
                />
              )}
            />
          </Box>

          <Box>
            <Controller
              name="secondaryCurrency"
              control={control}
              rules={{ required: "Secondary Currency is required" }}
              render={({ field }) => (
                <VirtualizedSelect
                  label="Secondary Currency"
                  id="secondaryCurrency"
                  {...field}
                  value={field.value}
                  handleChange={field.onChange}
                  options={currencies}
                  height={{ xl: "65px !important", md: "58px !important" }}
                  error={errors.secondaryCurrency?.message}
                />
              )}
            />
          </Box>
          </Box>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Submit Settings">
              <CustomButton
                ButtonText="Submit"
                fontSize="16px"
                color="white"
                fontWeight="500"
                fullWidth={false}
                variant="contained"
                padding="12px 0px"
                type="submit"
                background="#157AFF"
                hoverBg="#303f9f"
                hovercolor="white"
                width="189px"
                borderRadius="7px"
              />
            </Tooltip>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default GeneralSettings;
