import { useEffect, useState } from "react";
import "../css/Employee.css";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from "@coreui/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TextField } from '@mui/material';
import axiosInstance from "../auth/axiosInstance";
import { Loader } from "./Loaders";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Employee = () => {
    const navigate = useNavigate();
    const setHeadertext = useOutletContext();
    const [allEmployee, setAllEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getAllUser = async () => {
            try {
                setHeadertext('Employees');
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getAllUsers`,
                    method: "get",
                });
                const dataAllEmployee = response.data;
                setAllEmployee(dataAllEmployee);
                setFilteredEmployees(dataAllEmployee);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUser();
    }, []);

    // const buttonForViewDetails = (rowData) => {
    //     const navigateUserdetail = () => {
    //         navigate(`attendance/${rowData._id}`);
    //     };
    //     return <button className={"attendanceButton"} onClick={navigateUserdetail}>Attendance</button>;
    // };

    const ToggleUserStatus=(rowData)=>{
        const handleToggle=()=>{
            axiosInstance({
                method:"get",
                url:`${apiUrl}/api/admin/toggleuseraccount`,
                params:{
                    userId:rowData._id
                }
            }).then(()=>{
                const updatedEmployees = allEmployee.map(employee =>
                    employee._id === rowData._id ? { ...employee, active: !employee.active } : employee
                );
                setAllEmployee(updatedEmployees);
            })
        }
        return <CButton variant="outline" color={`${rowData.active?"success":"danger"}`} onClick={handleToggle}>{rowData.active?"Active":"Inactive"}</CButton>
    }

    const buttonForViewInformation = (rowData) => {
        const navigateUseInformation = () => {
            navigate(`viewInformation/${rowData._id}`);
        };
        return <button className={"attendanceButton"} onClick={navigateUseInformation}>Details</button>;
        
    };

    useEffect(() => {
        const results = allEmployee.filter(employee =>
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(results);
    }, [searchTerm, allEmployee]);

    return (
        <div className='sheet-container-admin'>
            <div className="table-header">
                <div className="search-container">
                    <CIcon icon={cilMagnifyingGlass} size="xl" className="search-icon"></CIcon>
                    <input
                        type="text"
                        label="Search by Name & Email"
                        // variant="outlined"
                        // fullWidth
                        placeholder="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="register-user" onClick={()=>navigate('/dashboard/admin/register')}>
                    Register User
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="loaderContainer"><Loader /></div>
                ) : (
                    <CTable className="data-table" hover striped responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>First Name</CTableHeaderCell>
                                <CTableHeaderCell>Last Name</CTableHeaderCell>
                                <CTableHeaderCell>Email</CTableHeaderCell>
                                {/* <CTableHeaderCell>Attendance</CTableHeaderCell> */}
                                <CTableHeaderCell>View Details</CTableHeaderCell>
                                <CTableHeaderCell>Toggle status</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {filteredEmployees.map((employee, index) => (
                                <CTableRow  key={index}>
                                    <CTableDataCell>{employee.firstName}</CTableDataCell>
                                    <CTableDataCell>{employee.lastName}</CTableDataCell>
                                    <CTableDataCell>{employee.email}</CTableDataCell>
                                    {/* <CTableDataCell>{buttonForViewDetails(employee)}</CTableDataCell> */}
                                    <CTableDataCell>{buttonForViewInformation(employee)}</CTableDataCell>
                                    <CTableDataCell>{ToggleUserStatus(employee)}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                )}
            </div>
        </div>
    );
};

export default Employee;
