import React, { useEffect, useState } from "react";
import { Box, Tooltip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SpinnerLoader from "../../components/SpinnerLoader";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Fetch role details by ID
const fetchRoleData = async (roleId) => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/roles/${roleId}`);
  return response?.data?.role;
};

// Fetch available permissions
const fetchPermissionsData = async () => {
  const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/data`);
  return response?.data?.permissions;
};

const updateRoleData = async ({ roleId, requestData }) => {
  const response = await axiosInstance.put(`${apiUrl}/api/admin/settings/roles/${roleId}`, requestData);
  return response.data;
};

const EditRole = () => {
  const { roleId } = useParams();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);

  useEffect(() => {
    setHeadertext("Edit Role");
    setParaText("");

    // Fetch role data
    fetchRoleData(roleId).then((data) => {
      setRoleName(data.name);
      const initialPermissions = data.permissions.reduce((acc, perm) => {
        acc[perm] = true;
        return acc;
      }, {});
      setPermissions(initialPermissions);
    });

    // Fetch all permissions
    fetchPermissionsData().then(setAllPermissions);
  }, [roleId, setHeadertext, setParaText]);

  const handlePermissionChange = (module) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module]: !prevPermissions[module],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      name: roleName,
      permissions: Object.keys(permissions).filter((key) => permissions[key]),
    };
    console.log(requestData);

    // Send update request
    updateRoleData({ roleId, requestData })
      .then(() => {
        toast.success("Role updated successfully!");
        queryClient.invalidateQueries(["roleResponse", roleId]);
        navigate(-1);
      })
      .catch(() => {
        toast.error("Error updating role.");
      });
  };

  if (!roleName || allPermissions.length === 0) {
    return <SpinnerLoader></SpinnerLoader>;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ padding: "0px" }}>
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Box sx={{ position: "relative", flex: "1 1 100%" }}>
            <CustomInputLabel
              label="Role Name"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              height={{ xl: "64px", md: "45px" }}
              paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
            />
          </Box>
        </Box>

        <Typography sx={{ fontWeight: "600", fontSize: "30px", color: "#010120" }}>
          Module Access
        </Typography>
        <Box sx={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {allPermissions.map((module, index) => (
            <Box key={index} sx={{ flexBasis: "33%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions[module] || false}
                    onChange={() => handlePermissionChange(module)}
                    color="primary"
                  />
                }
                label={module}
                sx={{ color: "#010120", fontWeight: "500", fontSize: "22px" }}
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
