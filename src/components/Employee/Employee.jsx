import React from 'react'
import './Employee.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Employee = () => {

    const dataOfUsers = [
        {
            id: 1,
            code: 100,
            name: 'mark',
            class: 'XII',
            age: "22",
            details: "link"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19",
            details: "link"
        }]
    return (
        <>
            <div className='sheet-container-admin'>
                <div>
                    <DataTable
                        id='datatable-container'
                        value={dataOfUsers}
                        tableStyle={{ minWidth: '50rem', maxWidth: '100%', margin: 'auto' }}
                        paginator
                        rows={10}
                        sortField="id"
                        sortOrder={1}
                    >
                        <Column field="id" header="Code No. " sortable></Column>
                        <Column field="name" header="Employee Name"></Column>
                        <Column field="class" header="Shift"></Column>
                        <Column field="age" header="Email"></Column>
                        <Column field="age" header="Phone"></Column>
                        <Column field="age" header="Department"></Column>
                        <Column field="age" header="Designation"></Column>
                        <Column field="details" header="View Details"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default Employee