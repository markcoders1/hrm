import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import SettingsHeading from '../../components/Heading/SettingsHeading'
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import { CheckBox } from "@mui/icons-material";
import VirtualizedSelect from "../../components/VirtualizedSelect/VirtualizedSelect";
import axios from "axios";

const GeneralSettings = () => {
  const navigate = useNavigate();

  const {
    control: controlCompanyInfo,
    handleSubmit: handleSubmitCompanyInfo,
    formState: { errors: errorsCompanyInfo },
    reset: resetCompanyInfo,
  } = useForm();

  const {
    control: controlTimeZone,
    handleSubmit: handleSubmitTimeZone,
    formState: { errors: errorsTimeZone },
    reset: resetTimeZone,
  } = useForm();

  const [currencies, setCurrencies] = useState([]);
  const [isDefaultCurrency, setIsDefaultCurrency] = useState(false);

  useEffect(() => {
    // Fetch countries and currencies from the Rest Countries API
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Extract unique currencies
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
      })
      .catch((error) =>
        console.error("Error fetching countries and currencies:", error)
      );
  }, []);

  const timeZones = [
    { label: "UTC−12:00", value: "Etc/GMT+12" },
    { label: "UTC−11:00", value: "Etc/GMT+11" },
    { label: "UTC−10:00", value: "Etc/GMT+10" },
    { label: "UTC−09:30", value: "Pacific/Marquesas" },
    { label: "UTC−09:00", value: "Etc/GMT+9" },
    { label: "UTC−08:00", value: "Etc/GMT+8" },
    { label: "UTC−07:00", value: "Etc/GMT+7" },
    { label: "UTC−06:00", value: "Etc/GMT+6" },
    { label: "UTC−05:00", value: "Etc/GMT+5" },
    { label: "UTC−04:00", value: "Etc/GMT+4" },
    { label: "UTC−03:30", value: "America/St_Johns" },
    { label: "UTC−03:00", value: "Etc/GMT+3" },
    { label: "UTC−02:00", value: "Etc/GMT+2" },
    { label: "UTC−01:00", value: "Etc/GMT+1" },
    { label: "UTC±00:00", value: "Etc/GMT" },
    { label: "UTC+01:00", value: "Etc/GMT-1" },
    { label: "UTC+02:00", value: "Etc/GMT-2" },
    { label: "UTC+03:00", value: "Etc/GMT-3" },
    { label: "UTC+03:30", value: "Asia/Tehran" },
    { label: "UTC+04:00", value: "Etc/GMT-4" },
    { label: "UTC+04:30", value: "Asia/Kabul" },
    { label: "UTC+05:00", value: "Etc/GMT-5" },
    { label: "UTC+05:30", value: "Asia/Kolkata" },
    { label: "UTC+05:45", value: "Asia/Kathmandu" },
    { label: "UTC+06:00", value: "Etc/GMT-6" },
    { label: "UTC+06:30", value: "Asia/Yangon" },
    { label: "UTC+07:00", value: "Etc/GMT-7" },
    { label: "UTC+08:00", value: "Etc/GMT-8" },
    { label: "UTC+08:45", value: "Australia/Eucla" },
    { label: "UTC+09:00", value: "Etc/GMT-9" },
    { label: "UTC+09:30", value: "Australia/Adelaide" },
    { label: "UTC+10:00", value: "Etc/GMT-10" },
    { label: "UTC+10:30", value: "Australia/Lord_Howe" },
    { label: "UTC+11:00", value: "Etc/GMT-11" },
    { label: "UTC+12:00", value: "Etc/GMT-12" },
    { label: "UTC+12:45", value: "Pacific/Chatham" },
    { label: "UTC+13:00", value: "Etc/GMT-13" },
    { label: "UTC+14:00", value: "Etc/GMT-14" },
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
  ]

  const daysOfWeek = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const onSubmitCompanyInfo = (data) => {
    console.log("Company Information Form Data:", data);
    resetCompanyInfo();
    navigate(-1);
  };

  const onSubmitTimeZone = (data) => {
    data.isDefaultCurrency = isDefaultCurrency;
    console.log("Time Zone and Currency Form Data:", data);
    resetTimeZone();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Company Information Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xl: "3rem", xs: "2rem" },
        }}
      >
        <SettingsHeading Heading="General Settings" />
        <SettingsHeading Heading="Company Information" />
      </Box>

      <Box
        sx={{
          mt: "50px",
        }}
      >
        <form
          onSubmit={handleSubmitCompanyInfo(onSubmitCompanyInfo)}
          style={{
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Controller
              name="companyName"
              control={controlCompanyInfo}
              defaultValue=""
              rules={{ required: "Company Name is required" }}
              render={({ field }) => (
                <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                  <CustomInputLabel
                    label="Company Name"
                    id="companyName"
                    error={errorsCompanyInfo.companyName?.message}
                    {...field}
                    height={{ xl: "64px", md: "45px" }}
                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                  />
                </Box>
              )}
            />
            <Controller
              name="companyPhone"
              control={controlCompanyInfo}
              defaultValue=""
              rules={{ required: "Company Phone is required" }}
              render={({ field }) => (
                <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                  <CustomInputLabel
                    label="Company Phone Number"
                    id="companyPhone"
                    error={errorsCompanyInfo.companyPhone?.message}
                    {...field}
                    height={{ xl: "64px", md: "45px" }}
                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                  />
                </Box>
              )}
            />
            <Controller
              name="companyWebsite"
              control={controlCompanyInfo}
              defaultValue=""
              rules={{ required: "Company Website is required" }}
              render={({ field }) => (
                <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                  <CustomInputLabel
                    label="Company Website"
                    id="companyWebsite"
                    error={errorsCompanyInfo.companyWebsite?.message}
                    {...field}
                    height={{ xl: "64px", md: "45px" }}
                    paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                  />
                </Box>
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Box
              sx={{
                flexBasis: "32.7%",
              }}
            >
              <Controller
                name="companyLogo"
                control={controlCompanyInfo}
                defaultValue=""
                rules={{ required: "Company Logo is required" }}
                render={({ field }) => (
                  <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                    <CustomInputLabel
                      type="file"
                      label="Company Logo"
                      id="companyLogo"
                      error={errorsCompanyInfo.companyLogo?.message}
                      {...field}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                    />
                  </Box>
                )}
              />
            </Box>
            <Box
              sx={{
                flexBasis: "67%",
              }}
            >
              <Controller
                name="companyAddress"
                control={controlCompanyInfo}
                defaultValue=""
                rules={{ required: "Company Address is required" }}
                render={({ field }) => (
                  <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                    <CustomInputLabel
                      label="Company Address"
                      id="companyAddress"
                      error={errorsCompanyInfo.companyAddress?.message}
                      {...field}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                    />
                  </Box>
                )}
              />
            </Box>
          </Box>

          <Box>
            <Controller
              name="aboutCompany"
              control={controlCompanyInfo}
              defaultValue=""
              rules={{ required: "About is required" }}
              render={({ field }) => (
                <CustomInputLabel
                  label="About Company"
                  multiline
                  error={errorsCompanyInfo.aboutCompany?.message}
                  {...field}
                  height="200px"
                  paddingInput="7px 5px"
                />
              )}
            />
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
            <Tooltip title="Submit Company Information">
              <CustomButton
                ButtonText="Submit"
                fontSize="12px"
                color="white"
                fontWeight="500"
                fullWidth={false}
                variant="contained"
                padding="10px 0px"
                type="submit"
                background="#157AFF"
                hoverBg="#303f9f"
                hovercolor="white"
                width={"189px"}
                borderRadius="7px"
              />
            </Tooltip>
          </Box>
        </form>
      </Box>

      {/* Time Zone and Currency Settings Form */}
      <Box
        sx={{
          mt: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "1.8rem",
        }}
      >
        <SettingsHeading Heading="Time Zone Setting" />

        <Box>
          <Typography
            sx={{
              color: "#0101200",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Current Date and Time
          </Typography>
          <Typography
            sx={{
              color: "#0101200",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {new Date().toLocaleString()}
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmitTimeZone(onSubmitTimeZone)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Organization Time Zone */}
          <Controller
            name="organizationTimeZone"
            control={controlTimeZone}
            defaultValue=""
            rules={{ required: "Time Zone is required" }}
            render={({ field }) => (
              <CustomSelectForType
                label="Organization Time Zone"
                value={field.value}
                handleChange={field.onChange}
                options={timeZones}
                height={"64px"}
                error={errorsTimeZone.organizationTimeZone?.message}
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
              control={controlTimeZone}
              defaultValue=""
              rules={{ required: "Work Day Start is required" }}
              render={({ field }) => (
                <CustomSelectForType
                  label="Work Day Start"
                  value={field.value}
                  handleChange={field.onChange}
                  options={daysOfWeek}
                  height={"64px"}
                  error={errorsTimeZone.workDayStart?.message}
                />
              )}
            />
            <Controller
              name="workDayEnd"
              control={controlTimeZone}
              defaultValue=""
              rules={{ required: "Work Day End is required" }}
              render={({ field }) => (
                <CustomSelectForType
                  label="Work Day End"
                  value={field.value}
                  handleChange={field.onChange}
                  options={daysOfWeek}
                  height={"64px"}
                  error={errorsTimeZone.workDayEnd?.message}
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
              control={controlTimeZone}
              defaultValue=""
              rules={{ required: "Work Time Start is required" }}
              render={({ field }) => (
                <CustomSelectForType
                  label="Work Time Start"
                  value={field.value}
                  handleChange={field.onChange}
                  options={times}
                  height={"64px"}
                  error={errorsTimeZone.workTimeStart?.message}
                />
              )}
            />
            <Controller
              name="workTimeEnd"
              control={controlTimeZone}
              defaultValue=""
              rules={{ required: "Work Time End is required" }}
              render={({ field }) => (
                <CustomSelectForType
                  label="Work Time End"
                  value={field.value}
                  handleChange={field.onChange}
                  options={times}
                  height={"64px"}
                  error={errorsTimeZone.workTimeEnd?.message}
                />
              )}
            />
          </Box>

          {/* Currency Setting */}
          <Box
             sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent:"space-between"
            }}
          >

          <SettingsHeading Heading="Currency Setting" />
          <Box
           sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",}}
          >
               <input
              type="checkbox"
              checked={isDefaultCurrency}
              onChange={(e) => setIsDefaultCurrency(e.target.checked)}
            />
            <Typography>Default Currency</Typography>
         
          </Box>
          </Box>
<Box
sx={{
  mt:"30px"
}}
>

          <Controller
            name="currency"
            control={controlTimeZone}
            defaultValue=""
            rules={{ required: "Currency is required" }}
            render={({ field }) => (
              <VirtualizedSelect
                label="Currency"
                height={{ xl: "76px !important", md: "58px !important" }}
                options={currencies}
                value={field.value}
                handleChange={field.onChange}
                error={errorsTimeZone.currency?.message}
              />
            )}
          />
</Box>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
            <Tooltip title="Submit Time Zone Settings">
              <CustomButton
                ButtonText="Submit"
                fontSize="12px"
                color="white"
                fontWeight="500"
                fullWidth={false}
                variant="contained"
                padding="10px 0px"
                type="submit"
                background="#157AFF"
                hoverBg="#303f9f"
                hovercolor="white"
                width={"189px"}
                borderRadius="7px"
              />
            </Tooltip>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
