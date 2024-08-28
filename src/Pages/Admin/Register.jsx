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
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox"; // Import the CustomCheckbox component

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Register = () => {
  const user = useSelector((state) => state.user);
  const { setHeadertext, setParaText } = useOutletContext();
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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
  } = useForm();

  const handleDayChange = (day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((d) => d !== day)
        : [...prevSelected, day]
    );
  };

  const onSubmit = async (data) => {
    try {
      console.log({ ...data, workingDays: selectedDays }); // Log the submitted data

      const response = await axiosInstance.post(
        `${apiUrl}/api/admin/register`,
        { ...data, workingDays: selectedDays },
        config_admin
      );

      toast.success("User Registered Successfully", { position: "top-center" });
      reset();
      setSelectedDays([]); // Reset selected days
    } catch (error) {
      const err = error?.response?.data?.message || error.message;
      toast.error(err, { position: "top-center" });
      console.log(error);
    }
  };

  return (
    <Box className="form-container-register">
      <Box className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Box sx={{ mb: "20px", display:"flex", gap:"20px" }}>
            <Typography
              sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis:"66.66%" }}
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
                name="emergencyNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Emergency Number is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Emergency Number*"
                    type="number"
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
                    label="Employee ID*"
                    error={errors.companyId?.message}
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
                name="timefrom"
                control={control}
                defaultValue=""
                rules={{ required: "Shift Time From is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Shift Timings From*"
                    type="time"
                    error={errors.timefrom?.message}
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
                name="timeto"
                control={control}
                defaultValue=""
                rules={{ required: "Shift Time To is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Shift Timings To*"
                    type="time"
                    error={errors.timeto?.message}
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
                name="totalShiftDuration"
                control={control}
                defaultValue="9 hours"
                render={({ field }) => (
                  <CustomInputLabel
                    label="Total Shift Duration*"
                    type="text"
                    error={errors.totalShiftDuration?.message}
                    value={"9 hours"}
                    // {...field}
                    readOnly
                    disabled
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
              <Controller
                name="duration"
                control={control}
                defaultValue="9 hours"
                render={({ field }) => (
                  <CustomInputLabel
                    label="Duration*"
                    type="text"
                    // error={errors.totalShiftDuration?.message}
                    value={"9 hours"}
                    // {...field}
                    readOnly
                    disabled
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
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: "User Role is required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="User Role"
                    height={"66px"}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "hr", label: "HR" },
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
                name="lineManager"
                control={control}
                defaultValue=""
                rules={{ required: "Line Manager is Required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="Line Manager"
                    height={"66px"}
                    options={[
                      { value: "uzaima", label: "Uzaima Iftikhar" },
                      { value: "ammad", label: "Ammad" },
                      
                    ]}
                    value={field.value}
                    handleChange={field.onChange}
                    error={errors.lineManager?.message}
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
                    key={day}
                    label={day}
                    selected={selectedDays.includes(day)}
                    onChange={handleDayChange}
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
                name="hod"
                control={control}
                defaultValue=""
                rules={{ required: "HOD is Required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="HOD*"
                    height={"66px"}
                    options={[
                      { value: "bial", label: "Bila Tunio" },
                      { value: "saraang", label: "Saraang Ali" },
                      { value: "shameekh", label: "Syed Shameekh" },
                      { value: "muzammil", label: "Muzammil Ahmed" },

                      
                    ]}
                    value={field.value}
                    handleChange={field.onChange}
                    error={errors.hod?.message}
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
                name="department"
                control={control}
                defaultValue=""
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Department*"
                    error={errors.department?.message}
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
                name="employementType"
                control={control}
                defaultValue=""
                rules={{ required: "User Role is required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="User Role"
                    height={"66px"}
                    options={[
                      { value: "partTime", label: "Part Time" },
                      { value: "fullTime", label: "Full Time" },
                      { value: "remote", label: "Remote" },
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
                name="locaionType"
                control={control}
                defaultValue=""
                rules={{ required: "Location Type is Required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="Location Type"
                    height={"66px"}
                    options={[
                      { value: "1", label: "location type 1" },
                      { value: "2", label: "location type 1" },
                      { value: "3", label: "location type 1" },
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
                name="onProbation"
                control={control}
                defaultValue=""
                rules={{ required: " On Probation is required" }}
                render={({ field }) => (
                  <CustomSelectForRole
                    label="On Probation"
                    height={"66px"}
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
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
