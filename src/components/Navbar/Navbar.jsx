import React, { useEffect } from 'react'
import './Navbar.css'
import { TbBrandRedux } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { SiRedux } from "react-icons/si";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// funtionality of logout and login in
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/userSlice'; // Import the logout action
import { clearCart } from '../../Redux/cartSlice';

const Navbar = () => {
  const itemsOfCart = useSelector(state => state.cart || [])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const handleLgout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');

  }

  return (
    <div className='navbar-container'>
      <nav>
        <div className="left">
          <NavLink to='/' id="left"><SiRedux /></NavLink>
          {user.isAuthenticated ?
          <>  <button onClick={handleLgout} id='logout-btn'  >Logout</button>
            <NavLink to='profile' >Profile</NavLink>
            </>
            : <>
              <NavLink to='/login' id="">Login</NavLink>
              <NavLink to='/signup' id="">Sign Up</NavLink>
            </>
          }


        </div>
        <NavLink to='/cart' id="right">
          <span>{itemsOfCart.length}</span>
          <IoCartOutline />
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
