import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/UserInfo.css";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import CustomSelectForRole from "../components/CustomSelectForRole/CustomSelectForRole"; // Updated import
import CustomButton from "../components/CustomButton/CustomButton";
import { Loader } from "../components/Loaders";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserInfo = () => {
  const { setHeadertext } = useOutletContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [inputAbled, setInputAbled] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setHeadertext("Edit User");
    const getSpecificUser = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getUser`,
          method: "get",
          params: { id },
        });
        const dataAllEmployee = response.data.user;
        console.log(response)

        // Pre-process the DOB to match the required date input format
        if (dataAllEmployee.DOB) {
          const date = new Date(dataAllEmployee.DOB);
          const formattedDate = date.toISOString().split("T")[0]; // Converts to 'yyyy-MM-dd' format
          setValue("DOB", formattedDate);
        }

        // Pre-fill the form with the retrieved data
        for (const key in dataAllEmployee) {
          if (key !== "DOB" && dataAllEmployee.hasOwnProperty(key)) {
            setValue(key, dataAllEmployee[key]);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSpecificUser();
  }, [id, apiUrl, setHeadertext, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/update-any-profile`,
        method: "post",
        data: { id, ...data },
      });
      console.log(response);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="form-container-register">
      <Box
        sx={{
          border: "1px dashed #C5C5C5",
          width: "517px",
          p: "1rem",
          borderRadius: "7px",
          position: { lg: "fixed", xs: "static" },
          right: "40px",
          top: "20px",
          zIndex: "100000 ",
        }}
      >
        <Box sx={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <img src="" style={{ width: "64px", height: "64px" }} alt="" />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            Aman Raza Khan
          </Typography>
        </Box>
      </Box>
      <Box className="form-register" sx={{ mt: "40px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loading ? (
            <Box className="loaderContainer">
              <Loader />
            </Box>
          ) : (
            <>
              {/* Upper Group: Full Name, Phone Number, Email, etc. */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  mb: "40px",
                  boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)", // Converted from Figma
                  borderRadius: "9px",
                  p: "26px 23px",
                }}
              >
                {/* Upper Fields Group */}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Full Name*"
                          error={errors.fullName?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Phone Number*"
                          error={errors.phone?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Official Email*"
                          type="email"
                          error={errors.email?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Address"
                          fullWidth
                          error={errors.address?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Emergency Number*"
                          type="number"
                          error={errors.emergencyNumber?.message}
                          disabled={!inputAbled}
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
                      rules={{ required: "CNIC is required" }}
                      render={({ field }) => (
                        <CustomInputLabel
                          label="CNIC*"
                          error={errors.CNIC?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Date of Birth*"
                          type="date"
                          error={errors.DOB?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Employee ID*"
                          error={errors.companyId?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Password"
                          placeholder="Password"
                          value="admin1"
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
                      name="timefrom"
                      control={control}
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Shift Timings From*"
                          type="time"
                          error={errors.timefrom?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Shift Timings To*"
                          type="time"
                          error={errors.timeto?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Department*"
                          error={errors.department?.message}
                          disabled={!inputAbled}
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
                      name="lineManager"
                      control={control}
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
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Designation*"
                          error={errors.designation?.message}
                          disabled={!inputAbled}
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
                      {/* {daysOfWeek.map((day) => (
                        <CustomCheckbox
                          key={day}
                          label={day}
                          selected={selectedDays.includes(day)}
                          onChange={handleDayChange}
                        />
                      ))} */}
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
                      render={({ field }) => (
                        <CustomSelectForRole
                          label="HOD*"
                          height={"66px"}
                          options={[
                            { value: "bial", label: "Bila Tunio" },
                            { value: "saraang", label: "Saraang Ali Khawaja" },
                            { value: "shameekh", label: "Syed Shameekh" },
                            { value: "muzammil", label: "Muzammil Ahmed" },
                          ]}
                          value={field.value}
                          handleChange={field.onChange}
                          error={errors.hod?.message}
                          disabled={!inputAbled}
                        />
                      )}
                    />
                  </Typography>
                </Box>
              </Box>

              {/* Lower Group: Shift Duration, Joining Date, etc. */}
              <Box
                sx={{
                  boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)", // Converted from Figma
                  borderRadius: "9px",
                  p: "26px 23px",
                  mt: "20px",
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
                      name="totalShiftDuration"
                      control={control}
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Total Shift Duration*"
                          type="text"
                          error={errors.totalShiftDuration?.message}
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
                      name="joiningDate"
                      control={control}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Duration*"
                          type="text"
                          error={errors.duration?.message}
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
                      name="role"
                      control={control}
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
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Annual Leaves*"
                          error={errors.annualLeaves?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomInputLabel
                          label="Net Salary"
                          error={errors.netSalary?.message}
                          disabled={!inputAbled}
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
                      name="locaionType"
                      control={control}
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
                          error={errors.locaionType?.message}
                          disabled={!inputAbled}
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
                          error={errors.onProbation?.message}
                          disabled={!inputAbled}
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
                      render={({ field }) => (
                        <CustomSelectForRole
                          label="Employeement Type"
                          height={"66px"}
                          options={[
                            { value: "partTime", label: "Part Time" },
                            { value: "fullTime", label: "Full Time" },
                            { value: "remote", label: "Remote" },
                          ]}
                          value={field.value}
                          handleChange={field.onChange}
                          error={errors.employementType?.message}
                          disabled={!inputAbled}
                        />
                      )}
                    />
                  </Typography>
                </Box>
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
                  disabled={!inputAbled}
                />
              </Box>
            </>
          )}
        </form>
        <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
          <Button
            color="info"
            variant="outlined"
            onClick={() => setInputAbled(!inputAbled)}
          >
            Change Info
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
