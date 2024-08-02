import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tabs, Tab, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axiosInstance from "../auth/axiosInstance";
import { Loader } from "../components/Loaders";
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import "../PagesCss/TableStyle.css"; // Import the CSS file for custom styles

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'black',
    },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography,
    marginRight: theme.spacing(4),
    color: '#9B9B9B',
    fontSize: '22px',
    '&.Mui-selected': {
        color: 'black',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

const EmployeeData = () => {
    const navigate = useNavigate();
    const setHeadertext = useOutletContext();
    const [allEmployee, setAllEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const getAllUser = async () => {
            try {
                setHeadertext('User Management');
                const response = await axiosInstance({
                    url: `${apiUrl}/api/admin/getAllUsers`,
                    method: "get",
                });
                console.log(response)
                const dataAllEmployee = response.data;
                setAllEmployee(dataAllEmployee);
                setFilteredEmployees(dataAllEmployee);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUser();
    }, []);

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
                filterEmployees(tabValue, searchTerm); // Update filtered employees
            })
        }
        return <CustomButton
            border="1px solid #31BA96"
            borderRadius="7px"
            ButtonText={rowData.active ? "Deactivate" : "Activate"}
            fontSize="14px"
            color={rowData.active ? "red" : "green"}
            fontWeight="500"
            fullWidth={false}
            variant="outlined"
            padding="5px 10px"
            onClick={handleToggle}
            background="#fff"
            hoverBg="#f5f5f5"
            hovercolor={rowData.active ? "darkred" : "darkgreen"}
            type="button"
            width="106px"
        />
    }

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
                filterEmployees(tabValue, searchTerm); // Update filtered employees
            })
        }
        return <CustomButton
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
    }

    const buttonForViewInformation = (rowData) => {
        const navigateUserInformation = () => {
            navigate(`viewInformation/${rowData._id}`);
        };
        return <CustomButton
            border="1px solid #010120"
            borderRadius="7px"
            ButtonText="View Details"
            fontSize="14px"
            color="#010120"
            fontWeight="500"
            fullWidth={false}
            variant="outlined"
            padding="5px 10px"
            onClick={navigateUserInformation}
            background="#fff"
            hoverBg="#f5f5f5"
            hovercolor="darkgreen"
            type="button"
            width="113px"
        />
    };

    const filterEmployees = (tabValue, searchTerm) => {
        let filtered = allEmployee;
        if (tabValue === 1) {
            filtered = allEmployee.filter(employee => employee.active);
        } else if (tabValue === 2) {
            filtered = allEmployee.filter(employee => !employee.active);
        }

        if (searchTerm) {
            filtered = filtered.filter(employee =>
                employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredEmployees(filtered);
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        filterEmployees(newValue, searchTerm);
    };

    useEffect(() => {
        filterEmployees(tabValue, searchTerm);
    }, [searchTerm, allEmployee]);

    const renderActionButtons = (employee) => {
        return (
            <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                {buttonForViewInformation(employee)}
                {ToggleUserStatus(employee)}
            </Box>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <Box className='sheet-container-admin'>
            <Box 
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                mb: "20px",
            }}
            className="table-header">
                <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="user tabs">
                    <StyledTab label="All Users" />
                    <StyledTab label="Activated Users" />
                    <StyledTab label="Deactivated Users" />
                </StyledTabs>
                <CustomButton
                    ButtonText="Add User +"
                    fontSize="18px"
                    color="white"
                    fontWeight="500"
                    fullWidth={false}
                    variant="contained"
                    padding="10px 20px"
                    onClick={() => navigate('/dashboard/admin/register')}
                    background="#157AFF"
                    hoverBg="#303f9f"
                    hovercolor="white"
                    type="button"
                    width={"150px"}
                    borderRadius="7px"
                    buttonStyle={{position: "absolute", right: "0px", top: "0px"}}
                />
            </Box>
            <Box sx={{ mt: "30px" , padding: "0px 20px" }}>
                {loading ? (
                    <Box className="loaderContainer"><Loader /></Box>
                ) : (
                    <TableContainer component={Paper} className="MuiTableContainer-root">
                        <Table className="data-table">
                            <TableHead className="MuiTableHead-root">
                                <TableRow>
                                    <TableCell className="MuiTableCell-root"
                                    sx={{
                                        backgroundColor: "#E0EBFF",
                                        fontWeight: "500",
                                        padding: "12px 0px",
                                        fontSize: "18px",
                                        textAlign: "center",
                                        borderRadius: "8px 0px 0px 8px",
                                    }}
                                    >Full Name</TableCell>
                                    <TableCell sx={{
                                          backgroundColor: "#E0EBFF",
                                          fontWeight: "500",
                                          padding: "12px 0px",
                                          fontSize: "18px",
                                          textAlign: "center",
                                    }} className="MuiTableCell-root">Email</TableCell>
                                    <TableCell sx={{
                                          backgroundColor: "#E0EBFF",
                                          fontWeight: "500",
                                          padding: "12px 0px",
                                          fontSize: "18px",
                                          textAlign: "center",
                                    }} className="MuiTableCell-root">Joining Date</TableCell>
                                    <TableCell 
                                    sx={{
                                        backgroundColor: "#E0EBFF",
                                        fontWeight: "500",
                                        padding: "12px 0px",
                                        fontSize: "18px",
                                        textAlign: "center",
                                        borderRadius: "0px 8px 8px 0px",
                                  }}
                                    className="MuiTableCell-root">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="MuiTableBody-root">
                                {filteredEmployees.map((employee, index) => (
                                    <TableRow key={index} className="MuiTableRow-root">
                                        <TableCell className="MuiTableCell-root">{employee.fullName}</TableCell>
                                        <TableCell className="MuiTableCell-root">{employee.email}</TableCell>
                                        <TableCell className="MuiTableCell-root">{formatDate(employee.createdAt)}</TableCell>
                                        <TableCell className="MuiTableCell-root">{renderActionButtons(employee)}</TableCell>
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
