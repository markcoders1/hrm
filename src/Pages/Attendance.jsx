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
import SpinnerLoader from "../components/SpinnerLoader";
import CustomButton from "../components/CustomButton/CustomButton";

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
  const [downloadpdf, setDownloadpdf] = useState(false)

  useEffect(() => {
    (async function () {
      setHeadertext("Attendance");
      // Add more initialization logic if needed
    })();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const formattedDate = `${month}-${dayOfMonth}-${year}`;
    return { day, formattedDate };
  };

  function millisecondsTo12HourFormat(milliseconds) {
    if (milliseconds === 0 || !milliseconds) {
      console.log("printend zero");
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
    console.log(date);
    try {
      const response = await axiosInstance({
        url: `${apiUrl}/api/getUserAttendance`,
        method: "get",
        params: {
          date: date,
        },
      });
      console.log(response)

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
  }, [month, year]);

  const millisecondsToHMS = (milliseconds) => {
    if (milliseconds) {
      console.log("printend Zero");
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

      if (response) {
        toast.success("PDF Downloaded Sucessfully", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading === true) {
    return (
      <Box className="loaderContainer">
        <SpinnerLoader />
      </Box>
    );
  }

  return (
    <Box className="sheet-container-admin" sx={{
      padding:"0px 0px 40px 0px"
      }} >
      <Box className="progress-mini-container">
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              position: { lg: "fixed", xs: "static" },
              right: "65px",
              top: "55px",
              zIndex: "100000",
            }}
          >
            <FormControl
              sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}
            >
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
            height={"46px"}

              />
            </FormControl>

            <FormControl
              sx={{ width: { md: "200px", xs: "100%" }, height: "50px" }}
            >
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
            height={"46px"}

              />
            </FormControl>
          </Box>
        </Box>
        <Box
          className="generate"
          sx={{ mt: 3, display: "flex", justifyContent: "end" }}
        >
            <CustomButton
                  ButtonText="Download PDF"
                  fontSize="16px"
                  color="white"
                  fontWeight="500"
                  fullWidth={false}
                  variant="contained"
                  padding="8px 0px"
                  width={"154px"}
                  height="45px"
                  background="#157AFF"
                  hoverBg="#303f9f"
                  hovercolor="white"
                  borderRadius="7px"
                  buttonStyle={{ mb: "17px", height: "45px" }}
                  loading={pdfLoading}
                  onClick={() =>
                    downloadPdf()
                  }
                />
         
        </Box>

        {loading ? (
          <Box className="loaderContainer">
            <SpinnerLoader />
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
                      padding: "12px 10px",
                      fontSize: {
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

                      },
                      textAlign: "center",
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                     
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    className="MuiTableCell-root-head"
                    sx={{
                      fontWeight: "500",
                      padding: "12px 15px",
                      fontSize: {
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

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
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

                      },
                      textAlign: "center",
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
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

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
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

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
                      padding: "12px 10px",
                      borderRadius: "0px 8px 8px 0px",

                      fontSize: {
                        xl: "21px !important",
                        md: "14px !important ",
                        xs: "16px !important ",

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
                  <TableRow key={index} className="MuiTableRow-root">
                    <TableCell
                      sx={{
                        borderRadius: "8px 0px 0px 8px",
                        color: "#010120",
                        textAlign: "center !important",
                        pl:"00px !important"
                       
                      }}
                      className="MuiTableCell-root"
                    >
                      {item?.companyId}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#010120",
                        textAlign: "center !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {item?.day}
                    </TableCell>
                    <TableCell
                      sx={{
                        // color: "#010120",
                        textAlign: "center !important",
                        color:"#99999C !important"
                      }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedDate}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center !important",  }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedCheckIn
                        ? item?.formattedCheckIn
                        : "-- --"}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center !important" }}
                      className="MuiTableCell-root"
                    >
                      {item?.formattedCheckOut
                        ? item?.formattedCheckOut
                        : "-- --"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center !important",
                        borderRadius: "0px 8px 8px 0px",
                      }}
                      className="MuiTableCell-root"
                    >
                      {!item.formattedTotalDuration
                        ? item.formattedTotalDuration
                        : "-- --"}
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
