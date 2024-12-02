
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
import { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import axiosInstance from "../../../auth/axiosInstance";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";




const ActiveRole= ({mockData}) => {
  const [hoveredRow, setHoveredRow] = useState(null); 
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchCompanyData = async () => {
    const response = await axiosInstance.get(`${apiUrl}/api/admin/settings/roles`, {

    });
    console.log(response)
    setRoles(response.data);
    // const data = response;
  }

  useEffect(()=>{
    fetchCompanyData();
  },[])

  


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
       Active Roles
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
                &nbsp;&nbsp; Active Roles
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
                  paddingLeft: "10px !important",
                  borderRadius: "0px 8px 8px 0px",
                  color: "#010120",
                }}
              >
                Edit Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="MuiTableBody-root">
            {roles.map((data, index) => (
              <TableRow
                key={data._id}
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
                  &nbsp;&nbsp; {data?.name}
                </TableCell>

                <TableCell
                  sx={{
                    textAlign: "center !important",
                    color: "#010120",
                  }}
                  className="MuiTableCell-root"
                >
                     <Tooltip
                  title={"View Role"}
                  >

                    <Typography
                          sx={{
                            width: "45px",
                            height: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            m:"auto",

                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                            },
                          }}
                          onClick={()=> navigate("")}
                        >
                  <img src={eyeIcon} alt="" />
                  </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center !important",
                    color: "#010120",
                  }}
                  className="MuiTableCell-root"
                >
                     <Tooltip
                  title={"Edit Role"}
                  >

                    <Typography
                          sx={{
                            width: "45px",
                            height: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            m:"auto",

                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                            },
                          }}
                          // onClick={}
                        >
                  <img src={editIconWhite} alt="" />
                  </Typography>
                  </Tooltip>


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
              ButtonText="+ Add New Role"
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

export default ActiveRole