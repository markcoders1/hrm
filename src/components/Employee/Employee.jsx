import React, { useEffect } from 'react'
import './Employee.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import env from '../../../env.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = env.REACT_APP_API_URL;

const Employee = () => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const [allEmployee, setAllEmplolyee] = useState([])


    const accessToken = user?.user?.accessToken || '';

        useEffect(()=>{
            const getAllUser =async () =>{
                try {
                    const response = await axios({
                      url: `${apiUrl}/api/admin/getAllUsers`,
                      method: "get",
                      headers: {
                        Authorization: `Bearer ${accessToken}`
                      }
                    });
                    const dataAllEmpoyee = response.data;
                    setAllEmplolyee(dataAllEmpoyee)
                    // console.log(allEmployee)
                    console.log(response);
                    
                    
              
                  } catch (error) {
                    console.error(error);
                    
                  }
        } 
        getAllUser()
        },[])

        const buttonForViewDetails = (rowData) => {

            const navigateUserdetail = () =>{
                navigate(`getattendance/${rowData._id}`)
                
            }
            return (
                    <button onClick={navigateUserdetail} >View Details</button>
            );
        };

       
       
    return (
        <>
            <div className='sheet-container-admin'>
                <div>
                    <DataTable
                        id='datatable-container'
                        value={allEmployee}
                        tableStyle={{ minWidth: '50rem', maxWidth: '100%', margin: 'auto' }}
                        paginator
                        rows={10}
                        sortField="id"
                        sortOrder={1}
                    >
                        <Column field="firstName" header="First Name" sortable></Column>
                        <Column field="lastName" header="Last Name"></Column>
                        <Column field="role" header="Role"></Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="department" header="Department"></Column>
                        <Column field="designation" header="Designation"></Column>
                        <Column field="shift" header="Shift"></Column>
                        <Column field="teamLead" header="Team Lead"></Column>
                        <Column body={buttonForViewDetails} header="View Details"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default Employee