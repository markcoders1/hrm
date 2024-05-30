import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Attendance.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Attendance = () => {
    const user = useSelector((state) => state.user);
    const [loading,setloading]=useState(true)
    const [employeeData, setEmployeeData] = useState([]);
    const { id } = useParams(); // Extracting id from the URL parameters

    const accessToken = user?.user?.accessToken || "";

    function millisecondsToHMS(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");

        return isNaN(hours)?"N/a":`${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axios({
                    url: `${apiUrl}/api/admin/getUserAttendance`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        userId: id, // Sending the id as a query parameter
                    },
                });
                console.log(response);

                const transformedData = response.data.result.map((item) => ({
                    ...item,
                    formattedDate: new Date(item.date).toLocaleString(),
                    formattedCheckIn: new Date(item.checkIn).toLocaleTimeString(
                        "en-GB"
                    ),
                    formattedCheckOut: new Date(
                        item.checkOut
                    ).toLocaleTimeString("en-GB"),
                    formattedBreakDuration: millisecondsToHMS(
                        item.breakDuration
                    ),
                    formattedNetDuration: millisecondsToHMS(item.netDuration),
                    formattedTotalDuration: millisecondsToHMS(
                        item.totalDuration
                    ),
                }));

                setEmployeeData(transformedData);
                setloading(false)
            } catch (error) {
                console.error(error);
            }
        };
        getEmployeeData();
    }, [accessToken, id]); // Include id in the dependency array

    const netDurationBodyTemplate = (rowData) => {
        return <span>{rowData.formattedNetDuration}</span>;
    };
    const checkInBodyTemplate = (rowData) => {
        return <span>{rowData.formattedCheckIn}</span>;
    };
    const dateBodyTemplate = (rowData) => {
        return <span>{rowData.formattedDate}</span>;
    };
    const checkOutBodyTemplate = (rowData) => {
        return <span>{rowData.formattedCheckOut}</span>;
    };

    const breakDurationBodyTemplate = (rowData) => {
        return <span>{rowData.formattedBreakDuration}</span>;
    };

    const totalDurationBodyTemplate = (rowData) => {
        return <span>{rowData.formattedTotalDuration}</span>;
    };

    useEffect(() => {
        millisecondsToHMS();
    }, []);

    return (
        <div className="sheet-container">
            <h1 style={{ textAlign: "center" }}>
                Attendance for User ID: {id}
            </h1>

            <div >

                {loading?<div className="loaderContainer"><div className="loader"></div></div>
                :<DataTable
                    id="datatable-container-user"
                    value={employeeData}
                    tableStyle={{
                        minWidth: "30rem",
                        maxWidth: "100%",
                        margin: "auto",
                    }}
                    paginator
                    rows={10}
                    sortField="_id"
                    sortOrder={1}>
                    <Column body={dateBodyTemplate} header="Date"></Column>
                    <Column
                        body={checkInBodyTemplate}
                        header="Check In"></Column>
                    <Column
                        body={checkOutBodyTemplate}
                        header="Check Out"></Column>
                    <Column
                        body={breakDurationBodyTemplate}
                        header="Break Duration"></Column>
                    <Column
                        body={totalDurationBodyTemplate}
                        header="Total Duration"></Column>
                    <Column
                        body={netDurationBodyTemplate}
                        header="Net Duration"></Column>
                </DataTable>}
            </div>
        </div>
    );
};

export default Attendance;
