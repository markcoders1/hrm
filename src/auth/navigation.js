// src/utils/navigation.js
import { useNavigate as useReactNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

let navigateFn = null; 

export const useNavigation = () => {
  const navigate = useReactNavigate();
  const navigateRef = useRef(navigate);

  useEffect(() => {
    navigateFn = navigate; 
    navigateRef.current = navigate;
  }, [navigate]);

  return navigateRef.current;
};

export const navigate = (path, options) => {
  if (navigateFn) {
    navigateFn(path, options);
  } else {
    console.error('Navigate function is not initialized yet.');
  }
};
