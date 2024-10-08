import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const ProtectedAdminCheckin = ({ children }) => {
  const navigate=useNavigate()

  const apiUrl= import.meta.env.VITE_REACT_APP_API_URL
  
  useEffect(()=>{
    (async function(){
        const res =await axiosInstance({
            method:"get",
            url:`${apiUrl}/api/isAdmin`,
        })
        if (res.data.isAdmin==="admin"){
          navigate("/dashboard")
      }
    })()
},[])

  return children;
};

export default ProtectedAdminCheckin;