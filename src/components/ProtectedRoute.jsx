import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken == null) {
      navigate("/")
    }
  }, [])

  return children;
};

export default ProtectedRoute;







