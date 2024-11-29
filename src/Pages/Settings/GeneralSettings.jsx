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
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../../components/SpinnerLoader";


const GeneralSettings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    logo: '',
    phone: '',
    website: '',
    about: '',
    primaryCurrency: '',
    secondaryCurrency: '',
    timezone: '',
    weekStart: 0,
    weekEnd: 0,
    dayStart: 0,
  })

  const {
    control: controlCompanyInfo,
    handleSubmit: handleSubmitCompanyInfo,
    formState: { errors: errorsCompanyInfo },
    reset: resetCompanyInfo,
  } = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
    fetchCompanyData()
    // Fetch countries and currencies from the Rest Countries API
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {

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

  const fetchCompanyData = async () => {
    const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/general`, {

    });
    console.log(response)
    const data = response.data.data;

    setFormData({
      name: data?.name || '',
      address: data?.address || '',
      logo: data?.logo || '',
      phone: data?.phone || '',
      website: data?.website || '',
      about: data?.about || '',
      primaryCurrency: data?.primaryCurrency || '',
      secondaryCurrency: data?.secondaryCurrency || '',
      timezone: data?.timezone || '',
      weekStart: data?.weekStart || '',
      weekEnd: data?.weekEnd || '',
      dayStart: data?.dayStart || '',
    });



  };


  const timeZones = [
    { label: "UTC-12:00", value: -690 },
    { label: "UTC-11:00", value: -660 },
    { label: "UTC-10:00", value: -630 },
    { label: "UTC-09:30", value: -600 },
    { label: "UTC-09:00", value: -570 },
    { label: "UTC-08:00", value: -540 },
    { label: "UTC-07:00", value: -510 },
    { label: "UTC-06:00", value: -480 },
    { label: "UTC-05:00", value: -450 },
    { label: "UTC-04:00", value: -420 },
    { label: "UTC-03:30", value: -390 },
    { label: "UTC-03:00", value: -360 },
    { label: "UTC-01:00", value: -330 },
    { label: "UTC-02:00", value: -300 },
    { label: "UTC+00:00", value: -270 },
    { label: "UTC+01:00", value: -240 },
    { label: "UTC+02:00", value: -210 },
    { label: "UTC+03:00", value: -180 },
    { label: "UTC+03:30", value: -150 },
    { label: "UTC+04:00", value: -120 },
    { label: "UTC+04:30", value: -90 },
    { label: "UTC+05:00", value: -60 },
    { label: "UTC+05:30", value: -30 },
    { label: "UTC+05:45", value: 0 },
    { label: "UTC+06:00", value: 30 },
    { label: "UTC+06:30", value: 60 },
    { label: "UTC+07:00", value: 90 },
    { label: "UTC+08:00", value: 120 },
    { label: "UTC+08:45", value: 150 },
    { label: "UTC+09:00", value: 180 },
    { label: "UTC+09:30", value: 210 },
    { label: "UTC+10:00", value: 240 },
    { label: "UTC+10:30", value: 270 },
    { label: "UTC+11:00", value: 300 },
    { label: "UTC+12:00", value: 330 },
    { label: "UTC+12:45", value: 360 },
    { label: "UTC+13:00", value: 390 },
    { label: "UTC+14:00", value: 420 },
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
    { label: "Monday", value: "0" },
    { label: "Tuesday", value: "1" },
    { label: "Wednesday", value: "2" },
    { label: "Thursday", value: "3" },
    { label: "Friday", value: "4" },
    { label: "Saturday", value: "5" },
    { label: "Sunday", value: "6" },
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


  const onSubmit = (data) => {
    console.log(formData)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Company Information Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

          }}
        >
          <SettingsHeading Heading="General Settings" />
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "30px",
              color: "#010120",
              mt: "35px"
            }}
          >
            Company's Information
          </Typography>
        </Box>

        <Box
          sx={{
            mt: "50px",
          }}
        >

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <CustomInputLabel
              label="Company Name"
              id="name"
              value={formData?.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              height={{ xl: "64px", md: "45px" }}
              paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
            />
            <CustomInputLabel
              label="Company's Phone Number"
              id="phone"
              value={formData?.phone}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              height={{ xl: "64px", md: "45px" }}
              paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
            />
            <CustomInputLabel
              label="Company's Website"
              id="website"
              value={formData?.website}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              height={{ xl: "64px", md: "45px" }}
              paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
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

              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  type="file"
                  label="Company's Logo"
                  id="companyLogo"
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              </Box>

            </Box>
            <Box
              sx={{
                flexBasis: "67%",
              }}
            >
              <CustomInputLabel
                label="Company's Address"
                id="address"
                value={formData?.address}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                height={{ xl: "64px", md: "45px" }}
                paddingInput={{ xl: "21px 10px", md: "13px 8px" }}


              />
            </Box>
          </Box>

          <Box>
            <CustomInputLabel
              label="About Company"
              id="about"
              value={formData?.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              multiline
              height="200px"
              paddingInput="7px 5px"
            />

          </Box>



        </Box>

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


          {/* here i had changed code s here i am getting can not read properties of undefined reading value  */}
          <CustomSelectForType
            label="Organization Time Zone"
            id="timezone"
            value={formData?.timezone || ""}  // Ensure it's an empty string if undefined
            handleChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            options={timeZones}
            height={"64px"}
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

          </Box>

          {/* Currency Setting */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-between"
            }}
          >

            <SettingsHeading Heading="Currency Setting" />

          </Box>
          <Box
            sx={{
              mt: "30px"
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
        </Box>
      </form>
    </Box>
  );
};

export default GeneralSettings;
