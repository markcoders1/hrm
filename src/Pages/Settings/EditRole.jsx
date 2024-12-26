import React, { useEffect } from "react";
import { Box, Tooltip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Fetch role details by ID
const fetchRoleData = async (roleId) => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/roles/${roleId}`);
  console.log(response?.data?.role);
  return response?.data?.role;
};

// Fetch available permissions
const fetchPermissionsData = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/data`);
  return response?.data?.permissions;
};

const EditRole = () => {
  const { roleId } = useParams(); // Assuming roleId is passed in the route
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setHeadertext("Edit Role");
    setParaText("");
  }, [setHeadertext]);

  // Fetch role details using TanStack Query
  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["roleResponse", roleId],
    queryFn: () => fetchRoleData(roleId),
    enabled: !!roleId,
    onSuccess: (data) => {
      // Prepopulate form with fetched role data
      
      reset({
        roleName: data.name,
        permissions: data.permissions.reduce((acc, perm) => {
          acc[perm] = true; 
          return acc;
        }, {}),
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching role data.");
    },
  });


  const { data: permissionsDataArray, isLoading: permissionsLoading } = useQuery({
    queryKey: ["rolePermission"],
    queryFn: fetchPermissionsData,
    staleTime: 600000,
    onError: (error) => {
      console.error(error);
      toast.error("Error fetching permissions data.");
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data); // Log form data to ensure correctness
    const requestData = {
      name: data.roleName,
      permissions: Object.keys(data.permissions).filter((key) => data.permissions[key]),
    };
    console.log("Request Data:", requestData); // Log request data
  };

  if (roleLoading || permissionsLoading) {
    return <Typography>Loading...</Typography>;
  }

  const permissions = permissionsDataArray || [];

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
                  label="Role Name"
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

        <Typography sx={{ fontWeight: "600", fontSize: "30px", color: "#010120" }}>
          Module Access
        </Typography>
        <Box sx={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {permissions?.map((module, index) => (
            <Box key={index} sx={{ flexBasis: "33%" }}>
              <Controller
                name={`permissions.${module}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label={module}
                    sx={{ color: "#010120", fontWeight: "500", fontSize: "22px" }}
                  />
                )}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Update Role">
            <CustomButton
              ButtonText="Update"
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

export default EditRole;
