import React, { useEffect, useState } from 'react';
import '../PagesCss/Home.css';
import '../components/Checkin/Checkin.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoIosCheckmark } from "react-icons/io";
import Checkin from '../components/Checkin/Checkin';

const Home = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
 
  const user = useSelector(state => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleCheckInClick = () => {
    setIsCheckedIn(true);
  };

  const handleCheckOutClick = () => {
    setIsCheckedIn(false);
  };

  return (
    <div className='Home-container'>
      <div className="buttons">
       <Checkin/>
      </div>
    </div>
  );
};

export default Home;
