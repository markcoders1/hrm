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

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Register = () => {
  const user = useSelector((state) => state.user);
  const { setHeadertext, setParaText } = useOutletContext();
  const [selectedDays, setSelectedDays] = useState([]);
  const [hods, setHods] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [joiningDuration, setJoiningDuration] = useState("");


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

  const admin_token = user?.user?.accessToken || "";
  const config_admin = {
    headers: { Authorization: `Bearer ${admin_token}` },
  };

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
  } = useForm();
  ``;

  const handleDayChange = (day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((d) => d !== day)
        : [...prevSelected, day]
    );
  };

  const onSubmit = async (data) => {
    try {
      const workDays = selectedDays.map((day) => day.value);

      // Convert date and time to Unix timestamp in milliseconds
      const joiningDate = new Date(data.joiningDate).getTime();
      const shiftTimingFrom = new Date(
        `1970-01-01T${data.shiftTimingFrom}:00Z`
      ).getTime();
      const shiftTimingTo = new Date(
        `1970-01-01T${data.shiftTimingTo}:00Z`
      ).getTime();

      let DOB = new Date(data.DOB).getTime();
      DOB = DOB.toString()

      const payload = {
        ...data,
        workDays,
        joiningDate, 
        shiftTimingFrom,
        shiftTimingTo,
        DOB
        
      };

      console.log(payload); // Log the payload to check the data
      console.log(data);
      const response = await axiosInstance.post(
        `${apiUrl}/api/admin/register`,
        payload,
       
      );
      console.log(response)

      toast.success("User Registered Successfully", { position: "top-center" });

      setSelectedDays([]); // Reset selected days
    } catch (error) {
      const err = error?.response?.data?.message || error.message;
      toast.error(err, { position: "top-center" });
      console.log(error);
    }
  };

  const fetchPreDataToShow = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getRegisterDetails`,
        method: "get",
      });
      console.log(response);
      setTeamLeads(response.data.TL);
      setHods(response.data.HOD);
      setDepartments(response.data.departments);
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

    const from = new Date(`1970-01-01T${fromTime}:00Z`);
    const to = new Date(`1970-01-01T${toTime}:00Z`);

    // Calculate difference in minutes and take the absolute value to prevent negative durations
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

  return (
    <Box className="form-container-register">
      <Box className="form-register">
        <form>
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
                      error={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </Typography>
            </Box>

            <Box sx={{ mb: "20px", display: "flex", gap: "20px" }}>
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
                  name="emergencyContactNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Emergency Number is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Emergency Number*"
                      type="number"
                      error={errors.emergencyContactNumber?.message}
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
                  name="companyId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Company ID is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Employee ID*"
                      error={errors.companyId?.message}
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
                  name="password"
                  control={control}
                  defaultValue="Admin1"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Password*"
                      error={errors.password?.message}
                      {...field}
                      showPasswordToggle={true}
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
                      height={"66px"}
                      options={departments.map((depart) => ({
                        value: depart, // The value to send to the API
                        label: depart, // The label to display in the select
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.department?.message}
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
                      height={"66px"}
                      options={teamLeads.map((tl) => ({
                        value: tl.id, // The value to send to the API
                        label: tl.fullName, // The label to display in the select
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
              <Box sx={{ flexBasis: "33%" }}>
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
                  flexBasis: "33%",
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
                      height={"66px"}
                      options={hods.map((hod) => ({
                        value: hod.id, // The value to send to the API
                        label: hod.fullName, // The label to display in the select
                      }))}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.HOD?.message}
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
                      // error={errors.totalShiftDuration?.message}
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
                {/* <Controller
                  name="duration"
                  // control={control}
                  defaultValue=""
                  render={({ field }) => ( */}
                <CustomInputLabel
                  label="Duration*"
                  type="text"
                  // error={errors.totalShiftDuration?.message}
                  // value={}
                  // {...field}
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
                  flexBasis: "33%",
                }}
              >
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  rules={{ required: "User Role is required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="User Role"
                      height={"66px"}
                      options={[
                        { value: "HOD", label: "HOD" },
                        { value: "user", label: "User" },
                        { value: "TL", label: "TeamLead" },
                      ]}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.role?.message}
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
                  name="netSalary"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomInputLabel
                      label="Net Salary"
                      error={errors.netSalary?.message}
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
                  name="locationType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Location Type is Required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Location Type"
                      height={"66px"}
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
                      height={"66px"}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                      value={field.value}
                      handleChange={field.onChange}
                      error={errors.employementType?.message}
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
                  name="employmentType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Employeement Type is required" }}
                  render={({ field }) => (
                    <CustomSelectForRole
                      label="Employement Type"
                      height={"66px"}
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

          <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
            <CustomButton
              ButtonText="Add +"
              fontSize="18px"
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
              onClick={handleSubmit(onSubmit)}
              height="45px"
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
