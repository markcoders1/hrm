import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(state => state.user);
  const navigate=useNavigate()
  
  
  useEffect(()=>{
    console.log("role",user.user.user.role)
    console.log("showcase",user)

    if (user.user.user.role!=="admin"){
        navigate("/dashboard")
    }
  },[])

  return children;
};

export default ProtectedAdmin;