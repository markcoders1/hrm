import {useState} from 'react'
import AppSidebar from '../components/AppSidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'


const DefaultLayout = () => {

  const [headertext,setHeadertext]=useState('hi')

  return (
    <div className='layout'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header headertext={headertext}/>
        <div className="body flex-grow-1 p-4">
          <Outlet context={setHeadertext}/>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
