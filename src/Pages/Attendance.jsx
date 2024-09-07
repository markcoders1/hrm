import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  FormControl,
} from "@mui/material";
import axiosInstance from "../auth/axiosInstance";
import { Loader, LoaderW } from "../components/Loaders";
import "../PagesCss/Employee.css";
import CustomSelectForType from "../components/CustomSelect/CustomSelect";
import CustomInputLabel from "../components/CustomInputField/CustomInputLabel";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Attendance = () => {
  const { setHeadertext } = useOutletContext();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth().toString()); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear().toString()); 

  useEffect(() => {
    (async function () {
      setHeadertext("Attendance");
      // Add more initialization logic if needed
    })();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-GB');
    return { day, formattedDate };
  };

  function millisecondsTo12HourFormat(milliseconds) {
    if (milliseconds === 0 || !milliseconds){
      console.log("printend zero")
    } else {

      const date = new Date(milliseconds);
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const adjustedHours = hours % 12 || 12;
      return `${adjustedHours}:${minutes} ${ampm}`;
    }
  }

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const getUnixTimestampForMonthYear = (month, year) => {
    const date = new Date(year, month, 1);
    return date.getTime();
  };

  const getEmployeeData = async () => {
    const date = getUnixTimestampForMonthYear(month, year); 
    console.log(date)
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/getUserAttendance`,
        method: "get",
        params: {
          date: date
        },
      });

     

      const transformedData = response.data.attendances.map((item) => ({
        ...item,
        ...formatDate(item.date),
        formattedCheckIn: millisecondsTo12HourFormat(item.checkIn),
        formattedCheckOut: millisecondsTo12HourFormat(item?.checkOut),
        formattedTotalDuration: millisecondsToHMS(item.totalDuration),
      }));

      setEmployeeData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setPdfLoading(false);

    }
  };

  useEffect(() => {
    getEmployeeData();
  }, [month , year]);

  const millisecondsToHMS = (milliseconds) => {
    if (milliseconds) {
      console.log("printend Zero")
    } else {
      const date = new Date(milliseconds);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;

    }
  };

  const downloadPdf = async () => {
    try {
      setPdfLoading(true);
      const response = await axiosInstance({
        url: `${apiUrl}/api/getattendancepdf`,
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

      if (response){
        toast.success("PDF Downloaded Sucessfully")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <Box className="sheet-container-admin">
      <Box className="progress-mini-container">
        
        <Box>
        <Box
    sx={{
      display: "flex",
      gap: 2,
      position:{lg:"fixed", xs:"static"}, right:"45px", top:"40px", zIndex:"100000"
    }}
  >
    <FormControl sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}>
              <CustomSelectForType
                label="Month"
                value={month}
                handleChange={handleMonthChange}
                options={[
                  { value: "0", label: "January" },
                  { value: "1", label: "February" },
                  { value: "2", label: "March" },
                  { value: "3", label: "April" },
                  { value: "4", label: "May" },
                  { value: "5", label: "June" },
                  { value: "6", label: "July" },
                  { value: "7", label: "August" },
                  { value: "8", label: "September" },
                  { value: "9", label: "October" },
                  { value: "10", label: "November" },
                  { value: "11", label: "December" },
                ]}
              />
            </FormControl>

            <FormControl sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}>
              <CustomSelectForType
                label="Year"
                value={year}
                handleChange={handleYearChange}
                options={[
                  { value: "2022", label: "2022" },
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                  { value: "2025", label: "2025" },
                ]}
              />
            </FormControl>
  </Box>
        </Box>
        <Box className="generate" sx={{ mt: 3, display:"flex", justifyContent:"end" }}>
     
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPdf}
            disabled={pdfLoading}
            sx={{
              backgroundColor: "#157AFF",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            {pdfLoading ? <LoaderW /> : "Generate PDF"}
          </Button>
        </Box>
       
        {loading ? (
          <Box className="loaderContainer">
            <Loader />
          </Box>
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
                    #
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
                      textAlign: "start",
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
                      textAlign: "start",
                      color: "#010120",
                    }}
                  >
                    Checked-In Date
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
                      textAlign: "start",
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
                      textAlign: "start",
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
                      borderRadius: "0px 8px 8px 0px",

                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "start",
                      color: "#010120",
                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="MuiTableBody-root">
                {employeeData.map((item, index) => (
                  <TableRow key={index} className="MuiTableRow-root">
                    <TableCell
                      sx={{
                        borderRadius: "8px 0px 0px 8px",
                        color: "#010120",
                        textAlign: "start !important",
                        paddingLeft: "40px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      005 {/* Use actual employee ID if available */}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "start !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {item?.day}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "start !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedDate}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "start !important" }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedCheckIn ?  item?.formattedCheckIn : "-- --"}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "start !important" }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedCheckOut ? item?.formattedCheckOut : "-- --"}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "start !important", borderRadius:"0px 8px 8px 0px" }}
                      className="MuiTableCell-root"
                    >
                      { !item.formattedTotalDuration ? item.formattedTotalDuration : "-- --"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
       
      </Box>
    </Box>
  );
};

export default Attendance;
