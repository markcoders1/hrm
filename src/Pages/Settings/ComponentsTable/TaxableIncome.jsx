
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
  
  
  
  
  const     TaxableIncome= ({mockData}) => {
    const [hoveredRow, setHoveredRow] = useState(null); 
  
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
         Taxable income (PKR*)
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
                  &nbsp;&nbsp; Over (PKR)
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
                  Not Over (PKR)
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
                  Tax on Column 1 (PKR)
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
                 Tax on Excess (%)
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
              Action
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
                    &nbsp;&nbsp; {data?.pkr}
                  </TableCell>
  
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                    {data?.notPkr}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                                    {data?.col1}

  
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center !important",
                      color: "#010120",
                    }}
                    className="MuiTableCell-root"
                  >
                                    {data?.excess}
                   
  
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
  
                </TableRow>
  
              ))}
            </TableBody>
  
          </Table>
        </TableContainer>
      </>
  
      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
            <Tooltip title="Request New WFH">
              <CustomButton
                ButtonText="+ Add Slabs"
                fontSize="12px"
                color="white"
                fontWeight="500"
                fullWidth={false}
                variant="contained"
                padding="10px 0px"
                type="submit"
                background="#157AFF"
                hoverBg="#303f9f"
                hovercolor="white"
                width={"229px"}
                borderRadius="7px"
              />
            </Tooltip>
          </Box>
    </Box>
    )
  }
  
  export default TaxableIncome