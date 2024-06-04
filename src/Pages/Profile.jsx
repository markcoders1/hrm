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

    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
        // console.log(isSidebarOpen)
    };

    useEffect(()=>{
        const getProfileInfo = async () =>{
            try {
                const response = await axios({
                    url: `${apiUrl}/api/getUser`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    
                });
                console.log(response)
            } catch (error) {
                
            }
        }
        getProfileInfo()
    },[])

  return (
    <div className='profile-container' >
       <div className="profile-heading">
        <h1>YOUR PERSONAL INFORMATION</h1>
        <span className='menu-bar' onClick={handleToggleSidebar}  >
            <IoMenuOutline/>
        </span>
       </div>
       <div className="profile-information-container">


       </div>



    </div>
  )
}

export default Profile