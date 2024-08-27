import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './Pages/forgotPassword.jsx';
import { Suspense } from 'react';
import React from 'react';
import { PageLoader } from './components/Loaders.jsx';
// protected Route
const ProtectedRoute = React.lazy(() => import('./ProtectedRoutes/ProtectedRoute.jsx'));
const ProtectedAdmin = React.lazy(() => import('./ProtectedRoutes/ProtectedRouteForAdmin.jsx'));
const Login = React.lazy(() => import('./Pages/Login.jsx'));
const Check = React.lazy(() => import('./Pages/Checkin.jsx'));
const NotFound = React.lazy(() => import('./Pages/404.jsx'));
const Attendance = React.lazy(() => import('./Pages/Attendance.jsx'));
const UserAttendance = React.lazy(() => import('./Pages/UserAttendance.jsx'));
const SingleLayout = React.lazy(() => import('./layouts/mainLayout.jsx'));
const DefaultLayout = React.lazy(() => import('./layouts/defaultlayout.jsx'));
const Profile = React.lazy(() => import('./Pages/Profile.jsx'));
const ChangePassword = React.lazy(() => import('./Pages/ChangePassword.jsx'));
const UserInfo = React.lazy(() => import('./Pages/UserInfo.jsx'));
const Register = React.lazy(() => import('./Pages/Admin/Register.jsx'));
const EmployeeData = React.lazy(() => import('./Pages/Admin/UserManagement.jsx'));
const EmployeeAttendance = React.lazy(() => import('./Pages/Admin/EmployeeAttendance.jsx'));
const Devices = React.lazy(() => import('./Pages/Devices.jsx'));
import store from './store.js';
import ProtectedAdminCheckin from './ProtectedRoutes/ProtectedRouteForCheckinAdmin.jsx';
// const Dashboard = React.lazy(() => import('./Pages/Dashboard.jsx')
// const UserDetailsStatic = React.lazy(() => import('./Pages/UserDetailsStatic.jsx')

const Dashboard = React.lazy(() => import('./Pages/Admin/DashboarAdmin.jsx'));
const UserDetailsStatic = React.lazy(() => import('./Pages/Admin/UserDetailsStatic.jsx'));
const Notifications = React.lazy(() => import('./Pages/Notification.jsx'));
const LeaveManagement = React.lazy(() => import('./Pages/Admin/LeaveManagement.jsx'));
const LeaveDetailsAdmin = React.lazy(() => import('./Pages/Admin/LeaveDetails.jsx'));
const WFHManagement = React.lazy(() => import('./Pages/Admin/WFHManagement.jsx'));
const WFHDetails = React.lazy(() => import('./Pages/Admin/WFHDetails.jsx'));
const MyNotifications = React.lazy(() => import('./Pages/User/MyNotifications.jsx'));










// import Home from './Pages/Home.jsx'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/' element={<SingleLayout />}>
                <Route path='' element={<Login />} />
                <Route path='checkin' element={<ProtectedRoute><ProtectedAdminCheckin><Check /></ProtectedAdminCheckin></ProtectedRoute>} />
                <Route path='password-reset/:token' element={<ChangePassword />} />
                <Route path='forgotPassword' element={<ForgotPassword />} />
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/dashboard' element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
              <Route path='' element={<Check />} />

                <Route path='profile' element={<Profile />} />
                <Route path='my-notifications' element={<MyNotifications />} />

                <Route path='notifications' element={<Notifications />} />

                <Route path='admin' element={<Dashboard />} />
                <Route path='progress' element={<Attendance />} />
                <Route path='devices' element={<Devices />} />
                <Route path='user-management' element={<EmployeeData />} /> {/* here protecte Admin will be implement */}
                <Route path='attendance' element={<ProtectedAdmin><EmployeeAttendance /></ProtectedAdmin>} /> 
                <Route path='leave-management' element={<ProtectedAdmin><LeaveManagement /></ProtectedAdmin>} /> 
                <Route path='leave-management/leave-details' element={<ProtectedAdmin><LeaveDetailsAdmin /></ProtectedAdmin>} /> 


                <Route path='attendance-management/viewAttendance' element={<ProtectedAdmin><UserAttendance /></ProtectedAdmin>} />
                <Route path='user-management/register' element={<ProtectedAdmin><Register /></ProtectedAdmin>} />
                <Route path='user-management/viewInformation/:id' element={<ProtectedAdmin><UserInfo /></ProtectedAdmin>} />
                <Route path='user-management/user-detail/:id' element={<ProtectedAdmin><UserDetailsStatic /></ProtectedAdmin>} />

                <Route path='wfh-management' element={<ProtectedAdmin><WFHManagement /></ProtectedAdmin>} />
                <Route path='wfh-management/wfh-details/:id' element={<ProtectedAdmin><WFHDetails  /></ProtectedAdmin>} />



              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default App;