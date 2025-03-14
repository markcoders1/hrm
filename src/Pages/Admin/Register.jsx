import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axiosInstance from "../../auth/axiosInstance";
import { useOutletContext } from "react-router-dom";
import "../../PagesCss/Register.css";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import CustomSelectForRole from "../../components/CustomSelectForRole/CustomSelectForRole";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import { differenceInMinutes, differenceInHours, format } from "date-fns";
import { setFormDirty } from "../../Redux/formSlice";
import { useDispatch } from "react-redux";
import FileUpload from "../../components/FileUpload/FileUpload";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Register = () => {
  const user = useSelector((state) => state.user);
  const { setHeadertext, setParaText } = useOutletContext();
  const [selectedDays, setSelectedDays] = useState([]);
  const [hods, setHods] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  const [joiningDuration, setJoiningDuration] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [companyIDValue, setCompanyIDValue] = useState("");
  const [netSalary, setNetSalary] = useState(0);
  const [documentShow, setDocumentShow] = useState(false);
    const [companyID, setCompanyId] = useState('');
  

  const dispatch = useDispatch();

  const [shiftDuration, setShiftDuration] = useState("");
  const daysOfWeek = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 0 },
  ];
  const [formData, setFormData] = useState({
    frontCnic: null,
    backCnic: null,
    lastEducation: null,
    lastEmployer: null,
    lastPayroll: null,
    photo: null,
    resume: null,
  });

  const handleSubmitChange = async () => {
    const keys = Object.keys(formData);
    for (let key of keys) {
      if (formData[key] && formData[key].size > 2 * 1024 * 1024) {
        console.error("File size exceeds 2MB for", key);
        return;
      }
    }

    const formDataToSend = new FormData();
    keys.forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
  };

  const admin_token = user?.user?.accessToken || "";
  // const config_admin = {
  //   headers: { Authorization: `Bearer ${admin_token}` },
  // };

  useEffect(() => {
    setHeadertext("Add User");
    setParaText("User Details");
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm();
  const handleDayChange = (day) => {
    setSelectedDays((prevSelected) => {
      const days = prevSelected.map((d) => d.value);
      return days.includes(day.value)
        ? prevSelected.filter((d) => d.value !== day.value)
        : [...prevSelected, day];
    });
  };
  useEffect(() => {}, []);

  function convertTimeToUnixTimestamp(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // use setHours instead of setUTCHours for local time
    return Math.floor(date.getTime() / 1000);
  }
  const onSubmit = async (data) => {
    console.log("=============>", formData);

    console.log(data);

    let phone = Number(data.phone);
    let emergencyNumber = Number(data.emergencyNumber);

    const shiftTimingFrom = convertTimeToUnixTimestamp(data.shiftTimingFrom);
    const shiftTimingTo = convertTimeToUnixTimestamp(data.shiftTimingTo);

    try {
      const workDays = selectedDays.map((day) => day.value);

      // Convert date and time to Unix timestamp in milliseconds
      const joiningDate = new Date(data.joiningDate).getTime();
      // const shiftTimingFrom = new Date(
      //   `1970-01-01T${data.shiftTimingFrom}:00Z`
      // ).getTime();
      // const shiftTimingTo = new Date(
      //   `1970-01-01T${data.shiftTimingTo}:00Z`
      // ).getTime();

      let DOB = new Date(data.DOB).getTime();
      DOB = DOB.toString();

      // const payload = {
      //   ...data,
      //   workDays,
      //   joiningDate,
      //   shiftTimingFrom,
      //   shiftTimingTo,
      //   DOB,
      //   // phone,
      //   // emergencyNumber
      // };

      // const response = await axiosInstance.post(
      //   `${apiUrl}/api/admin/register`,
      //   payload,

      // );
      const res = await axiosInstance({
        url: `${apiUrl}/api/admin/user`,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data", // Important to send as multipart form data
        },
        data: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          emergencyNumber: data.emergencyNumber,
          CNIC: data.CNIC,
          DOB: DOB,
          companyId: companyIDValue,
          password: data.password,
          shiftTimingFrom: shiftTimingFrom,
          shiftTimingTo: shiftTimingTo,
          department: data.department,
          teamLeadID: data.teamLeadID,
          designation: data.designation,
          workDays: workDays,
          HODID: data?.HODID,
          joiningDate: joiningDate,
          role: data.role,
          annualLeaves: data.annualLeaves,
          basicSalary: data.basicSalary,
          commuteAllowance: data.commuteAllowance,
          internetAllowance: data.internetAllowance,
          mobileAllowance: data.mobileAllowance,
          bank: data.bank,
          BAN: data.BAN,
          BAT: data.BAT,
          locationType: data.locationType,
          onProbation: data.onProbation,
          employmentType: data.employmentType,
          CNICFront: formData.frontCnic,
          CNICBack: formData.backCnic,

          EducationalCert: formData.lastEducation,
          EmploymentLetter: formData.lastEmployer,
          Payslip: formData.lastPayroll,
          resume: formData.resume,
          photograph: formData.photo,
        },
      });
      console.log(res);
      toast.success("User Registered Sucessfully", { position: "top-right" });
      setSelectedDays([]); 
    } catch (error) {
      console.log(error);

      const err = error?.res?.data?.message || error.message;
      toast.error(err, { position: "top-center" });
      console.log(error);
      toast.error(error.res.data.message[0].message, { position: "top-right" });
    }
  };

  const fetchPreDataToShow = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/register`,
        method: "get",
      });
      console.log(response);
      setTeamLeads(response.data.TL);
      setHods(response.data.HOD);
      setDepartments(response.data.departments);
      setCompanyIDValue(response?.data?.companyID);
      setRoles(response?.data?.roles);
      console.log(response.data.companyID);
      setCompanyId
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPreDataToShow();
  }, []);

  // Inside your component
  const calculateShiftDuration = (fromTime, toTime) => {
    if (!fromTime || !toTime) return "";

    console.log(fromTime, toTime);

    const from = new Date(`1970-01-01T${fromTime}:00Z`);

    const to =
      fromTime.slice(0, 2) > toTime.slice(0, 2)
        ? new Date(`1970-01-02T${toTime}:00Z`)
        : new Date(`1970-01-01T${toTime}:00Z`);

    const totalMinutes = Math.abs(differenceInMinutes(from, to));

    // Calculate hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  };

  // Update the component logic to handle the shift timing change
  const handleShiftTimingChange = () => {
    const shiftFrom = watch("shiftTimingFrom");
    const shiftTo = watch("shiftTimingTo");
    setShiftDuration(calculateShiftDuration(shiftFrom, shiftTo));
  };

  // In your form, call `handleShiftTimingChange` whenever shift timings change
  useEffect(() => {
    handleShiftTimingChange();
  }, [watch("shiftTimingFrom"), watch("shiftTimingTo")]);

  // useEffect(() => {
  //   if (watch("joiningDate")) {
  //     const joiningDate = new Date(watch("joiningDate"));
  //     const currentDate = new Date();
  //     const diffInMs = currentDate - joiningDate;

  //     const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  //     let durationDiff;

  //     if (diffInDays >= 365) {
  //       const years = Math.floor(diffInDays / 365);
  //       durationDiff = `${years} ${years > 1 ? "years" : "year"}`;
  //     } else if (diffInDays >= 30) {
  //       const months = Math.floor(diffInDays / 30);
  //       durationDiff = `${months} ${months > 1 ? "months" : "month"}`;
  //     } else {
  //       durationDiff = `${Math.floor(diffInDays)} ${
  //         Math.floor(diffInDays) > 1 ? "days" : "day"
  //       }`;
  //     }

  //     // setValue("durationDiff", durationDiff);
  //   }
  // }, [watch("joiningDate"), setValue]);
  useEffect(() => {
    console.log("sadfghjkdsfghjsdfghjdfgh", companyIDValue);
  }, [companyIDValue]);

  useEffect(() => {
    console.log(companyIDValue);
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    dispatch(setFormDirty(isDirty));

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const commuteAllowance = watch("commuteAllowance");
  const internetAllowance = watch("internetAllowance");
  const mobileAllowance = watch("mobileAllowance");
  const basicSalary = watch("basicSalary");

  const calculateNetSalary = () => {
    const net =
      (parseFloat(basicSalary) || 0) +
      (parseFloat(mobileAllowance) || 0) +
      (parseFloat(commuteAllowance) || 0) +
      (parseFloat(internetAllowance) || 0);

    setNetSalary(net.toFixed(2)); // Round to 2 decimal places
  };

  useEffect(() => {
    calculateNetSalary();
  }, [basicSalary, mobileAllowance, commuteAllowance, internetAllowance]);

  // calculating duration

  const calculateJoiningDuration = (joiningDate) => {
    if (!joiningDate) return "";

    const joining = new Date(joiningDate);
    const today = new Date();

    let years = today.getFullYear() - joining.getFullYear();
    let months = today.getMonth() - joining.getMonth();

    if (months < 0) {
      years -= 1; // Adjust the year
      months += 12; // Convert negative months to positive by adding 12
    }

    return `${years} year${years !== 1 ? "s" : ""} and ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };

  const joiningDate = watch("joiningDate");

  useEffect(() => {
    setJoiningDuration(calculateJoiningDuration(joiningDate));
  }, [joiningDate]);

  return (
    <Box className="form-container-register">
      <Box className="form-register">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: "0px !important" }}
        >
          <Box
            sx={{
              boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)", // Converted from Figma
              borderRadius: "9px",
              p: "26px 23px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Full Name is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Full Name*"
                      error={errors.fullName?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Phone Number*"
                      error={errors.phone?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Email*"
                      type="email"
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      error={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                mb: "20px",
                display: "flex",
                gap: "20px",

                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "66.66%",
                }}
              >
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Address is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Address"
                      fullWidth
                      error={errors.address?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="emergencyNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Emergency Number is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Emergency Contact Number*"
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      error={errors.emergencyNumber?.message}
                      {...field}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="CNIC"
                  control={control}
                  defaultValue=""
                  rules={{ required: "CNIC is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="CNIC*"
                      error={errors.CNIC?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="DOB"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Date of Birth*"
                      type="date"
                      error={errors.DOB?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>

              {/* <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="companyId"
                  control={control}
                  defaultValue={companyIDValue}
                  rules={{ required: "Company ID is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      defaultValue={companyIDValue}
                      label="Company ID*"
                      error={errors.companyId?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography> */}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="password"
                  control={control}
                  defaultValue="Admin123"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Password*"
                      error={errors.password?.message}
                      {...field}
                      showPasswordToggle={true}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      type={"password"}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="shiftTimingFrom"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Shift Time From is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Shift Timings From*"
                      type="time"
                      error={errors.shiftTimingFrom?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="shiftTimingTo"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Shift Time To is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Shift Timings To*"
                      type="time"
                      error={errors.shiftTimingTo?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Department*"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={departments.map((depart) => ({
                        value: depart.value, // The value to send to the API
                        label: depart.label, // The label to display in the select
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.department?.message}
                      // height={{xl:"64px", md:"45px"}}
                      // paddingInput={{xl:"21px 10px", md:"13px 8px"}}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="teamLeadID"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Line Manager is Required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Line Manager"
                      height={{
                        xl: "76px !important",
                        md: "58px !important",
                        xs: "52px",
                      }}
                      options={teamLeads.map((tl) => ({
                        value: tl.id,
                        label: tl.fullName,
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.teamLeadID?.message}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="designation"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Designation is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Designation*"
                      error={errors.designation?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: { md: "row", xs: "column" },
                position: "relative",
              }}
            >
              {/* Custom Checkboxes for Working Days */}
              <Box sx={{ flexBasis: "32.5%" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#9E9E9E",
                    position: "absolute",
                    top: "0px",
                    left: "10px",
                    backgroundColor: "white",
                    padding: "0 10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  Working Days
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    mt: "20px",
                    flexWrap: "wrap",
                    justifyContent: "start",
                    flexBasis: "33",
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <CustomCheckbox
                      key={day.label}
                      label={day.label}
                      selected={selectedDays.some(
                        (selected) => selected.value === day.value
                      )}
                      onChange={() => handleDayChange(day)}
                    />
                  ))}
                </Box>
              </Box>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "32.5%",
                }}
              >
                <Controller
                  name="HODID"
                  control={control}
                  defaultValue=""
                  rules={{ required: "HOD is Required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="HOD*"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={hods.map((hod) => ({
                        value: hod.id, // The value to send to the API
                        label: hod.fullName, // The label to display in the select
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      // error={errors.HODID?.message}
                    />
                  )}
                />
              </Typography>

             
            </Box>
          </Box>
          <Box
            sx={{
              boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)", // Converted from Figma
              borderRadius: "9px",
              p: "26px 23px",
              mt:"25px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name=""
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Total Shift Duration*"
                      type="text"
                      error={errors.totalShiftDuration?.message}
                      value={shiftDuration}
                      // {...field}
                      readOnly
                      disabled={true}
                      border={false}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="joiningDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Joining Date From is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Joining Date*"
                      type="date"
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      error={errors.joiningDate?.message}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <CustomInputLabel
                  label="Duration*"
                  type="text"
                  value={joiningDuration}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                  border={false}
                  readOnly
                  disabled
                />
                {/* )}
                /> */}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
            <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "32.5%",
                }}
              >
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Role is Required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Role*"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={roles.map((role) => ({
                        value: role.value, // The value to send to the API
                        label: role.label, // The label to display in the select
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="annualLeaves"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Annual Leaves*"
                      error={errors.annualLeaves?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                      type={"number"}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="basicSalary"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Basic Salary"
                      error={errors.basicSalary?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                      type={"number"}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="commuteAllowance"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Convenience Allowance is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Convenience Allowance*"
                      error={errors.commuteAllowance?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                      type={"number"}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="internetAllowance"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Internet Allowance is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Internet Allowance*"
                      error={errors.internetAllowance?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                      type={"number"}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="mobileAllowance"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Mobile Allowance is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Mobile allowance"
                      error={errors.mobileAllowance?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                      type={"number"}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                mb: "20px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name=""
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Net Salary*"
                      type="text"
                      value={netSalary}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      // {...field}
                      readOnly
                      disabled={true}
                      border={false}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="bank"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Bank Name is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Bank Name*"
                      error={errors.bank?.message}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                      {...field}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="BAN"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Bank Account Number is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Bank Account Number*"
                      error={errors.BAN?.message}
                      {...field}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: { md: "row", xs: "column" },
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="BAT"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Bank Account Title is Required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Bank Account Title"
                      error={errors.BAT?.message}
                      {...field}
                      height={{ xl: "64px", md: "45px" }}
                      paddingInput={{ xl: "21px 4px", md: "13px 8px" }}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="locationType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Location Type is Required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Location Type"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={[
                        { value: "onsite", label: "On-Site" },
                        { value: "remote", label: "Remote" },
                        { value: "hybrid", label: "Hybrid" },
                      ]}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.locationType?.message}
                    />
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="onProbation"
                  control={control}
                  defaultValue=""
                  rules={{ required: " On Probation is required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="On Probation"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.employementType?.message}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: { md: "row", xs: "column" },
                position: "relative",
                mt: "15px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  flexBasis: "32.5%",
                }}
              >
                <Controller
                  name="employmentType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Employeement Type is required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Employement Type"
                      height={{ xl: "76px !important", md: "58px !important" }}
                      options={[
                        { value: "partTime", label: "Part Time" },
                        { value: "fullTime", label: "Full Time" },
                      ]}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.employmentType?.message}
                    />
                  )}
                />
              </Typography>
            </Box>
          </Box>
          {documentShow ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
                gap: "5rem",
                mt: "100px",
              }}
            >
              <Typography
                sx={{
                  color: "#010120",
                  fontWeight: "600",
                  fontSize: { xl: "40px", xs: "30px" },
                }}
              >
                Documents
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "3rem",
                }}
              >
                <FileUpload
                  label="Front CNIC"
                  name="frontCnic"
                  formData={formData}
                  setFormData={setFormData}
                />
                <FileUpload
                  label="Back CNIC"
                  name="backCnic"
                  formData={formData}
                  setFormData={setFormData}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "3rem",
                }}
              >
                <FileUpload
                  label="Education Certificate"
                  name="lastEducation"
                  formData={formData}
                  setFormData={setFormData}
                />
                <FileUpload
                  label="Employement Letter"
                  name="lastEmployer"
                  formData={formData}
                  setFormData={setFormData}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "3rem",
                }}
              >
                <FileUpload
                  label="Payslip"
                  name="lastPayroll"
                  formData={formData}
                  setFormData={setFormData}
                />
                <FileUpload
                  label="Photograph"
                  name="photo"
                  formData={formData}
                  setFormData={setFormData}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "3rem",
                }}
              >
                <FileUpload
                  label="Resume"
                  name="resume"
                  formData={formData}
                  setFormData={setFormData}
                  BoxStyling={{
                    flexBasis: "100%",
                  }}
                />
              </Box>

              {/* 
                 lastEducation: null,
      lastEmployer: null,
      lastPayroll: null,
      photo: null,
      resume: null,
                */}
            </Box>
          ) : (
            ""
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: "20px",
              gap: "1.5rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#010120",
                fontWeight: "500",
                ":hover": {
                  backgroundColor: "#303f9f",
                  color: "white",
                  border: "none",
                },
                borderRadius: "7px",
                height: "45px",
                width: "195px",
                border: "1px solid #010120",
                boxShadow: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: ".1s ease-in",
              }}
              onClick={() => setDocumentShow(true)}
            >
              Add Documents +
            </Typography>

            <CustomButton
              ButtonText="Add User +"
              fontSize="16px"
              color="white"
              fontWeight="500"
              fullWidth={false}
              variant="contained"
              padding="10px 20px"
              type="submit"
              background="#157AFF"
              hoverBg="#303f9f"
              hovercolor="white"
              width={"150px"}
              borderRadius="7px"
              // onClick={(()=> onSubmit())}
              height="45px"
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
