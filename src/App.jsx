import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './components/forgotPassword.jsx';
import { Suspense } from 'react';
import React from 'react';
import { PageLoader } from './components/Loaders.jsx';

const Login = React.lazy(() => import('./components/Login.jsx'));
const Check = React.lazy(() => import('./Pages/Checkin.jsx'));
const NotFound = React.lazy(() => import('./components/404.jsx'));
const Progress = React.lazy(() => import('./components/Progress.jsx'));
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute'));
const ProtectedAdmin = React.lazy(() => import('./components/ProtectedRouteForAdmin.jsx'));
const Attendance = React.lazy(() => import('./components/Attendance.jsx'));
const SingleLayout = React.lazy(() => import('./layouts/mainLayout.jsx'));
const DefaultLayout = React.lazy(() => import('./layouts/defaultlayout.jsx'));
const Profile = React.lazy(() => import('./Pages/Profile.jsx'));
const ChangePassword = React.lazy(() => import('./components/ChangePassword.jsx'));
const ViewInformation = React.lazy(() => import('./components/ViewInformation.jsx'));
const Register = React.lazy(() => import('./components/Signup.jsx'));
const Employee = React.lazy(() => import('./components/Employee.jsx'));
const AttendanceRecordAdmin = React.lazy(() => import('./components/AttendanceRecord.jsx'));
import store from './store.js';

import ProtectedAdminCheckin from './components/ProtectedRouteForCheckinAdmin.jsx';

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
                {/* <Route path='changePassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} /> */}
                <Route path='forgotPassword/:token' element={<ForgotPassword />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='/dashboard' element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
                <Route path='' element={<Profile />} />
                <Route path='progress' element={<Progress />} />
                <Route path='admin' element={<ProtectedAdmin><Employee /></ProtectedAdmin>} />
                <Route path='admin/attendance' element={<ProtectedAdmin><AttendanceRecordAdmin /></ProtectedAdmin>} />
                <Route path='admin/attendance/viewAttendance/:id' element={<ProtectedAdmin><Attendance /></ProtectedAdmin>} />
                <Route path='admin/register' element={<ProtectedAdmin><Register /></ProtectedAdmin>} />
                <Route path='admin/viewInformation/:id' element={<ProtectedAdmin><ViewInformation /></ProtectedAdmin>} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
