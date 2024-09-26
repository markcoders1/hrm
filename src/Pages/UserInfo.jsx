import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/UserInfo.css";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import CustomSelectForRole from "../components/CustomSelectForRole/CustomSelectForRole";
import CustomButton from "../components/CustomButton/CustomButton";
import { Loader } from "../components/Loaders";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserInfo = () => {
  const { setHeadertext } = useOutletContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [hods, setHods] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [inputAbled, setInputAbled] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    emergencyNumber: "",
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
    totalShiftDuration: "",
    joiningDate: "",
    duration: "",
    role: "",
    annualLeaves: "",
    netSalary: "",
    locationType: "",
    onProbation: "",
    employmentType: "",
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
          emergencyNumber: dataAllEmployee.emergencyNumber || "",
          CNIC: dataAllEmployee.CNIC || "",
          DOB: dataAllEmployee.DOB
            ? new Date(dataAllEmployee.DOB).toISOString().split("T")[0]
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
          totalShiftDuration: totalShiftDuration,
          joiningDate: dataAllEmployee.joiningDate
            ? new Date(dataAllEmployee.joiningDate)
                .toISOString()
                .split("T")[0]
            : "",
          duration: joiningDuration,
          role: dataAllEmployee.role || "",
          annualLeaves: dataAllEmployee.annualLeaves || "",
          netSalary: dataAllEmployee.netSalary || "",
          locationType: dataAllEmployee.locationType || "",
          onProbation: dataAllEmployee.onProbation || "",
          employmentType: dataAllEmployee.employmentType || "",
        });

      console.log(response)


        if (dataAllEmployee.workDays) {
          setSelectedDays(
            dataAllEmployee.workDays.map((day) =>
              daysOfWeek.find((d) => d.value === day)
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

    const shiftTimeFromUnix = convertTimeToUnixTimestamp(formData.shiftTimingFrom);
    const shiftTimeToUnix = convertTimeToUnixTimestamp(formData.shiftTimingTo);
    const joiningDate = convertTimeToUnixTimestamp(formData.joiningDate);
    const DOB = convertTimeToUnixTimestamp(formData.DOB);
   
    console.log(formData)
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/update-any-profile`,
        method: "post",
        data: {
          ...formData,
          shiftTimingFrom: shiftTimeFromUnix,
          shiftTimingTo: shiftTimeToUnix,
          joiningDate: joiningDate,
          DOB: DOB,
          id: id,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message[0].message, {
        position: "top-center",
      });
    }
  };

  function unixToTimeInput(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getUTCHours().toString().padStart(2, "0");
    let minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function convertTimeToUnixTimestamp(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    return Math.floor(date.getTime() / 1000);
  }

  return (
    <Box className="form-container-register">
      <Box
        sx={{
          border: "1px dashed #C5C5C5",
          width: "517px",
          p: "1rem",
          borderRadius: "7px",
          position: { lg: "fixed", xs: "static" },
          right: "40px",
          top: "20px",
          zIndex: "100000 ",
        }}
      >
        <Box sx={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <img src="" style={{ width: "64px", height: "64px" }} alt="" />
          <Typography sx={{ color: "#010120", fontSize: "24px" }}>
            Aman Raza Khan
          </Typography>
        </Box>
      </Box>
      <Box className="form-register" sx={{ mt: "40px" }}>
        <form onSubmit={onSubmit}>
          {loading ? (
            <Box className="loaderContainer">
              <Loader />
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
                    name="emergencyNumber"
                    value={formData.emergencyNumber}
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
                    onChange={handleChange}
                    
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
                    onChange={handleChange}
                    
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
                        flexBasis:"32.5%",
                          display:"flex",
                        gap:"0.7rem"
                      }}
                      >

                      {daysOfWeek.map((day) => (
                        <CustomCheckbox
                          key={day.label}
                          label={day.label}
                          selected={selectedDays.some(
                            (selected) => selected.value === day.value
                          )}
                          onChange={() => handleDayChange(day)}
                        />
                      ))}
                      </Box>
                    </Box>
                  </Box>
                      <Box
                       sx={{
                        flexBasis:"32.2%",
                      
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
                    value={formData.HODID}
                    onChange={handleChange}
                    
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
                    value={formData.totalShiftDuration}
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
                    onChange={handleChange}
                    
                  />
                  <CustomInputLabel
                    label="Annual Leaves*"
                    name="annualLeaves"
                    value={formData.annualLeaves}
                    onChange={handleChange}
                    
                  />
                  <CustomInputLabel
                    label="Net Salary*"
                    name="netSalary"
                    value={formData.netSalary}
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
                    onChange={handleChange}
                    
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
                    onChange={handleChange}
                    
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
                    onChange={handleChange}
                    
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
