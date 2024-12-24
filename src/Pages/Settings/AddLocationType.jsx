import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddLocationtype = () => {
  const { state } = useLocation();
  const [id, setId] = useState(null);
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize queryClient
  
  let dataToSend;
  const [formValues, setFormValues] = useState({
    value: "",
    description: "",
  });

  useEffect(() => {
    if (state) {
      setHeadertext("Edit Location Type");
      setFormValues({
        value: state.value || "",
        description: state.description || "",
      });
      setId(state._id || "");
    } else {
      setHeadertext("Add New Location Type");
    }
    setParaText("");
  }, [state, setHeadertext, setParaText]);

  // Mutation for adding a new Location Type
  const addMutation = useMutation({
    mutationFn: async (newData) => {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/settings/dropdown`,
        method: "post",
        data: newData,
      });
      return response;
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/dropdown`);
      const updatedData = response?.data?.dropDownValues;
      queryClient.setQueryData(["settingsData"], updatedData);
      toast.success("Location Type Added Successfully");
      setFormValues({
        value: "",
        description: "",
      }); // Reset form after submission
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });

  // Mutation for updating an existing Location Type
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/settings/dropdown/${id}`,
        method: "put",
        data: updatedData,
      });
      return response;
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/dropdown`);
      const updatedData = response?.data?.dropDownValues;
      queryClient.setQueryData(["settingsData"], updatedData);
      toast.success("Location Type Updated Successfully");
      // navigate(-1); // Go back after update
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  const onSubmit = () => {
    const dataToSend = {
      list: "location",
      value: formValues.value,
      description: formValues.description,
    };

    // If editing, include the id in the request
    if (state && state._id) {
      updateMutation.mutate(dataToSend); // Call the update mutation for editing
    } else {
      addMutation.mutate(dataToSend); // Call the add mutation for adding a new item
    }
  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{
          padding: "0px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", mb: 4 }}>
          <Box sx={{ position: "relative", flex: "1 1 100%" }}>
            <CustomInputLabel
              label="Location Type"
              id="value"
              value={formValues.value}
              onChange={(e) =>
                setFormValues({ ...formValues, value: e.target.value })
              }
              height={{ xl: "64px", md: "45px" }}
              paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
              required
            />
          </Box>
        </Box>

        <CustomInputLabel
          label="Roles and Responsibilities"
          multiline
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          height="200px"
          paddingInput="7px 0px"
          required
        />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title={state ? "Update Location Type" : "Request New Location Type"}>
            <CustomButton
              ButtonText={state ? "Update" : "Submit"}
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
              width={"189px"}
              borderRadius="7px"
            />
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default AddLocationtype;
