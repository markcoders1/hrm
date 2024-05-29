import './index.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store, { persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
// import ProtectedRoute from './components/ProtectedRoute'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import Header from './components/Header/Header.jsx'
import Home from './Pages/Home.jsx'
import Progress from './components/Progress/Progress.jsx'
import Admin from './Pages/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdmin from './components/ProtectedRouteForAdmin.jsx'
import ProtectedRouteLogin from './components/ProtectedRouteForLogin.jsx'



function App() {


  return (



    <div className='home-layouting' >
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <BrowserRouter>
          {/* <div className="dark-background">

          </div> */}
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<ProtectedRouteLogin children={<Login/>}/>} />
              {/* <Route path='/Dashboard' element={<ProtectedRoute children={<Progress />} />} />
              <Route path='/admin' element={<ProtectedRoute children={<ProtectedAdmin children={<Admin />} />} />} /> */}
              <Route path='/Dashboard' element={<Progress/>}/>
              <Route path='/admin' element={<Admin/>} />

            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App;
