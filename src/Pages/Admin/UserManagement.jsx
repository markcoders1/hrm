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
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from "../../auth/axiosInstance";
import { Loader } from "../../components/Loaders";
import CustomButton from "../../components/CustomButton/CustomButton"; // Adjust the import path as needed
import "../../PagesCss/Employee.css"; // Import the CSS file for custom styles
import editIcon from "../../assets/EditIcon.png";

import { useLocation } from "react-router-dom";
import CustomTextField from "../../components/CustomInput/CustomInput";
import CustomInputLabel from "../../components/CustomInputField/CustomInputLabel";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "black",
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: "none",
  minWidth: 72,
  fontWeight: theme.typography,
  marginRight: theme.spacing(4),
  color: "#9B9B9B",
  fontSize: "22px",
  "&.Mui-selected": {
    color: "black",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

const EmployeeData = () => {
  const navigate = useNavigate();
  const { setHeadertext, setParaText } = useOutletContext();
  const [allEmployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const getAllUser = async () => {
      try {
      

        const response = await axiosInstance({
          url: `${apiUrl}/api/admin/getAllUsers`,
          method: "get",
        });

        const dataAllEmployee = response.data;

        setAllEmployee(dataAllEmployee);
        setFilteredEmployees(dataAllEmployee);
        setLoading(false);
        setHeadertext("User Management");
        setParaText(`${response.data.length} Users Found`);
      } catch (error) {
        console.error(error);

        setLoading(false);
      }
    };
    getAllUser();
  }, []);

  // const DeleteUser = (rowData) => {
  //     const handleDelete = () => {
  //         axiosInstance({
  //             method: "get",
  //             url: `${apiUrl}/api/admin/delete-user`,
  //             params: {
  //                 id: `${rowData._id}`
  //             }
  //         }).then(() => {
  //             const updatedEmployees = allEmployee.filter(emp => emp._id !== rowData._id);
  //             setAllEmployee(updatedEmployees);
  //             filterEmployees(tabValue, searchTerm); // Update filtered employees
  //         })
  //     }
  //     return <CustomButton
  //         border="1px solid"
  //         borderRadius="4px"
  //         ButtonText="Delete"
  //         fontSize="14px"
  //         color="red"
  //         fontWeight="500"
  //         fullWidth={false}
  //         variant="outlined"
  //         padding="5px 10px"
  //         onClick={handleDelete}
  //         background="#fff"
  //         hoverBg="#f5f5f5"
  //         hovercolor="darkred"
  //         type="button"
  //     />
  // }

  const buttonForViewInformation = (rowData) => {
    const navigateUserInformation = () => {
      navigate(`user-detail/${rowData._id}`);
    };
    return (
      <CustomButton
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
        hoverBg="#157AFF"
        hovercolor="darkgreen"
        type="button"
        width="113px"
        hoverBorder="#010120"
      />
    );
  };

  const buttonForEditInformation = (rowData) => {
    const navigateUserInformation = () => {
      navigate(`/dashboard/user-management/viewInformation/${rowData._id}`);
    };

    return (
      <Box
        onClick={navigateUserInformation}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "7px",
          fontSize: "14px",
          color: "#010120",
          fontWeight: "500",
          width: "27px",
          height: "27px",
          padding: "5px 10px",
          backgroundColor: "#fff",
          cursor: "pointer",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
          "&:hover": {
            backgroundColor: "#157AFF", // Or any other color you prefer
            color: "darkgreen",
            borderColor: "#010120",
          },
        }}
      >
        <img
          src={editIcon}
          style={{ width: "21.75px", height: "21.75px" }}
          alt="Edit"
        />
      </Box>
    );
  };

  const filterEmployees = (tabValue, searchTerm) => {
    let filtered = allEmployee;
    if (tabValue === 0) {
      filtered = allEmployee.filter((employee) => employee.active);
    } else if (tabValue === 1) {
      filtered = allEmployee.filter((employee) => !employee.active);
    } 

    if (searchTerm) {
      filtered = filtered.filter(
        (employee) =>
          employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    filterEmployees(newValue, searchTerm);
  };

  useEffect(() => {
    filterEmployees(tabValue, searchTerm);
  }, [searchTerm, allEmployee]);

  const renderActionButtons = (employee) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: "5rem",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        {buttonForViewInformation(employee)}
        {buttonForEditInformation(employee)}
      </Box>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Box className="sheet-container-admin" >
      {/* add search input field here with functionality */}
      <Box sx={{width:{lg:"380px", xs:"100%"},position:{lg:"absolute", xs:"static"}, right:"40px", top:"40px", zIndex:"100000 "}} >

  
      <CustomInputLabel
        height={"56px"}
        fontSize={"20px"}
        showSearchIcon={true}
        placeholder={"Search User"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
      />
    </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          mb: "20px",
          padding: "0px 20px",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          flexWrap: "wrap",
          gap: "2rem",
        }}
        className="table-header"
      >
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="user tabs"
        >
          <StyledTab label="Active" />
          <StyledTab label="Deactivated" />
         
        </StyledTabs>
        <CustomButton
          ButtonText="Add User +"
          fontSize="18px"
          color="white"
          fontWeight="500"
          fullWidth={false}
          variant="contained"
          padding="10px 20px"
          onClick={() => navigate("/dashboard/user-management/register")}
          background="#157AFF"
          hoverBg="#303f9f"
          hovercolor="white"
          type="button"
          width={"150px"}
          borderRadius="7px"
          buttonStyle={{ fontSize: { sm: "18px", xs: "15px" } }}
        />
      </Box>
      <Box sx={{ mt: "30px", padding: "0px 20px" }}>
        {loading ? (
          <Box className="loaderContainer">
            <Loader />
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
                      padding: "0px 0px",
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
                      padding: "0px 0px",
                      fontSize: {
                        sm: "21px",
                        xs: "16px",
                      },
                      textAlign: "start",
                      color: "#010120",
                      paddingLeft: "40px",
                    }}
                  >
                    Full Name
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
                      textAlign: "start",
                      color: "#010120",
                      paddingLeft: "0px",
                    }}
                  >
                    Email
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
                      textAlign: "start",
                      color: "#010120",
                    }}
                  >
                    Joining Date
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
                      textAlign: "start",
                      borderRadius: "0px 8px 8px 0px",
                      color: "#010120",
                      paddingLeft: "10px !important",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="MuiTableBody-root">
                {filteredEmployees.map((employee, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      border: "2px solid #FFA100",
                    }}
                    className="MuiTableRow-root"
                  >
                    <TableCell
                      sx={{
                        borderRadius: "8px 0px 0px 8px",
                        color: "white",
                        textAlign: "start !important",
                        paddingLeft: "40px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.companyId}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        textAlign: "start !important",
                        paddingLeft: "40px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.fullName}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "start !important",
                        paddingLeft: "0px !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {employee.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "start !important",
                        paddingLeft: "0px !important",
                        color: "#99999C !important",
                      }}
                      className="MuiTableCell-root"
                    >
                      {formatDate(employee.createdAt)}
                    </TableCell>
                    <TableCell
                      sx={{ borderRadius: "0px 8px 8px 0px" }}
                      className="MuiTableCell-root"
                    >
                      {renderActionButtons(employee)}
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

export default EmployeeData;
