import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteLogin = () => {
  const user = useSelector(state => state.user);

  if (user?.isAuthenticated) {
    return<> <Navigate to="/dashboard" replace={true} />;
    </>
  }
};

export default ProtectedRouteLogin;