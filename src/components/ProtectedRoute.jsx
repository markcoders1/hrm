import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.user);

  if (!user?.isAuthenticated) {
    return<> <Navigate to="/login" replace={true} />;
    </>
  }

  return children;
};

export default ProtectedRoute;