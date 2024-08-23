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
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox"; // Import the CustomCheckbox component

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Register = () => {
  const user = useSelector((state) => state.user);
  const { setHeadertext, setParaText } = useOutletContext();
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const admin_token = user?.user?.accessToken || "";
  const config_admin = {
    headers: { Authorization: `Bearer ${admin_token}` },
  };

  useEffect(() => {
    setHeadertext("Add User");
    setParaText("User Details");
  }, []);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const handleDayChange = (day) => {
    setSelectedDays(prevSelected => 
      prevSelected.includes(day) ? prevSelected.filter(d => d !== day) : [...prevSelected, day]
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
          <Box sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <CustomInputLabel
                    label="Official Email*"
                    type="email"
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Typography>
          </Box>

          <Box sx={{ mb: "20px" }}>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column" }}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
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
          </Box>

          <Box sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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

            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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

          <Box sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
              <CustomInputLabel
                label="Password"
                placeholder="Password"
                value="admin1"
                disabled
              />
            </Typography>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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

          <Box sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: "User Role is required" }}
                render={({ field }) => (
                  <CustomSelectForType
                    label="User Role"
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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


          <Box sx={{ display: "flex", gap: "20px",flexDirection: { md: "row", xs: "column" }, position:"relative" }}>

          {/* Custom Checkboxes for Working Days */}
          <Box sx={{flexBasis:"33%"}} >
<Typography sx={{fontSize: "14px",
            color: "#9E9E9E",position: 'absolute',
            top: '0px',
            left: '10px',
            backgroundColor: 'white',
            padding: '0 10px',
            transform: 'translateY(-50%)',}} >
  Working Days
</Typography>
          
          <Box sx={{ display: "flex", gap: "10px", mt: "20px", flexWrap: "wrap", justifyContent: "start", flexBasis:"33" }}>
            {daysOfWeek.map(day => (
              <CustomCheckbox
                key={day}
                label={day}
                selected={selectedDays.includes(day)}
                onChange={handleDayChange}
              />
            ))}
          </Box>
          </Box>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
              <Controller
                name="hod"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInputLabel
                    label="HOD*"
                    error={errors.hod?.message}
                    {...field}
                  />
                )}
              />
            </Typography>
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
              <Controller
                name="teamLead"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInputLabel
                    label="Team Lead"
                    error={errors.teamLead?.message}
                    {...field}
                  />
                )}
              />
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "20px",flexDirection: { md: "row", xs: "column" }, position:"relative" }}>

          <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "32%" }}>
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
            <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "32%" }}>
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
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
            <CustomButton
              ButtonText="Save"
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
