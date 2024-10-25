import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/UserInfo.css";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import CustomSelectForRole from "../components/CustomSelectForRole/CustomSelectForRole";
import CustomButton from "../components/CustomButton/CustomButton";
import { Loader, LoaderW } from "../components/Loaders";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FileUpload from "../components/FileUpload/FileUpload";
import SpinnerLoader from "../components/SpinnerLoader";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserInfo = () => {
  const { setHeadertext } = useOutletContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingUpdate , setLoadingUpdate] =  useState(false)
  const [hods, setHods] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [inputAbled, setInputAbled] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [image, setImage] = useState();
  const [shiftDuration, setShiftDuration] = useState("");

  const { watch } = useForm();

  const [userActive, setUserActive] = useState(null);
  const [loadingToggleAccount, setLoadingToggleAccount] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    emergencyContactNumber: "",
    CNIC: "",
    DOB: "",
    companyId: "",
    shiftTimingFrom: "",
    shiftTimingTo: "",
    department: "",
    teamLeadID: "",
    designation: "",
    workDays: [],
    HODID: "",

    joiningDate: "",
    mobileAllowance: "",
    internetAllowance: "",
    role: "",
    annualLeaves: "",
    basicSalary: "",
    locationType: "",
    onProbation: "",
    employmentType: "",
    documents : {
      CNICFront: "",
      CNICBack: "",
      EducationalCert: "",
      EmploymentLetter: "",
      Payslip: "",
      photograph: "",
      resume: "",
    }
  });

  const daysOfWeek = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 0 },
  ];

  useEffect(() => {
    setHeadertext("Edit User");
    const getSpecificUser = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getUser`,
          method: "get",
          params: { id },
        });
        const dataAllEmployee = response.data.user;
        setImage(dataAllEmployee.image);
        setUserActive(dataAllEmployee.active);
        const totalShiftDuration = calculateShiftDuration(
          dataAllEmployee.shiftTimingFrom,
          dataAllEmployee.shiftTimingTo
        );

        const joiningDuration = calculateDurationFromJoiningDate(
          dataAllEmployee.joiningDate
        );

        setFormData({
          fullName: dataAllEmployee.fullName || "",
          phone: dataAllEmployee.phone || "",
          email: dataAllEmployee.email || "",
          address: dataAllEmployee.address || "",
          emergencyContactNumber: dataAllEmployee.emergencyNumber || "",
          CNIC: dataAllEmployee.CNIC || "",
          DOB: dataAllEmployee.DOB
            ? new Date(dataAllEmployee.DOB).toLocaleDateString("en-CA")
            : "",
          companyId: dataAllEmployee.companyId || "",
          shiftTimingFrom: dataAllEmployee.shiftTimingFrom
            ? unixToTimeInput(dataAllEmployee.shiftTimingFrom)
            : "",
          shiftTimingTo: dataAllEmployee.shiftTimingTo
            ? unixToTimeInput(dataAllEmployee.shiftTimingTo)
            : "",
          department: dataAllEmployee.department || "",
          teamLeadID: dataAllEmployee.teamLeadID || "",
          designation: dataAllEmployee.designation || "",
          workDays: dataAllEmployee.workDays || [],
          HODID: dataAllEmployee.HODID || "",

          joiningDate: dataAllEmployee.joiningDate
            ? new Date(dataAllEmployee.joiningDate).toLocaleDateString("en-CA")
            : "",

          role: dataAllEmployee.role || "",
          annualLeaves: dataAllEmployee.annualLeaves || "",
          basicSalary: dataAllEmployee?.basicSalary,
          locationType: dataAllEmployee.locationType || "",
          onProbation: dataAllEmployee.onProbation || "",
          employmentType: dataAllEmployee.employmentType || "",
          internetAllowance: dataAllEmployee?.internetAllowance,
          mobileAllowance: dataAllEmployee?.mobileAllowance,
          commuteAllowance: dataAllEmployee?.commuteAllowance,
          bank: dataAllEmployee.bank || "",
          BAN: dataAllEmployee.BAN || "",
          BAT: dataAllEmployee.BAT || "",

          // documents
          documents : {

            CNICFront: dataAllEmployee?.documents?.CNICFront || "",
            CNICBack: dataAllEmployee?.documents?.CNICBack || "",
            EducationalCert: dataAllEmployee?.documents?.EducationalCert || "",
            EmploymentLetter: dataAllEmployee?.documents?.EmploymentLetter || "",
            Payslip: dataAllEmployee?.documents?.Payslip || "",
            photograph: dataAllEmployee?.documents?.photograph || "",
            resume: dataAllEmployee?.documents?.resume || "",
          }
        });

        console.log(response);

        if (dataAllEmployee.workDays) {
          setSelectedDays(
            dataAllEmployee.workDays.map((day) =>
              daysOfWeek.find((d) => d.value === Number(day))
            )
          );
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSpecificUser();
  }, [id]);

  const fetchPreDataToShow = async () => {
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getRegisterDetails`,
        method: "get",
      });
      setTeamLeads(response.data.TL);
      setHods(response.data.HOD);
      setDepartments(response.data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPreDataToShow();
  }, []);

  const handleDayChange = (day) => {
    setSelectedDays((prevSelected) => {
      const days = prevSelected.map((d) => d.value);
      return days.includes(day.value)
        ? prevSelected.filter((d) => d.value !== day.value)
        : [...prevSelected, day];
    });
  };

  const calculateShiftDuration = (from, to) => {
    const fromDate = new Date(from * 1000);
    const toDate = new Date(to * 1000);
    const durationInMs = toDate - fromDate;

    const durationInHours = durationInMs / (1000 * 60 * 60);
    return durationInHours.toFixed(2) + " hours";
  };

  const calculateDurationFromJoiningDate = (joiningDate) => {
    const joinDate = new Date(joiningDate * 1000);
    const now = new Date();
    const durationInMs = now - joinDate;
    const durationInDays = durationInMs / (1000 * 60 * 60 * 24);
    return durationInDays.toFixed(0) + " days";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const shiftTimeFromUnix = convertTimeToUnixTimestamp(
      formData.shiftTimingFrom
    );
    const shiftTimeToUnix = convertTimeToUnixTimestamp(formData.shiftTimingTo);

    const joiningDate = convertDateToUnixTimestamp(formData.joiningDate);
    const DOB = convertDateToUnixTimestamp(formData.DOB);

    console.log(joiningDate);

    // console.log(formData)
    console.log(id);
    setLoadingUpdate(true)
    try {
      setLoadingUpdate(true)

      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/update-any-profile`,
        method: "post",
        data: {
          ...formData,
          shiftTimingFrom: shiftTimeFromUnix,
          shiftTimingTo: shiftTimeToUnix,
          joiningDate: +joiningDate,
          DOB: DOB.toString(),  
          id: id,
        },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoadingUpdate(false)

      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message[0].message, {
        position: "top-center",
      });
      setLoadingUpdate(false)
    }
  };

  function unixToTimeInput(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function convertTimeToUnixTimestamp(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // use setHours instead of setUTCHours for local time
    return Math.floor(date.getTime() / 1000);
  }

  function timeToUnixTimestamp(timeString) {
    // Split the timeString into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Create a new Date object for today's date
    const now = new Date();
    now.setHours(hours, minutes, seconds, 0); // Set time, reset milliseconds to 0

    // Return the Unix timestamp in milliseconds
    return now.getTime();
  }

  // Example usage:
  const timestamp = timeToUnixTimestamp("14:30:00");
  // console.log(timestamp);

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function convertDateToUnixTimestamp(dateString) {
    if (!dateString) return null; // Handle empty input

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return null; // Handle invalid date
    }

    return date.getTime(); // Returns the Unix timestamp in milliseconds
  }

  const formatName = (fullName) => {
    const name = fullName.toLowerCase().includes("muhammad")
      ? fullName.replace(/wildcard|muhammad/i, "M.")
      : fullName;
    return name;
  };

  // toggle user Account function
  const ToggleUserStatus = async () => {
    setLoadingToggleAccount(true);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/toggleUserAccount`,
        method: "get",
        params: {
          userId: id,
        },
      });
      console.log(response);
      toast.success(response.data.message, { position: "top-center" });
      setUserActive(!userActive);
      setLoadingToggleAccount(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, { position: "top-center" });
      setLoadingToggleAccount(false);
    }
  };

  // const calculateShiftDuration = (fromTime, toTime) => {
  //   if (!fromTime || !toTime) return "";

  //   console.log(fromTime, toTime);

  //   const from = new Date(`1970-01-01T${fromTime}:00Z`);

  //   const to = fromTime.slice(0,2)>toTime.slice(0,2)? new Date(`1970-01-02T${toTime}:00Z`): new Date(`1970-01-01T${toTime}:00Z`);

  //   const totalMinutes = Math.abs(differenceInMinutes(from, to));

  //   // Calculate hours and minutes
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;

  //   return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
  //     minutes !== 1 ? "s" : ""
  //   }`;
  // };

  const handleShiftTimingChange = () => {
    const shiftFrom = watch("shiftTimingFrom");
    const shiftTo = watch("shiftTimingTo");
    setShiftDuration(calculateShiftDuration(shiftFrom, shiftTo));
  };

  

  useEffect(() => {
    handleShiftTimingChange();
    console.log(shiftDuration);
  }, [watch("shiftTimingFrom"), watch("shiftTimingTo")]);

  return (
    <Box
      className="form-container-register"
      sx={{
        flexDirection: "column !important",
        padding:"0px !important",
   

      }}
    >
      <Box
        sx={{
          border: "1px dashed rgba(197, 197, 197, 0.6)",
          width: { lg: "517px", xs: "100%" },
          p: { xs: "1rem 1rem", sm: "1rem 1rem" },
          borderRadius: "7px",
          position: { lg: "absolute", xs: "static" },
          right: "35px",
          top: "20px",
          zIndex: "1000000000 !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <img
            src={image}
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
            alt=""
          />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            {formatName(formData.fullName)}
          </Typography>
        </Box>
        <Typography>
          <CustomButton
            ButtonText={
              loadingToggleAccount ? (
                <>
                  <LoaderW />
                </>
              ) : userActive ? (
                "Deactivate"
              ) : (
                "Activate"
              )
            }
            fontSize="14px"
            color="rgba(49, 186, 150, 1)"
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            background="transparent"
            hoverBg="#157AFF"
            border="1px solid rgba(49, 186, 150, 1)"
            hoverBorder="none"
            hovercolor="white"
            width={"124px"}
            borderRadius="7px"
            height="38px"
            onClick={ToggleUserStatus}
          />
        </Typography>
      </Box>
      <Box className="form-register" sx={{ mt: "40px", padding:"0px !important" }}>
        <form onSubmit={onSubmit} style={{ padding:"0px"}} >
          {loading ? (
            <Box className="loaderContainer">
              <SpinnerLoader />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  mb: "40px",
                  boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)",
                  borderRadius: "9px",
                  p: "26px 23px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Full Name*"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Phone Number*"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    mb: "20px",
                    display: "flex",
                    gap: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Address*"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Emergency Number*"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="CNIC*"
                    name="CNIC"
                    value={formData.CNIC}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Date Of Birth*"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    type="date"
                  />
                  <CustomInputLabel
                    label="Company Id*"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Password"
                    onChange={handleChange}
                    disabled={true}
                  />

                  <CustomInputLabel
                    label="Shift Timing From"
                    name="shiftTimingFrom"
                    value={formData.shiftTimingFrom}
                    onChange={handleChange}
                    type="time"
                  />
                  <CustomInputLabel
                    label="Shift Timing To"
                    name="shiftTimingTo"
                    value={formData.shiftTimingTo}
                    onChange={handleChange}
                    type="time"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomSelectForRole
                    label="Department"
                    name="department"
                    height={"66px"}
                    options={departments.map((depart) => ({
                      value: depart,
                      label: depart,
                    }))}
                    value={formData.department}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        department: selectedValue,
                      }))
                    }
                  />

                  <CustomSelectForRole
                    label="Line Manager"
                    name="teamLeadID"
                    options={teamLeads.map((tl) => ({
                      value: tl.id,
                      label: tl.fullName,
                    }))}
                    height={"66px"}
                    value={formData.teamLeadID}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        teamLeadID: selectedValue,
                      }))
                    }
                  />
                  <CustomInputLabel
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <Box sx={{ flexBasis: "32.5%" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#9E9E9E",
                        position: "absolute",
                        top: "0px",
                        left: "10px",
                        backgroundColor: "white",
                        padding: "0 10px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      Working Days
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        mt: "20px",
                        flexWrap: "wrap",
                        justifyContent: "start",
                        flexBasis: "33",
                      }}
                    >
                      <Box
                        sx={{
                          flexBasis: "32.5%",
                          display: "flex",
                          gap: "0.7rem",
                        }}
                      >
                        {daysOfWeek.map((day) => (
                          <CustomCheckbox
                            key={day.label}
                            label={day.label}
                            selected={selectedDays.some(
                              (selected) => selected?.value === day?.value
                            )}
                            onChange={() => handleDayChange(day)}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flexBasis: "32.2%",
                    }}
                  >
                    <CustomSelectForRole
                      label="HOD*"
                      height={"66px"}
                      name="HODID"
                      options={hods.map((hod) => ({
                        value: hod.id,
                        label: hod.fullName,
                      }))}
                      value={formData.HODID} // Use HODID as the value since you want to send the id
                      onChange={(selectedValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          HODID: selectedValue, // Set the id here
                        }))
                      }
                      displayValue={
                        hods.find((hod) => hod.id === formData.HODID)
                          ?.fullName || ""
                      }
                    />
                  </Box>
                </Box>
              </Box>

              {/* Lower Group: Shift Duration, Joining Date, etc. */}
              <Box
                sx={{
                  boxShadow: "0px 0px 13px rgba(101, 101, 101, 0.25)",
                  borderRadius: "9px",
                  p: "26px 23px",
                  mt: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Total Shift Duration*"
                    name="totalShiftDuration"
                    value={shiftDuration}
                    // onChange={handleChange}
                    border={false}
                    disabled={false}
                  />
                  <CustomInputLabel
                    label="Joining Date*"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Duration*"
                    name="duration"
                    value={formData.duration}
                    // onChange={handleChange}
                    border={false}
                    disabled={false}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomSelectForRole
                    label="User Role"
                    height={"66px"}
                    name="role"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "hr", label: "HR" },
                    ]}
                    value={formData.role}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: selectedValue,
                      }))
                    }
                  />
                  <CustomInputLabel
                    label="Annual Leaves*"
                    name="annualLeaves"
                    value={formData.annualLeaves}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Net Salary*"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: { md: "row", xs: "column" },
                    position: "relative",
                  }}
                >
                  <CustomSelectForRole
                    label="Location Type"
                    height={"66px"}
                    name="locationType"
                    options={[
                      { value: "onsite", label: "On-Site" },
                      { value: "remote", label: "Remote" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                    value={formData.locationType}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        locationType: selectedValue,
                      }))
                    }
                  />
                  <CustomSelectForRole
                    label="On Probation"
                    height={"66px"}
                    name="onProbation"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    value={formData.onProbation}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        onProbation: selectedValue,
                      }))
                    }
                  />
                  <CustomSelectForRole
                    label="Employment Type"
                    height={"66px"}
                    name="employmentType"
                    options={[
                      { value: "partTime", label: "Part Time" },
                      { value: "fullTime", label: "Full Time" },
                      { value: "remote", label: "Remote" },
                    ]}
                    value={formData.employmentType}
                    handleChange={(selectedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        employmentType: selectedValue,
                      }))
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Convenience Allowance*"
                    name="commuteAllowance"
                    value={formData.commuteAllowance}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Internet Allowance*"
                    name="internetAllowance"
                    value={formData.internetAllowance}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Mobile Allowance*"
                    name="mobileAllowance"
                    value={formData.mobileAllowance}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    mb: "20px",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <CustomInputLabel
                    label="Bank Name*"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Bank Account Number*"
                    name="BAN"
                    value={formData.BAN}
                    onChange={handleChange}
                  />
                  <CustomInputLabel
                    label="Bank Account Title*"
                    name="BAT"
                    value={formData.BAT}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  flexDirection: "column",
                  gap: "5rem",
                  mt: "100px",
                }}
              >
                <Typography
              sx={{
                color:"#010120",
                fontWeight:"600",
                fontSize: {xl:"40px", xs:"30px"},
            
  
              }}
              >
                Documents
              </Typography>
                <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "3rem",
                    
                    }}
                >
                  <FileUpload
                    label="Front CNIC"
                    name="CNICFront"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.CNICFront}
                  />
                  <FileUpload
                    label="Back CNIC"
                    name="CNICBack"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.CNICBack}
                  />
                </Box>

                <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "3rem",
                    
                    }}
                >
                  <FileUpload
                    label="Education Certificate"
                    name="EducationalCert"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.EducationalCert}
                  />
                  <FileUpload
                    label="Employment Letter"
                    name="EmploymentLetter"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.EmploymentLetter}
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "3rem",
                  
                  }}
                >
                  <FileUpload
                    label="Payslip"
                    name="Payslip"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.Payslip}
                  />
                  <FileUpload
                    label="Photograph"
                    name="photograph"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.photograph}
                  />
                </Box>

                <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "3rem",
                    
                    }}
                >
                  <FileUpload
                    label="Resume"
                    name="resume"
                    formData={formData}
                    setFormData={setFormData}
                    existingFile={formData?.documents?.resume}
                    BoxStyling={{
                      flexBasis:"100%"
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
                <CustomButton
                  ButtonText="Update"
                  fontSize="16px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="10px 20px"
                  type="submit"
                  background="#157AFF"
                  hoverBg="#303f9f"
                  hovercolor="white"
                  width={"144px"}
                  borderRadius="7px"
                  height="45px"
                  loading={loadingUpdate}
                />
              </Box>
            </>
          )}
        </form>
        {/* <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
          <Button
            color="info"
            variant="outlined"
            onClick={() => setInputAbled(!inputAbled)}
          >
            Change Info
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default UserInfo;
