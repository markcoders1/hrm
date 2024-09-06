import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const ProtectedAdmin = ({ children }) => {
  const navigate=useNavigate()

  const apiUrl= import.meta.env.VITE_REACT_APP_API_URL
  
    useEffect(()=>{
      (async function(){
          const res =await axiosInstance({
              method:"get",
              url:`${apiUrl}/api/isAdmin`,
          })
          if (res.data.isAdmin=="user"){
            navigate("/dashboard")
        }
      })()
  },[])

  return children;
};

export default ProtectedAdmin;