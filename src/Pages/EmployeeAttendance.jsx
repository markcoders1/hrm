import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from "../components/CustomButton/CustomButton"; // Adjust the import path as needed
import { Loader } from "../components/Loaders";
import axiosInstance from "../auth/axiosInstance";
import "../PagesCss/Employee.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const EmployeeAttendance = () => {
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
    }, [setHeadertext]);

    const buttonForViewDetails = (rowData) => {
        const navigateUserDetail = () => {
            navigate(`viewAttendance/${rowData._id}`);
        };
        return (
            <CustomButton
                border="1px solid #157AFF"
                borderRadius="7px"
                ButtonText="Attendance"
                fontSize="14px"
                color="#157AFF"
                fontWeight="500"
                fullWidth={false}
                variant="outlined"
                padding="5px 10px"
                onClick={navigateUserDetail}
                background="#fff"
                hoverBg="#157AFF"
                hovercolor="white"
                width="120px"
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
            <Box className="table-header" sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by Name & Email"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-box-input"
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                {loading ? (
                    <Box className="loaderContainer"><Loader /></Box>
                ) : (
                    <TableContainer component={Paper} className="MuiTableContainer-root">
                        <Table className="data-table">
                            <TableHead className="MuiTableHead-root">
                                <TableRow
                                    className="header-row"
                                    sx={{
                                        backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                        '&:hover': {
                                            backgroundImage: `linear-gradient(90deg, #E0EBFF 0%, #E0EBFF 100%) !important`,
                                        },
                                        padding: "0px"
                                    }}
                                >
                                    <TableCell className="MuiTableCell-root-head" sx={{
                                        fontWeight: "500",
                                        padding: "12px 0px",
                                        fontSize: {
                                            sm: "21px",
                                            xs: "16px"
                                        },
                                        textAlign: "start",
                                        borderRadius: "8px 0px 0px 8px",
                                        color: "#010120",
                                        paddingLeft: "40px"
                                    }}>Full Name</TableCell>
                                    <TableCell className="MuiTableCell-root-head" sx={{
                                        fontWeight: "500",
                                        padding: "12px 0px",
                                        fontSize: {
                                            sm: "21px",
                                            xs: "16px"
                                        },
                                        textAlign: "start",
                                        color: "#010120",
                                        paddingLeft: "0px"
                                    }}>Email</TableCell>
                                    <TableCell className="MuiTableCell-root-head" sx={{
                                        fontWeight: "500",
                                        padding: "12px 0px",
                                        fontSize: {
                                            sm: "21px",
                                            xs: "16px"
                                        },
                                        textAlign: "start",
                                        borderRadius: "0px 8px 8px 0px",
                                        color: "#010120",
                                        paddingLeft:"10px !important"
                                    }}>Attendance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="MuiTableBody-root">
                                {filteredEmployees.map((employee, index) => (
                                    <TableRow key={index} className="MuiTableRow-root">
                                        <TableCell sx={{ borderRadius: "8px 0px 0px 8px", color: "#010120", textAlign: "start !important", paddingLeft: "40px !important"
                                        }} className="MuiTableCell-root">{employee.fullName}</TableCell>
                                        <TableCell sx={{ textAlign: "start !important", paddingLeft: "0px !important" }} className="MuiTableCell-root">{employee.email}</TableCell>
                                        <TableCell sx={{ textAlign: "start !important", paddingLeft: "10px !important" }} className="MuiTableCell-root">
                                            {buttonForViewDetails(employee)}
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

export default EmployeeAttendance;
