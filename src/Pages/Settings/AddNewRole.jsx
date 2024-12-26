import React, { useEffect } from "react";
import { Box, Button, Tooltip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SpinnerLoader from "../../components/SpinnerLoader";


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const fetchPermissionsData = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/data`);
  return response?.data?.permissions; // Current assumption: permissions is a string array
};


const permissionToText = (permission) => {
  const actionMap = {
    C: 'Create',
    D: 'Delete',
    U: 'Update',
    R: 'Read',
    P: 'Personal',  // Personal should be treated differently depending on context
    A: 'All',       // All can be part of the resource
    N: 'Now'        // Now can be part of the resource
  };

  // Split permission by hyphen to separate action part and resource part
  const parts = permission.split('-');

  // Map all parts, including action and resource parts, and capitalize each word
  const mappedParts = parts.map(part => {
    // Split each part into components that can be mapped using the actionMap
    return part.split(/(?=[A-Z])/).map(subPart => {
      const fullText = actionMap[subPart] || subPart;  // Map or leave as is
      return fullText.charAt(0).toUpperCase() + fullText.slice(1);  // Capitalize first letter
    }).join(" ");
  });

  // Join all parts back together to form the final permission string
  return mappedParts.join(" ").trim();
};



const AddNewRole = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize queryClient


  useEffect(() => {
    setHeadertext("Edit / Add New Role");
    setParaText("");
  }, [setHeadertext]);

  const addMutation = useMutation({
    mutationFn: async (newData) => {
      console.log(newData);
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/settings/roles`,
        method: "post",
        data: newData,
      });
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(
        `${apiUrl}/api/admin/settings/roles`
      );
      const updatedData = response?.data;
      queryClient.setQueryData(["settingsData"], updatedData);
      toast.success("New Role Added Successfully");
      reset();
      navigate(-1);
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });

  const onSubmit = (data) => {
    const requestData = {
      name: data.roleName,
      permissions: Object.keys(data.permissions).filter((key) => data.permissions[key]),
    };
    console.log(requestData);
      addMutation.mutate(requestData);
 
  };


  // const onSubmit = async (data) => {
  //   const requestData = {
  //     name: data.roleName,
  //     permissions: Object.keys(data.permissions).filter((key) => data.permissions[key]),
  //   };
  //   console.log(requestData);

  //   try {
  //     const response = await axiosInstance.post(`${apiUrl}/api/admin/settings/roles`, requestData);
  //     toast.success("Role created successfully!");
  //     console.log(response);
  //     reset();
   
  //   } catch (error) {
  //     console.error("Error posting role data:", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  const { data: permissionsDataArray, isPending } = useQuery({
    queryKey: ["permissionsData"],
    queryFn: fetchPermissionsData,
    staleTime: 600000,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching permissions data.");
    },
  });

  const permissions = permissionsDataArray || [];

  if (isPending) {
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
            name="roleName"
            control={control}
            defaultValue=""
            rules={{ required: "Role Name is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="New Role Name"
                  id="roleName"
                  error={errors.roleName?.message}
                  {...field}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              </Box>
            )}
          />
        </Box>

        <Typography sx={{ fontWeight: "600", fontSize: "30px", color: "#010120", mt:"20px" }}>
          Module Access
        </Typography>
        <Box sx={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {permissions.map((module, index) => (
            <Box key={index} sx={{ flexBasis: "33%" }}>
              <Controller
                name={`permissions.${module}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label={permissionToText(module)}  // Convert short code to full text
                    sx={{ color: "#010120", fontWeight: "500", fontSize: "22px" }}
                  />
                )}
              />
            </Box>
          ))}
        </Box>

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

export default AddNewRole;
