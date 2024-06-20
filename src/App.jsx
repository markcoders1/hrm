import './index.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './components/forgotPassword.jsx'

import Login from './components/Login.jsx'
import Check from './Pages/Checkin.jsx'
import NotFound from "./components/404.jsx"
import Progress from './components/Progress.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdmin from './components/ProtectedRouteForAdmin.jsx'
import Attendance from './components/Attendance.jsx'
import SingleLayout from './layouts/mainLayout.jsx'
import DefaultLayout from './layouts/defaultlayout.jsx'
import Profile from './Pages/Profile.jsx'
import ChangePassword from './components/ChangePassword.jsx'
import ViewInformation from './components/ViewInformation.jsx'
import Register from './components/Signup.jsx';
import Employee from './components/Employee.jsx';

// import React from 'react'

// const Login =React.lazy(()=>import('./components/Login.jsx'))
// const Check =React.lazy(()=>import('./Pages/Checkin.jsx'))
// const NotFound =React.lazy(()=>import("./components/404.jsx"))
// const Progress =React.lazy(()=>import('./components/Progress.jsx'))
// const Admin =React.lazy(()=>import('./Pages/Admin.jsx'))
// const ProtectedRoute =React.lazy(()=>import('./components/ProtectedRoute'))
// const ProtectedAdmin =React.lazy(()=>import('./components/ProtectedRouteForAdmin.jsx'))
// const Attendance =React.lazy(()=>import('./components/Attendance.jsx'))
// const SingleLayout =React.lazy(()=>import('./layouts/mainLayout.jsx'))
// const DefaultLayout =React.lazy(()=>import('./layouts/defaultlayout.jsx'))
// const Profile =React.lazy(()=>import('./Pages/Profile.jsx'))
// const ChangePassword =React.lazy(()=>import('./components/ChangePassword.jsx'))
// const ViewInformation =React.lazy(()=>import('./components/ViewInformation.jsx'))

import store from './store.js'



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
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path='/dashboard' element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
              <Route path='' element={<Progress />} />
              <Route path='profile' element={<Profile />} />
              <Route path='admin' element={<ProtectedAdmin ><Employee /></ProtectedAdmin>} />
              <Route path='admin/attendance/:id' element={<ProtectedAdmin ><Attendance /></ProtectedAdmin>} />
              <Route path='admin/register' element={<ProtectedAdmin ><Register /></ProtectedAdmin>} />
              <Route path='admin/viewInformation/:id' element={<ProtectedAdmin ><ViewInformation /></ProtectedAdmin>} />
            </Route>



          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App;
