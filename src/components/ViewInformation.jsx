import React from 'react'
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../css/Attendance.css";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../auth/axiosInstance";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const viewInformation = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allEmployee, setAllEmployee] = useState([]);
  const { id } = useParams();
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken");
    setAccessToken(accessToken);
  },[])

  useEffect(() => {
    const getSpecificUser = async () => {
        try {
            const response = await axiosInstance({
                url: `${apiUrl}/api/admin/getUser`,
                method: "get",
                params: {
                   userId: id,
                }
            });
            const dataAllEmployee = response.data;
            setAllEmployee(dataAllEmployee);
            
            // setLoading(false)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    getSpecificUser();
}, []);


  return (
    <div className='view'>
      <h1>Hello View Information

      {id}

      </h1>
    </div>
  )
}

export default viewInformation