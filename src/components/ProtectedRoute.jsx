import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.user);
  const navigate=useNavigate()

  useEffect(()=>{
    if (user.user==null){
        navigate("/login")
    }
  },[])

  return children;
};

export default ProtectedRoute;