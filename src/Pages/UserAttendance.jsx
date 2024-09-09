import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import "../PagesCss/Employee.css"; // Reusing the same CSS file
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import { LoaderW } from "../components/Loaders";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";
import CustomSelectForType from "../components/CustomSelect/CustomSelect";
import CustomButton from "../components/CustomButton/CustomButton";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserAttendance = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const { id } = useParams();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString()); // Default to current year
  

  setHeadertext("User Attendance");
  setParaText("August");

  // Convert milliseconds to HH:mm:ss format
  function millisecondsToHMS(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return isNaN(hours) ? "N/A" : `${hours}:${minutes}:${seconds}`;
  }

  // Convert Unix timestamp to 12-hour time format
  function millisecondsTo12HourFormat(milliseconds) {
    const date = new Date(milliseconds);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  }

  // Get day of the week from a Unix timestamp
  function getDayFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  const months = [
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (v, i) => ({
    label: (2024 + i).toString(),
    value: (2024 + i).toString(),
  }))
  
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getUnixTimestampForMonthYear = (month, year) => {
    const date = new Date(year, month, 1);
    return date.getTime();
  };

  

  // Fetch attendance data
  useEffect(() => {
    const getEmployeeData = async () => {
      const date = getUnixTimestampForMonthYear(selectedMonth, selectedYear);
console.log(date)
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getUserAttendance`,
          method: "get",
          params: {
            userId: id,
            date : date ? date : null
          },
        });
        console.log(response)

        // Transform the response data
        const transformedData = response?.data?.attendances?.map((item) => ({
          ...item,
          employeeId: "005", // Hardcoded employee ID (can be dynamic)
          formattedDate: getDayFromTimestamp(item?.date),
          formattedCheckIn: item?.checkIn
            ? millisecondsTo12HourFormat(item?.checkIn)
            : "N/A",
          formattedCheckOut: item?.checkOut
            ? millisecondsTo12HourFormat(item?.checkOut)
            : "N/A",
          formattedNetDuration: millisecondsToHMS(item?.totalDuration),
        }));

        setEmployeeData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch attendance data. Please try again.");
      }
    };
    getEmployeeData();
  }, [selectedMonth, selectedYear]);

  const downloadPdf = async () => {
    try {
      setPdfLoading(true);
      const response = await axiosInstance({
        url: `${apiUrl}/api/admin/getAttendancePDF?userId=${id}`,
        method: "get",
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : "download.pdf";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setPdfLoading(false);
    }
  };



  return (
    <>
   
    <Box
      className="sheet-container-admin"
     
    >
     

      <Box className="mini-container-attendance" >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center"  }}>
        <Box sx={{ display: "flex", justifyContent: "space-between",gap:"2rem", alignItems:"center" }}>
        <CustomSelectForType
        height={"56px"}
          label="Month"
            width="220px"
          options={months}
          handleChange={handleMonthChange}
          value={selectedMonth}
        />
        <CustomSelectForType
        height={"56px"}
    width="220px"
          label="Year"
          options={years}
          handleChange={handleYearChange}
          value={selectedYear}
        />
      </Box>

      <Tooltip title="Edit Your Profile ">
            <CustomButton
              ButtonText="Generate PDF "
              fontSize="16px"
              color="white"
              fontWeight="500"
              fullWidth={false}
              variant="contained"
              padding="8px 0px"
              type="submit"
              background="#157AFF"
              hoverBg="#303f9f"
              hovercolor="white"
              width={"160px"}
              borderRadius="7px"
              buttonStyle={{ mt: "-17px" }}
              height="45px"
               id="generatePdfBtn"
               onClick={downloadPdf}
               disabled={pdfLoading}
               loading={pdfLoading}
              
             
            />{" "}
            </Tooltip>
          <Typography  sx={{display:"none"}} >
            <Box className="generate">
              <Button
                id="generatePdfBtn"
                variant="contained"
                onClick={downloadPdf}
                disabled={pdfLoading}
              >
                {pdfLoading ? <LoaderW /> : "Generate PDF"}
              </Button>
            </Box>
          </Typography>
        </Box>

        {error ? (
          <Typography color="error">{error}</Typography>
        ) : loading ? (
          <Box className="loaderContainer">
            <LoaderW />
          </Box>
        ) : employeeData.length === 0 ? (
          <Typography>No attendance data available for this user.</Typography>
        ) : (
          <TableContainer component={Paper} className="MuiTableContainer-root">
            <Table className="data-table">
              <TableHead className="MuiTableHead-root">
                <TableRow
                  className="header-row"
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    padding: "0px",
                  }}
                >
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "start",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      paddingLeft: "40px",
                    }}
                  >
                    Emp ID
                  </TableCell>
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                    }}
                  >
                    Day
                  </TableCell>
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                    }}
                  >
                    Check-In
                  </TableCell>
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                    }}
                  >
                    Check-Out
                  </TableCell>
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "center",
                      color: "#010120",
                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="MuiTableBody-root">
                {employeeData.map((item, index) => (
                  <TableRow
                    className="MuiTableRow-root"
                    key={index}
                    sx={{
                      border: "2px solid #FFA100",
                    }}
                  >
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        borderRadius: "8px 0px 0px 8px",
                        color: "white",
                        textAlign: "start !important",
                        paddingLeft: "60px !important",
                      }}
                    >
                      {item?.employeeId}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        color: "white",
                        textAlign: "center !important",
                      }}
                    >
                      {item?.formattedDate}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#99999C !important",
                      }}
                    >
                      {item?.formattedCheckIn ? item?.formattedCheckIn : "-- -- "}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {item?.formattedCheckOut}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        borderRadius: "0px 8px 8px 0px",
                      }}
                    >
                      {item?.formattedNetDuration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
    </>
  );
};

export default UserAttendance;
