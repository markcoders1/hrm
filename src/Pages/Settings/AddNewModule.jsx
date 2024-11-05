import React, { useEffect } from "react";
import { Box, Button, Tooltip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AddNewModule = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadertext("Edit/ Add New Module");
    setParaText("");
  }, [setHeadertext]);

  const onSubmit = async (data) => {
    console.log(data)
    // try {
    //   const response = await axiosInstance({
    //     url: `${apiUrl}/api/wfh`,
    //     method: "post",
    //     data: data,
    //   });

    //   console.log(response.data);
    //   toast.success(response.data.message, { position: "top-center" });
    //   reset();
    //   navigate(-1);
    // } catch (error) {
    //   console.error("Error posting user data:", error);
    //   toast.error(error.response.data.message);
    // }
  };

  const moduleOptions = [
    "Admin",
    "Team Lead",
    "Human Resources",
    "Employees/ User",
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "0px" }}>
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap",}}>
          <Controller
            name="moduleName"
            control={control}
            defaultValue=""
            rules={{ required: "New Module Name is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="New Module Name"
                  id="moduleName"
                  error={errors.moduleName?.message}
                  {...field}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              </Box>
            )}
          />
        </Box>

        <Typography sx={{ fontWeight:"600", fontSize:"30px", color:"#010120", }}>Roles To Access</Typography>
        <Box sx={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {moduleOptions.map((module, index) => (
            <Box
           sx={{
            flexBasis:"24%",
         
           }} 
            >
            <Controller
              key={index}
              name={`moduleAccess[${module}]`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="primary" />}
                  label={module}
                  sx={{
                    color:"#010120",
                    fontWeight:"500 !important",
                    fontSize:"22px"
                  }}
                />
              )}
            />
            </Box>
          ))}
        </Box>

        <Controller
          name="moduleDescriprion"
          control={control}
          defaultValue=""
          rules={{ required: "Module Description is required" }}
          render={({ field }) => (
            <CustomInputLabel
              label="Module Description"
              multiline
              error={errors.moduleDescriprion?.message}
              {...field}
              height="200px"
              paddingInput="7px 5px"
            />
          )}
        />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Submit Role">
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
              width="189px"
              borderRadius="7px"
            />
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewModule;
