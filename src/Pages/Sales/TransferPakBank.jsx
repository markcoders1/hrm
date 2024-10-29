import React, { useEffect } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import CustomButton from "../../components/CustomButton/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import CustomSelectForType from "../../components/CustomSelect/CustomSelect";
import { toast } from "react-toastify";
import CustomSelectForRole from "../../components/CustomSelectForRole/CustomSelectForRole";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const TransferToPakBank = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHeadertext, setParaText } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadertext("Transfer to Pakistan Bank");
    setParaText("");
  }, [setHeadertext]);

  const bankName = [];

  const onSubmit = async (data) => {
    const dateTimestamp = new Date(data.date).getTime();

    const formData = {
      ...data,
      date: dateTimestamp,
    };

    console.log("Form Data with Unix Timestamp:", formData);

    // try {
    //   const response = await axiosInstance({
    //     url: `${apiUrl}/api/wfh`,
    //     method: "post",
    //     data: {
    //       date: formData.date,
    //       comment: formData.description,
    //     },
    //   });

    //   console.log(response.data);
    //   toast.success(response.data.message, { position: "top-center" });
    //   reset();
    //   navigate(-1);
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "0px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px",}}>
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            rules={{ required: "Amount is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="Amount"
                  id="amount"
                  error={errors.amount?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            rules={{ required: "Amount is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="Deduction (if any)"
                  id="amount"
                  error={errors.amount?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            rules={{ required: "Amount is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="Transaction Rates"
                  id="amount"
                  error={errors.amount?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />
        </Box>
        <Box
        sx={{
            display:"flex",  gap:"20px"
        }}
        >
            <Box
            sx={{
                flexBasis:"66%"
            }}
            >

          <Controller
            name="bankName"
            control={control}
            defaultValue=""
            rules={{ required: "Bank Name is Required" }}
            render={({ field }) => (
              <CustomSelectForRole
                label="Choose Bank"
                height={{ xl: "76px !important", md: "58px !important" }}
                options={[
                  { value: "meezanBank", label: "Meezan Bank" },
                  {
                    value: "standardChartered",
                    label: "Standard Chartered Bank",
                  },
                ]}
                value={field.value}
                handleChange={field.onChange}
                error={errors.bankName?.message}
              />
            )}
          />
            </Box>
            <Box
            sx={{
                flexBasis:"32%"
            }}
            >

          <Controller
            name="accountTitle"
            control={control}
            defaultValue=""
            rules={{ required: "Account Title is Required" }}
            render={({ field }) => (
              <Box sx={{ position: "relative", flex: "1 1 100%" }}>
                <CustomInputLabel
                  label="Account Title"
                  id="amount"
                  error={errors.accountTitle?.message}
                  {...field}
                  height="64px"
                />
              </Box>
            )}
          />
            </Box>

        </Box>

        <Controller
          name="accountNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <CustomInputLabel
              label="Roles and Responsibilities"
             
              error={errors.accountNumber?.message}
              {...field}
              height="64px"
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

export default TransferToPakBank;
