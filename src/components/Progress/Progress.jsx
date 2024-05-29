import React, { useEffect, useState } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Progress.css';

const AttendanceSheet = () => {
    const dataOfUsers = [
        {
            id: 1,
            code: 100,
            name: ' hsdnisanids',
            class: 'XII',
            age: "22"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19"
        },
        {
            id: 3,
            code: 300,
            name: 'alley',
            class: 'undergraduate',
            age: "24"
        },
        {
            id: 1,
            code: 100,
            name: 'mark',
            class: 'XII',
            age: "22"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19"
        },
        {
            id: 3,
            code: 300,
            name: 'alley',
            class: 'undergraduate',
            age: "24"
        },
        {
            id: 1,
            code: 100,
            name: 'mark',
            class: 'XII',
            age: "22"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19"
        },
        {
            id: 3,
            code: 300,
            name: 'alley',
            class: 'undergraduate',
            age: "24"
        },
        {
            id: 1,
            code: 100,
            name: 'mark',
            class: 'XII',
            age: "22"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19"
        },
        {
            id: 3,
            code: 300,
            name: 'alley',
            class: 'undergraduate',
            age: "24"
        },
        {
            id: 1,
            code: 100,
            name: 'mark',
            class: 'XII',
            age: "22"
        },
        {
            id: 2,
            code: 466,
            name: 'john',
            class: 'X',
            age: "19"
        },
        {
            id: 3,
            code: 300,
            name: 'alley',
            class: 'undergraduate',
            age: "24"
        }
    ];

    return (
        <div className='sheet-container'>
            <h1 style={{ textAlign: 'center' }}>Attendance Sheet</h1>

            <div>
                <DataTable
                    id='datatable-container-user'
                    value={dataOfUsers}
                    tableStyle={{ minWidth: '30rem', maxWidth: '100%', margin: 'auto' }}
                    paginator
                    rows={10}
                    sortField="id"
                    sortOrder={1}
                >
                    <Column field="id" header="Sr. no" sortable></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="code" header="Code no"></Column>
                    <Column field="class" header="Class"></Column>
                    <Column field="age" header="Age"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default AttendanceSheet;
