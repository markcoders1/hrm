import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";
import { Loader } from "../components/Loaders";
import CustomTextField from "../components/CustomInput/CustomInput"; // Adjust the import path as needed
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import SearchIcon from '@mui/icons-material/Search';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EmployeeData = () => {
    const navigate = useNavigate();
    const setHeadertext = useOutletContext();
    const [allEmployee, setAllEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabIndex, setTabIndex] = useState(1); // Default to Activated Users

    useEffect(() => {
        const getAllUser = async () => {
            try {
                setHeadertext('User Management');
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getAllUsers`,
                    method: "get",
                });
                const dataAllEmployee = response.data;
                setAllEmployee(dataAllEmployee);
                setFilteredEmployees(dataAllEmployee.filter(emp => emp.active)); // Default to activated users
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUser();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        if (newValue === 0) {
            setFilteredEmployees(allEmployee);
        } else if (newValue === 1) {
            setFilteredEmployees(allEmployee.filter(emp => emp.active));
        } else if (newValue === 2) {
            setFilteredEmployees(allEmployee.filter(emp => !emp.active));
        }
    };

    const ToggleUserStatus = (rowData) => {
        const handleToggle = () => {
            axiosInstance({
                method: "get",
                url: `${apiUrl}/api/admin/toggleuseraccount`,
                params: {
                    userId: rowData._id
                }
            }).then(() => {
                const updatedEmployees = allEmployee.map(employee =>
                    employee._id === rowData._id ? { ...employee, active: !employee.active } : employee
                );
                setAllEmployee(updatedEmployees);
                handleTabChange(null, tabIndex); // Refresh the filtered employees
            });
        };
        return (
            <CustomButton
                border="1px solid"
                borderRadius="4px"
                ButtonText={rowData.active ? "Active" : "Inactive"}
                fontSize="14px"
                color={rowData.active ? "green" : "red"}
                fontWeight="500"
                fullWidth={false}
                variant="outlined"
                padding="5px 10px"
                onClick={handleToggle}
                background="#fff"
                hoverBg="#f5f5f5"
                hovercolor={rowData.active ? "darkgreen" : "darkred"}
                type="button"
            />
        );
    };

    const DeleteUser = (rowData) => {
        const handleDelete = () => {
            axiosInstance({
                method: "get",
                url: `${apiUrl}/api/admin/delete-user`,
                params: {
                    id: `${rowData._id}`
                }
            }).then(() => {
                const updatedEmployees = allEmployee.filter(emp => emp._id !== rowData._id);
                setAllEmployee(updatedEmployees);
                handleTabChange(null, tabIndex); // Refresh the filtered employees
            });
        };
        return (
            <CustomButton
                border="1px solid"
                borderRadius="4px"
                ButtonText="Delete"
                fontSize="14px"
                color="red"
                fontWeight="500"
                fullWidth={false}
                variant="outlined"
                padding="5px 10px"
                onClick={handleDelete}
                background="#fff"
                hoverBg="#f5f5f5"
                hovercolor="darkred"
                type="button"
            />
        );
    };

    const buttonForViewInformation = (rowData) => {
        const navigateUserInformation = () => {
            navigate(`viewInformation/${rowData._id}`);
        };
        return (
            <CustomButton
                border="1px solid"
                borderRadius="4px"
                ButtonText="Details"
                fontSize="14px"
                color="blue"
                fontWeight="500"
                fullWidth={false}
                variant="outlined"
                padding="5px 10px"
                onClick={navigateUserInformation}
                background="#fff"
                hoverBg="#f5f5f5"
                hovercolor="darkblue"
                type="button"
            />
        );
    };

    useEffect(() => {
        const results = allEmployee.filter(employee =>
            employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(results);
    }, [searchTerm, allEmployee]);

    return (
        <Box className='sheet-container-admin'>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="All Users" />
                <Tab label="Activated Users" />
                <Tab label="Deactivated Users" />
            </Tabs>
            <Box className="table-header">
                <Box className="search-container" sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon sx={{ color: 'white', marginRight: 1 }} />
                    <CustomTextField
                        placeholder="Search by Name & Email"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <CustomButton
                    ButtonText="Register User"
                    fontSize="16px"
                    color="white"
                    fontWeight="600"
                    fullWidth={false}
                    variant="contained"
                    padding="10px 20px"
                    onClick={() => navigate('/dashboard/admin/register')}
                    background="#3f51b5"
                    hoverBg="#303f9f"
                    hovercolor="white"
                    type="button"
                />
            </Box>
            <Box>
                {loading ? (
                    <Box className="loaderContainer"><Loader /></Box>
                ) : (
                    <TableContainer>
                        <Table className="data-table" hover striped>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>View Details</TableCell>
                                    <TableCell>Toggle Status</TableCell>
                                    <TableCell>Delete User</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{employee.fullName}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{buttonForViewInformation(employee)}</TableCell>
                                        <TableCell>{ToggleUserStatus(employee)}</TableCell>
                                        <TableCell>{DeleteUser(employee)}</TableCell>
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

export default EmployeeData;
