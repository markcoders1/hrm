import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import env from 'dotenv'
import Header from './components/Header/Header.jsx'

// env.config({
//   path:"./../.env"
// })

// importing from prime react

import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css';          // core css
import 'primeicons/primeicons.css';                        // icons




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Header/> */}
   {/* <BasicTable/> */}
   {/* <TanStack/> */}
  </React.StrictMode>,
)







