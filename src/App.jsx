import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './Pages/forgotPassword.jsx';
import { Suspense } from 'react';
import React from 'react';
import { PageLoader } from './components/Loaders.jsx';

import ProtectedRoute from './ProtectedRoutes/ProtectedRoute.jsx';
import ProtectedAdmin from './ProtectedRoutes/ProtectedRouteForAdmin.jsx';
import Login from './Pages/Login.jsx';
import Check from './Pages/Checkin.jsx';
import NotFound from './Pages/404.jsx';
import Attendance from './Pages/Attendance.jsx';
import UserAttendance from './Pages/UserAttendance.jsx';
import SingleLayout from './layouts/mainLayout.jsx';
import DefaultLayout from './layouts/defaultlayout.jsx';
import Profile from './Pages/Profile.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';
import UserInfo from './Pages/UserInfo.jsx';
import Register from './Pages/Admin/Register.jsx';
import EmployeeData from './Pages/Admin/UserManagement.jsx';
import EmployeeAttendance from './Pages/Admin/EmployeeAttendance.jsx';
import Devices from './Pages/Devices.jsx';
import ProtectedAdminCheckin from './ProtectedRoutes/ProtectedRouteForCheckinAdmin.jsx';
import EditMyLeave from './Pages/User/EditMyLeaves.jsx';
import EditWFHRequest from './Pages/User/EditWfhRequest.jsx';
import Dashboard from './Pages/Admin/DashboarAdmin.jsx';
import UserDetailsStatic from './Pages/Admin/UserDetailsStatic.jsx';
import Notifications from './Pages/User/MyNotifications.jsx';
import LeaveManagement from './Pages/Admin/LeaveManagement.jsx';
import LeaveDetailsAdmin from './Pages/Admin/LeaveDetails.jsx';
import WFHManagement from './Pages/Admin/WFHManagement.jsx';
import WFHDetails from './Pages/Admin/WFHDetails.jsx';
import MyNotifications from './Pages/User/MyNotifications.jsx';
import MyLeaves from './Pages/User/MyLeaves.jsx';
import NewLeave from './Pages/User/NewLeave.jsx';
import MyLeaveDetails from './Pages/User/MyLeaveDetails.jsx';
import RemoteWork from './Pages/User/RemoteWork.jsx';
import MyWfhDetail from './Pages/User/MyWFHDetail.jsx';
import NewWFHRequest from './Pages/User/NewWfhRequest.jsx';
import EditFHRequest from './Pages/User/EditWfhRequest.jsx';
import EditMyProfile from './Pages/User/EditMyProfile.jsx';
import PayrollManagement from './Pages/Payroll/PayrollManagement.jsx';
import ManagePayroll from './Pages/Payroll/ManagePayroll.jsx';
import ComparePayroll from './Pages/Payroll/ComparePayroll.jsx';
// import LastPayrollList from './Pages/Payroll/LastPayrollList.jsx';
import AddEmployementType from './Pages/Settings/AddEmployementType.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PayslipManagement from './Pages/Admin/Paysilpmanagement.jsx';
import Payslips from './Pages/Payslip.jsx';
import store from './store.js';
import HodProfile from './Pages/HodProfile.jsx';
import AddLeaveType from './Pages/Settings/AddNewLeaveType.jsx';
import AddLocationtype from './Pages/Settings/AddLocationType.jsx';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path='hod-profile' element={<HodProfile />} />

            <Route path='profile/edit-profile' element={<EditMyProfile />} />
            <Route path='my-notifications' element={<MyNotifications />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='admin' element={<Dashboard />} />
            <Route path='my-attendance' element={<Attendance />} />
            <Route path='my-leaves' element={<MyLeaves />} />
            <Route path='my-leaves/new-leave' element={<NewLeave />} />
            <Route path='my-leaves/my-leave-detail/:id' element={<MyLeaveDetails />} />
            <Route path='my-leaves/edit-leave/:id' element={<EditMyLeave />} />
            <Route path='remote-work' element={<RemoteWork />} />
            <Route path='remote-work/wfh-detail/:id' element={<MyWfhDetail />} />
            <Route path='remote-work/new-wfh-request' element={<NewWFHRequest />} />
            <Route path='remote-work/edit-wfh-request/:id' element={<EditWFHRequest />} />
            <Route path='devices' element={<Devices />} />
            <Route path='user-management' element={<EmployeeData />} />
            <Route path='attendance' element={<EmployeeAttendance />} /> 
            <Route path='leave-management' element={<ProtectedAdmin><LeaveManagement /></ProtectedAdmin>} /> 
            <Route path='leave-management/leave-details/:id' element={<ProtectedAdmin><LeaveDetailsAdmin /></ProtectedAdmin>} /> 
            <Route path='attendance-management/viewAttendance/:id' element={<UserAttendance />} />    
            <Route path='user-management/register' element={<ProtectedAdmin><Register /></ProtectedAdmin>} />
            <Route path='user-management/viewInformation/:id' element={<ProtectedAdmin><UserInfo /></ProtectedAdmin>} />
            <Route path='user-management/user-detail/:id' element={<ProtectedAdmin><UserDetailsStatic /></ProtectedAdmin>} />
            <Route path='wfh-management' element={<ProtectedAdmin><WFHManagement /></ProtectedAdmin>} />
            <Route path='wfh-management/wfh-details/:id' element={<ProtectedAdmin><WFHDetails /></ProtectedAdmin>} />

            {/* now 2nd phase from here  */}
            <Route path='payroll-management' element={<ProtectedAdmin><PayrollManagement /></ProtectedAdmin>} />
            <Route path='payroll-management/manage-payroll' element={<ProtectedAdmin><ManagePayroll /></ProtectedAdmin>} />
            <Route path='payroll-management/compare-payroll' element={<ProtectedAdmin><ComparePayroll /></ProtectedAdmin>} />

            {/* PAYSLIP MANAGEMENT */}
            <Route path='payslip-management' element={<ProtectedAdmin><PayslipManagement /></ProtectedAdmin>} />
            <Route path='payslip' element={<ProtectedRoute><Payslips /></ProtectedRoute>} />

            


            {/* settings pages */}
            <Route path='settings/add-employement-type' element={<ProtectedAdmin><AddEmployementType /></ProtectedAdmin>} />
            <Route path='settings/add-leave-type' element={<ProtectedAdmin><AddLeaveType /></ProtectedAdmin>} />
            <Route path='settings/add-location-type' element={<ProtectedAdmin>< AddLocationtype/></ProtectedAdmin>} />


          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
