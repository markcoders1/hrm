import './index.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import Layout from './layouts/Layout.jsx'
import Login from './components/Login.jsx'
import 'react-toastify/dist/ReactToastify.css';
import Check from './Pages/Checkin.jsx'
import NotFound from "./components/404.jsx"
import Progress from './components/Progress.jsx'
import Admin from './Pages/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdmin from './components/ProtectedRouteForAdmin.jsx'
import { ForgotPassword } from './components/forgotPassword.jsx'

import Attendance from './components/Attendance.jsx'

import SingleLayout from './layouts/mainLayout.jsx'

import Profile from './Pages/Profile.jsx'
import ChangePassword from './components/ChangePassword.jsx'



function App() {


  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<SingleLayout />} >
              <Route path='' element={<Login />} />
              <Route path='checkin' element={<ProtectedRoute><Check /></ProtectedRoute>} />
              <Route path='changePassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route path='forgotPassword' element={<ForgotPassword />} />
              <Route path='*' element={<NotFound/>}/>
            </Route>

            <Route path='/dashboard' element={<Layout />}>
              <Route path='' element={<ProtectedRoute ><Progress /></ProtectedRoute>} />
              <Route path='profile' element={<ProtectedRoute ><Profile /></ProtectedRoute>} />
              <Route path='admin' element={<ProtectedRoute ><ProtectedAdmin ><Admin /></ProtectedAdmin></ProtectedRoute>} />
              <Route path='admin/attendance/:id' element={<ProtectedRoute ><ProtectedAdmin ><Attendance /></ProtectedAdmin></ProtectedRoute>} />
            </Route>



          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App;
