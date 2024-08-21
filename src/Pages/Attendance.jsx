import { useEffect, useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import "../PagesCss/Progress.css";
import axiosInstance from "../auth/axiosInstance";
import { Loader } from "../components/Loaders";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LoaderW } from "../components/Loaders";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Attendance = () => {
    const setHeadertext = useOutletContext();
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false)

    useEffect(() => {
        (async function () {
            setHeadertext('Attendance');
            const res = await axiosInstance({
                method: "get",
                url: `${apiUrl}/api/isAdmin`,
            });
            setIsAdmin(res.data.isAdmin);

            if (res.data.isAdmin === "admin") {
                navigate("profile");
            }
        })();
    }, []);

    function millisecondsToHMS(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");

        return !isNaN(hours) ? `${hours}:${minutes}:${seconds}` : 'N/a';
    }

    function millisecondsTo12HourFormat(milliseconds) {
        const date = new Date(milliseconds);
        const timezoneOffset = 5 * 60 * 60 * 1000;
        const pakistaniTime = new Date(date.getTime() + timezoneOffset);

        let hours = pakistaniTime.getUTCHours();
        const minutes = pakistaniTime.getUTCMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/getUserAttendance`,
                    method: "get",
                    params: {
                        from: fromDate ? new Date(fromDate).getTime() : undefined,
                        to: toDate ? new Date(toDate).getTime() : undefined,
                    }
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

                console.log("response",response)
                setEmployeeData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getEmployeeData();
    }, [fromDate, toDate]);


    const downloadPdf = async () => {

        try {  
            setPdfLoading(true)
            const response = await axiosInstance({
                url: `${apiUrl}/api/getattendancepdf`,
                method: "get",
                responseType: 'blob'
            });
          
    
            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]
                : 'download.pdf';
    
            console.log("resdata", response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            console.log("pdf response", response)
        } catch (error) {
            console.log(error)
        }
        finally{
            setPdfLoading(false)
        }


        
    }
    return (
        <div className="sheet-container">

            <div className="progress-mini-container">

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
                    <div className="loaderContainer"><Loader /></div> 
                   
                ) : (
                    <CTable className="data-table" hover striped responsive>
                        <CTableHead>
                            <CTableRow >
                                <CTableHeaderCell className="table-head" >Date</CTableHeaderCell>
                                <CTableHeaderCell className="table-head" >Check In</CTableHeaderCell>
                                <CTableHeaderCell className="table-head" >Check Out</CTableHeaderCell>
                                <CTableHeaderCell className="table-head" >Break Duration</CTableHeaderCell>
                                <CTableHeaderCell className="table-head" >Total Duration</CTableHeaderCell>
                                <CTableHeaderCell className="table-head" >Net Duration</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody className="table-body" >
                            {employeeData.map((item, index) => (
                                <CTableRow key={index}
                               
                                >
                                    <CTableDataCell >{item.formattedDate}</CTableDataCell>
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
                <div className="generate">
                    <button id="generatePdfBtn" onClick={downloadPdf} >{pdfLoading ? <LoaderW/>: "Generate PDF"}</button>
                </div>
            </div>

        </div>
    );
};

export default Attendance;
