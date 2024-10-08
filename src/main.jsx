import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'


// importing from prime react

import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import './styles.scss'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import { persistor } from './store.js';
// import  store1 from './Redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    {/* <Provider store={store1}> */}
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    {/* </Provider> */}
  </React.StrictMode>,
)







