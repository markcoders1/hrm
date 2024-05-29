import { useState, useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Home() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <h1>home, where check in check out will</h1>
        </>
    );
}

export default Home;
