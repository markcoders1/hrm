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

const AddLeaveType = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadertext("Add New Leave Type");
    setParaText("");
  }, [setHeadertext]);

  const onSubmit = async (data) => {
    const dateTimestamp = new Date(data.date).getTime();

    const formData = {
      ...data,
      date: dateTimestamp,
    };

    console.log("Form Data with Unix Timestamp:", formData);

    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/wfh`,
        method: "post",
        data: {
          date: formData.date,
          comment: formData.description,
        },
      });

      console.log(response.data);
      toast.success(response.data.message, { position: "top-center" });
      reset();
      navigate(-1);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response.data.message);
    }
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
            name="leaveType"
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
          name="leaveDescription"
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
