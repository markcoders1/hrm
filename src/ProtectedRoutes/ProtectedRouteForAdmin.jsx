import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';
import { useSelector } from 'react-redux';
const ProtectedAdmin = ({ children }) => {
  const navigate=useNavigate();
  const user = useSelector(state => state.user.user);
  // console.log(user)


  const apiUrl= import.meta.env.VITE_REACT_APP_API_URL
  
    useEffect(()=>{
     
          if (user.role=="user"){
            navigate("/dashboard")
        }
    
  },[])

  return children;
};

export default ProtectedAdmin;