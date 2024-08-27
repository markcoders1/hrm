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
} from "@mui/material";
import "../PagesCss/Employee.css"; // Reusing the same CSS file
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import { LoaderW } from "../components/Loaders";
import CustomSelectForType from "../components/CustomSelect/CustomSelect";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserAttendance = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { id } = useParams(); // Extracting id from the URL parameters
  const [pdfLoading, setPdfLoading] = useState(false);

  setHeadertext("User Attendance");
  setParaText("August");

  function millisecondsToHMS(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return isNaN(hours) ? "N/a" : `${hours}:${minutes}:${seconds}`;
  }

  function millisecondsTo12HourFormat(milliseconds) {
    const date = new Date(milliseconds);
    const timezoneOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const pakistaniTime = new Date(date.getTime() + timezoneOffset);

    let hours = pakistaniTime.getUTCHours();
    const minutes = pakistaniTime.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  }

  function getDayFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getUserAttendance`,
          method: "get",
          params: {
            userId: "66c4e13566d4e834a8bec78f", // Using the dynamic id parameter
            from: fromDate ? new Date(fromDate).getTime() : undefined,
            to: toDate ? new Date(toDate).getTime() : undefined,
          },
        });

        const transformedData = response.data.result.map((item) => ({
          ...item,
          employeeId: "005", // Hardcoded employee ID
          formattedDate: new Date(item.date).toLocaleDateString(),
          formattedDay: getDayFromTimestamp(item.date),
          formattedCheckIn: millisecondsTo12HourFormat(item.checkIn),
          formattedCheckOut: millisecondsTo12HourFormat(item.checkOut),
          formattedBreakIn: item.breakIn
            .map((time) => millisecondsTo12HourFormat(time))
            .join(", "),
          formattedBreakOut: item.breakOut
            .map((time) => millisecondsTo12HourFormat(time))
            .join(", "),
          formattedNetDuration: millisecondsToHMS(item.netDuration),
        }));

        setEmployeeData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getEmployeeData();
  }, [id, fromDate, toDate]);

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
    <Box
      className="sheet-container-admin"
      sx={{ position: "relative", height: "80vh" }}
    >
      <Box className="mini-container-attendance">
        {/* <Box className="date-filters">
          <label>
            From : &nbsp;
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To : &nbsp;
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </Box> */}
        <Box sx={{display:"flex", justifyContent:"space-between"}} >
            {/* convert into month dropdown */}
          <Typography>
            {/* <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <CustomSelectForType
                  label="User Role"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                    { value: "hr", label: "HR" },
                  ]}
                  value={field.value}
                  handleChange={field.onChange}
                  error={errors.role?.message}
                  disabled={!inputAbled}
                />
              )}
            /> */}
          </Typography>

            {/* convert into year dropdown */}
          <Typography>
            {/* <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <CustomSelectForType
                  label="User Role"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                    { value: "hr", label: "HR" },
                  ]}
                  value={field.value}
                  handleChange={field.onChange}
                  error={errors.role?.message}
                  disabled={!inputAbled}
                />
              )}
            /> */}
          </Typography>
          <Typography>
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

        {loading ? (
          <Box className="loaderContainer">
            <LoaderW />
          </Box>
        ) : (
          <TableContainer component={Paper} className="MuiTableContainer-root">
            <Table className="data-table">
              <TableHead className="MuiTableHead-root">
                <TableRow
                  className="header-row"
                  sx={{
                    backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    "&:hover": {
                      backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                    },
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
                      // paddingLeft: "40px",
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
                      paddingLeft: "-30px",
                    }}
                  >
                    Date
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
                      paddingLeft: "0px",
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
                      paddingLeft: "0px",
                    }}
                  >
                    Break-In
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
                    Break-Out
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
                      borderRadius: "0px 8px 8px 0px",
                      color: "#010120",
                      paddingLeft: "10px !important",
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
                      {item.employeeId}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        color: "white",
                        textAlign: "center !important",
                        // paddingLeft: "40px !important",
                      }}
                    >
                      {item.formattedDay}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                        color: "#99999C !important",
                      }}
                    >
                      {item.formattedDate}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {item.formattedCheckIn}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {item.formattedCheckOut}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {item.formattedBreakIn ? item.formattedBreakIn : "N/A"}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        textAlign: "center !important",
                        paddingLeft: "0px !important",
                      }}
                    >
                      {item.formattedBreakOut ? item.formattedBreakOut : "N/A"}
                    </TableCell>
                    <TableCell
                      className="MuiTableCell-root"
                      sx={{
                        borderRadius: "0px 8px 8px 0px",
                      }}
                    >
                      {item.formattedNetDuration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "97%",
          height: "90px",
          backgroundColor: "#010120",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 30px",
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: "500", fontSize: "30px" }}
        >
          Average Duration
        </Typography>
        <Typography
          sx={{ color: "white", fontWeight: "500", fontSize: "30px" }}
        >
          8 : 30
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAttendance;
