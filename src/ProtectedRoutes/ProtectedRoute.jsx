import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem('refreshToken');
  const userRole = useSelector((state) => state.user.user.role);
  const refreshTokenFromState = useSelector(
    (state) => state.user.user.refreshToken
  );
  const navigate = useNavigate()

  useEffect(() => {
    if (refreshTokenFromState == null) {
      navigate("/");
    }
  }, [])

  return children;
};

export default ProtectedRoute;







