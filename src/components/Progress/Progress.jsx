import { useEffect, useState } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Progress.css';
import env from '../../../env.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AttendanceSheet = () => {
    const user = useSelector(state => state.user);
    const [employeeData, setEmployeeData] = useState([]);

    const accessToken = user?.user?.accessToken || '';

    function millisecondsToHMS(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}`;
    }
 

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axios({
                    url: `${apiUrl}/api/getUserAttendance`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response)

                const transformedData = response.data.result.map(item => ({
                    ...item,
                    formattedDate: new Date(item.date).toLocaleString(),
                    formattedCheckIn: millisecondsToHMS(item.checkIn),
                    formattedCheckOut: millisecondsToHMS(item.checkOut),
                    formattedBreakDuration: millisecondsToHMS(item.breakDuration),
                    formattedNetDuration: millisecondsToHMS(item.netDuration),
                    formattedTotalDuration: millisecondsToHMS(item.totalDuration)
                }));

                setEmployeeData(transformedData);
                
            } catch (error) {
                console.error(error);
            }
        }
        getEmployeeData();
    }, [accessToken]);

    const netDurationBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedNetDuration}</span>
        );
    };
    const checkInBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedCheckIn}</span>
        );
    };
    const dateBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedDate}</span>
        );
    };
    const checkOutBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedCheckOut}</span>
        );
    };

    const breakDurationBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedBreakDuration}</span>
        );
    };


    const totalDurationBodyTemplate = (rowData) => {
        return (
                <span>{rowData.formattedTotalDuration}</span>
        );
    };

    useEffect(()=>{
        console.log("hello")
      let res =   millisecondsToHMS(1716979884244) 
      console.log(res)
    },[])

    return (
        <div className='sheet-container'>
            <h1 style={{ textAlign: 'center' }}>Attendance Sheet</h1>

            <div>
                <DataTable
                    id='datatable-container-user'
                    value={employeeData}
                    tableStyle={{ minWidth: '30rem', maxWidth: '100%', margin: 'auto' }}
                    paginator
                    rows={10}
                    sortField="_id"
                    sortOrder={1}
                >
                    <Column body={dateBodyTemplate} header="Date"></Column>
                    <Column  body={checkInBodyTemplate} header="Check In"></Column>
                    <Column body={checkOutBodyTemplate} header="Check Out"></Column>
                    <Column body={breakDurationBodyTemplate} header="Break Duration"></Column>
                    <Column body={totalDurationBodyTemplate} header="Total Duration"></Column>
                    <Column  body={netDurationBodyTemplate} header="Net Duration"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default AttendanceSheet;
