import { useState, useEffect } from 'react';
import AppSidebar from '../components/AppSidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';


import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../Redux/NotificationCount.js';
import axiosInstance from '../auth/axiosInstance.js';
import { useNavigation } from '../auth/navigation.js';


const DefaultLayout = () => {
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const [headertext, setHeadertext] = useState("hi")
  const [paraText, setParaText] = useState("")
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [notificationCount , setNotificationCount] = useState(null)
  const formDirty = useSelector((state) => state.form.isFormDirty);

  
  useNavigation()
  const count = useSelector((state) => state.counter.count); 


  const fetchNotifications = async () => {

    const response = await  axiosInstance({
      url: `${apiUrl}/api/countNotifications`,
      method: 'get',
    })
    setNotificationCount(response?.data?.notifications)
    dispatch(setCount(notificationCount))
    // console.log(formDirty)
 
  }
 useEffect(()=>{
  fetchNotifications()
 })

  

  useEffect(() => {
    
  }, []);


  return (
    <div className={`layout-container ${sidebarShow ? 'sidebar-open' : 'sidebar-closed'}`}>
      <AppSidebar />
      <div className="outlet-box">
        <Header headertext={headertext} paraText={paraText} />
        <div className="body outlet-body flex-grow-1" style={{padding:""}} >
          <Outlet  context={{setHeadertext, setParaText}}  />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
