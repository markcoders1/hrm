import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteLogin = ({ children }) => {
  const user = useSelector(state => state.user);

  if (user?.isAuthenticated) {
    return<> <Navigate to="/" replace={true} />;
    </>
  }

  return children;
};

export default ProtectedRouteLogin;