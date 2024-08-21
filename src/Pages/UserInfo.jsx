import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/UserInfo.css";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import CustomSelectForType from "../components/CustomSelect/CustomSelect";
import CustomButton from "../components/CustomButton/CustomButton";
import { Loader } from "../components/Loaders";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserInfo = () => {
  const setHeadertext = useOutletContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [inputAbled, setInputAbled] = useState(false);
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setHeadertext('Employee Data');
    const getSpecificUser = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getUser`,
          method: "get",
          params: { id },
        });
        const dataAllEmployee = response.data.user;

         // Pre-process the DOB to match the required date input format
         if (dataAllEmployee.DOB) {
            const date = new Date(dataAllEmployee.DOB);
            const formattedDate = date.toISOString().split('T')[0]; // Converts to 'yyyy-MM-dd' format
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
      <Box className="form-register">
        <form onSubmit={handleSubmit(onSubmit)}>
          {loading ? (
            <Box className="loaderContainer">
              <Loader />
            </Box>
          ) : (
            <>
              <Box
                sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}
              >
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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

              <Box sx={{ mb: "20px" }}>
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column" }}>
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
              </Box>

              <Box
                sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}
              >
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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

                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}
              >
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
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}
              >
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
                  <Controller
                    name="role"
                    control={control}
                  
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
                        disabled={!inputAbled}
                      />
                    )}
                  />
                </Typography>
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
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
              </Box>

              <Box
                sx={{ display: "flex", gap: "20px", mb: "20px", flexDirection: { md: "row", xs: "column" } }}
              >
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
                  <Controller
                    name="hod"
                    control={control}
                    render={({ field }) => (
                      <CustomInputLabel
                        label="HOD*"
                        error={errors.hod?.message}
                        disabled={!inputAbled}
                        {...field}
                      />
                    )}
                  />
                </Typography>
                <Typography sx={{ display: "flex", gap: "5px", flexDirection: "column", flexBasis: "33%" }}>
                  <Controller
                    name="teamLead"
                    control={control}
                    render={({ field }) => (
                      <CustomInputLabel
                        label="Team Lead"
                        error={errors.teamLead?.message}
                        disabled={!inputAbled}
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
                  disabled={!inputAbled}
                />
              </Box>
            </>
          )}
        </form>
        <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
          <Button color="info" variant="outlined" onClick={() => setInputAbled(!inputAbled)}>
            Change Info
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
