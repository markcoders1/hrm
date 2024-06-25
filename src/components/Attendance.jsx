import { useEffect, useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import "../css/Attendance.css";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import { Loader } from "./Loaders";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Attendance = () => {
    const setHeadertext = useOutletContext()
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const { id } = useParams(); // Extracting id from the URL parameters

    const accessToken = sessionStorage.getItem('accessToken');

    setHeadertext("User Attendance")

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
        const minutes = pakistaniTime.getUTCMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    }

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getUserAttendance`,
                    method: "get",
                    params: {
                        userId: id, // Sending the id as a query parameter
                        from: fromDate ? new Date(fromDate).getTime() : undefined,
                        to: toDate ? new Date(toDate).getTime() : undefined,
                    },
                });

                const transformedData = response.data.result.map((item) => ({
                    ...item,
                    formattedDate: new Date(item.date).toLocaleString(),
                    formattedCheckIn: millisecondsTo12HourFormat(item.checkIn),
                    formattedCheckOut: millisecondsTo12HourFormat(item.checkOut),
                    formattedBreakDuration: millisecondsToHMS(item.breakDuration),
                    formattedNetDuration: millisecondsToHMS(item.netDuration),
                    formattedTotalDuration: millisecondsToHMS(item.totalDuration),
                }));

                setEmployeeData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getEmployeeData();
    }, [accessToken, id, fromDate, toDate]); // Include fromDate and toDate in the dependency array

    return (
        <div className='sheet-container'>
            
            <div className="mini-container-attendance">
                <div className="date-filters">
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
                </div>
                {loading ? (
                    <div className="loaderContainer">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <CTable className="data-table" hover striped responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="table-head" >DATE</CTableHeaderCell>
                                <CTableHeaderCell className="table-head">Check IN</CTableHeaderCell>
                                <CTableHeaderCell className="table-head">CHECK OUT</CTableHeaderCell>
                                <CTableHeaderCell className="table-head">BREAK DURATION</CTableHeaderCell>
                                <CTableHeaderCell className="table-head">TOTAL DURATION</CTableHeaderCell>
                                <CTableHeaderCell className="table-head">NET DURATION</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody  >
                            {employeeData.map((item, index) => (
                                <CTableRow className="table-body" key={index}>
                                    <CTableDataCell>{item.formattedDate}</CTableDataCell>
                                    <CTableDataCell>{item.formattedCheckIn}</CTableDataCell>
                                    <CTableDataCell>{item.formattedCheckOut}</CTableDataCell>
                                    <CTableDataCell>{item.formattedBreakDuration}</CTableDataCell>
                                    <CTableDataCell>{item.formattedTotalDuration}</CTableDataCell>
                                    <CTableDataCell>{item.formattedNetDuration}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                     
                    </CTable>
                )}
                
            </div>
        </div>
    );
};

export default Attendance;
