import React from 'react'
import AppSidebar from '../components/AppSidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'


const DefaultLayout = () => {

  return (
    <div className='layout' >
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
