import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(state => state.user);
  const isAdmin = user?.user?.user?.role
  useEffect(()=>{
    console.log(isAdmin)
  },[])

  if (isAdmin !== 'admin') {
    return<> <Navigate to="/login" replace={true} />;
    </>
  }

  return children;
};

export default ProtectedAdmin;