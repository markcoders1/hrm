import React, { useEffect } from "react";
import {
  Box,
  Button,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import VirtualizedSelect from "../../components/VirtualizedSelect/VirtualizedSelect";



const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const fetchRolesId = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/data`);
  console.log("=======>", response);
  return response?.data?.roles;
};

const fetchModulesToAdd = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/modules`);
  console.log("=======>", response);
  return response;
};

const AddNewModule = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
    const queryClient = useQueryClient(); // Initialize queryClient
  

  useEffect(() => {
    setHeadertext("Edit/ Add New Module");
    setParaText("");
  }, [setHeadertext]);

  const { data: modulesAdd, isPending: modulesPending } = useQuery({
    queryKey: ["modulesAdditionData"],
    queryFn: () => fetchModulesToAdd(),
    staleTime: 600000,
    keepPreviousData: true,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching Roles data.");
    },
  });



  const { data: rolesData, isPending: rolesPending } = useQuery({
    queryKey: ["rolesId"],
    queryFn: () => fetchRolesId(),
    staleTime: 600000,
    keepPreviousData: true,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching Roles data.");
    },
  });
  const addMutation = useMutation({
    mutationFn: async (newData) => {
      console.log(newData);
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/settings/modules`,
        method: "post",
        data: newData,
      });
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/settings/general`
      );
      const updatedData = response?.data.data.settings.modules;
      queryClient.setQueryData(["companyData"], updatedData);
      toast.success("New Role Added Successfully");
      reset();
      navigate(-1);
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const roles = Object.keys(data.moduleAccess)
    .filter((key) => data.moduleAccess[key]); // Filter selected roles (_id only)

    const dataToSend = {
      mod: data.moduleName,
      roles: roles
    }
    addMutation.mutate(dataToSend);

  console.log(Array.isArray(roles));
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

  
  if (rolesPending) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "0px" }}>
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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
        <Box>
            <Controller
              name="secondaryCurrency"
              control={control}
              
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

        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "30px",
            color: "#010120",
            mt: "0px",
          }}
        >
          Roles To Access
        </Typography>
        <Box sx={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {rolesData?.map((module, index) => (
            <Box
              sx={{
                flexBasis: {
                  sm: "24%",
                  xs: "100%",
                },
              }}
              key={index}
            >
              <Controller
                name={`moduleAccess[${module._id}]`}
                control={control}
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={module?.name}
                    sx={{
                      color: "#010120",
                      fontWeight: "500 !important",
                      fontSize: "22px",
                    }}
                  />
                )}
              />
            </Box>
          ))}
        </Box>
        {/* <Box
sx={{
  mt:"30px"
}}
>

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
</Box> */}

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
