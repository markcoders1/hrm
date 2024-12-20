import React, { useEffect } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useMutation, useQueryClient } from "@tanstack/react-query";


const AddLeaveType = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();
    const queryClient = useQueryClient(); // Initialize queryClient
  
  let dataToSend;


  useEffect(() => {
    setHeadertext("Add New Leave Type");
    setParaText("");
  }, [setHeadertext]);

  const addMutation = useMutation({
    mutationFn: async (newData) => {
      console.log(newData)
      const response = await axiosInstance({
        url : `${apiUrl}/api/admin/settings/dropdown`,
        method:"post",
        data:newData
      })
    
    
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/dropdown`);
      const updatedData = response?.data?.dropDownValues;
      queryClient.setQueryData(["settingsData"], updatedData);
      toast.success("Leave Type Added Successfully");
      reset();
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    dataToSend = {
      list : "leavesType",
      value : data.value,
      description : data.description,
    } 
    addMutation.mutate(dataToSend); 
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "0px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", mb: 4 }}>
          <Controller
            name="value"
            control={control}
            defaultValue=""
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="New Employement Type"
                  id="date"
                  error={errors.date?.message}
                  {...field}
                  height={{ xl: "64px", md: "45px" }}
                  paddingInput={{ xl: "21px 10px", md: "13px 8px" }}
                />
              </Box>
            )}
          />
        </Box>

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <CustomInputLabel
              label="Leave Details"
              multiline
              error={errors.description?.message}
              {...field}
              height="200px"
              paddingInput="7px 5px"

            />
          )}
        />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
          <Tooltip title="Request New WFH">
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
              width={"189px"}
              borderRadius="7px"
            />
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default AddLeaveType;
