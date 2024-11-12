
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Paper,
    Typography,
    Tooltip
  } from "@mui/material";
  
  import "../../../PagesCss/Employee.css";
  
  import eyeIcon from "../../../assets/eye.png";
  import deleteIcon from "../../../assets/deleteIcon.png";
  
  import editIconWhite from "../../../assets/editIconGroup.png";
  import { useState } from "react";
  import CustomButton from "../../../components/CustomButton/CustomButton";
  
  
  
  
  const BankPlatform= ({mockData}) => {
    const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row
  
    return (
      <Box>
           <Typography
          sx={{
              fontWeight:"500",
              fontSize:"30px",
              color:"#010120",
              mt:"35px"   
          }}
          >
          Bank/ Platform Settings
          </Typography>
      <>
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
                    textAlign: "start !important",
                    borderRadius: "8px 0px 0px 8px",
                    color: "#010120",
                    minWidth: "80px",
  
                  }}
                >
                  &nbsp;&nbsp; Active Departments
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
                    textAlign: "center !important",
                    color: "#010120",
                    minWidth: "150px",
                  }}
                >
                  View Active List
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
                    textAlign: "center !important",
                    color: "#010120",
                    minWidth: "150px",
                  }}
                >
                  Edit Department
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
                    textAlign: "center !important",
                    paddingLeft: "10px !important",
                    borderRadius: "0px 8px 8px 0px",
                    color: "#010120",
                  }}
                >
                  Delete Department
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="MuiTableBody-root">
              {mockData.map((data, index) => (
                <TableRow
                  key={data.employeeId}
                  className="MuiTableRow-root"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
  
                  sx={{
                    backgroundColor:
                      hoveredRow === index ? "#D1E4FF" : "inherit",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      borderRadius: "8px 0px 0px 8px",
                      color: "#010120",
                      textAlign: "start !important",
                    }}
                    className="MuiTableCell-root"
                  >
                    &nbsp;&nbsp; {data.employeeId}
                  </TableCell>
  
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                    <img src={eyeIcon} alt="" />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                    <img src={editIconWhite} alt="" />
  
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      paddingLeft: "10px !important",
                      borderRadius: "0px 8px 8px 0px",
                    }}
                    className="MuiTableCell-root"
                  >
                    <img src={deleteIcon} alt="" />
  
                  </TableCell>
  
                </TableRow>
  
              ))}
            </TableBody>
  
          </Table>
        </TableContainer>
      </>
  
      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
            <Tooltip title="Request New WFH">
              <CustomButton
                ButtonText="+ Add New Platform"
                fontSize="16px"
                color="white"
                fontWeight="500"
                fullWidth={false}
                variant="contained"
                padding="10px 0px"
                type="submit"
                background="#157AFF"
                hoverBg="#303f9f"
                hovercolor="white"
                width={"210px"}
                borderRadius="7px"
              />
            </Tooltip>
          </Box>
    </Box>
    )
  }
  
  export default BankPlatform