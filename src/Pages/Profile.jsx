import React, { useEffect, useState } from 'react'
import '../PagesCss/Profile.css'
import { IoMenuOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from '../Redux/toggleSidebar';
import axios from 'axios';



const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Profile = () => {
    const [yourData, setYourData] = useState([]);
    const user = useSelector((state) => state.user?.user);
    const accessToken = user?.accessToken || "";
    useEffect(()=>{
        console.log(yourData)
    },[])
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
        // console.log(isSidebarOpen)
    };

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                const response = await axios({
                    url: `${apiUrl}/api/getUser`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },

                });
                console.log(response.data.user);
                setYourData(response.data.user)

            } catch (error) {

            }
        }
        
        getProfileInfo()
    }, [])

  

    return (
        <div className='profile-container' >
            <div className="profile-heading">
                <h1>YOUR PERSONAL INFORMATION</h1>
                <span className='menu-bar' onClick={handleToggleSidebar}  >
                    <IoMenuOutline />
                </span>
            </div>
            <div className="profile-information-container">

                <div className="input-box">
                    <label >First Name : &nbsp; <p>{yourData.firstName}</p> </label>
                </div>
                <div className="input-box">
                    <label >Last Name : &nbsp; <p>{yourData.lastName}</p> </label>
                </div>
                <div className="input-box">
                    <label >Email : &nbsp; <p>{yourData.email}</p> </label>
                </div>
                <div className="input-box">
                    <label >Phone : &nbsp; <p>{yourData.phone}</p> </label>
                </div>
                <div className="input-box">
                    <label >Department : &nbsp; <p>{yourData.department}</p> </label>
                </div>
                <div className="input-box">
                    <label >Designation : &nbsp; <p>{yourData.designation}</p> </label>
                </div>
                
                <div className="input-box">
                    <label >Shift : &nbsp; <p>{yourData.shift}</p> </label>
                </div>
                <div className="input-box">
                    <label >Team Lead : &nbsp; <p>{yourData.teamLead}</p> </label>
                </div>
                <div className="input-box">
                    <label >Status : &nbsp; <p>{yourData.status}</p> </label>
                </div>
                

            </div>



        </div>
    )
}

export default Profile