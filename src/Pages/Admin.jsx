import { useState } from 'react';
import '../PagesCss/Admin.css';
import { MdOutlineGroupAdd, MdOutlineGroups, MdGroups, MdGroupAdd } from "react-icons/md";
import Register from '../components/Signup/Signup';
import Employee from '../components/Employee/Employee';

// import { useSelector, useDispatch } from "react-redux";

import { IoMenuOutline } from "react-icons/io5";

// import { toggleSidebar } from '../Redux/toggleSidebar';

const Admin = () => {
    const [showComponent, setShowComponent] = useState('employees');


    // const dispatch = useDispatch();
    // const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    // const handleToggleSidebar = () => {
    //     dispatch(toggleSidebar());
    //     // console.log(isSidebarOpen)
    // };


    const toggleComponents = (componentToShow) => {
        setShowComponent(componentToShow);
    };

    const renderComponent = () => {
        switch (showComponent) {
            case 'employees':
                return <Employee />;
            case 'register':
                return <Register />;
            default:
                return <Employee />;
        }
    };

    return (
        <div className='admin-container'>
            <div className="state-buttons">
                <span>

                    <button
                        className={showComponent === 'employees' ? 'isactive' : ''}
                        onClick={() => toggleComponents('employees')}
                    >
                        <span>{showComponent === 'employees' ? <MdGroupAdd /> : <MdOutlineGroupAdd />}</span>
                        <h1>Employees</h1>
                    </button>
                    <button
                        className={showComponent === 'register' ? 'isactive' : ''}
                        onClick={() => toggleComponents('register')}
                    >
                        <span>{showComponent === 'register' ? <MdGroups /> : <MdOutlineGroups />}</span>
                        <h1>Register</h1>
                    </button>
                </span>
                <span  className='menu-bar'>
                    <IoMenuOutline/>
                </span>
            </div>
            <br />
            {renderComponent()}
        </div>
    );
}

export default Admin;
