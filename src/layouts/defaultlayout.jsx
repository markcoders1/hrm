import { useState } from 'react';
import AppSidebar from '../components/AppSidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DefaultLayout = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [headertext, setHeadertext] = useState("hi")
  const [paraText, setParaText] = useState("hi")


  return (
    <div className={`layout-container ${sidebarShow ? 'sidebar-open' : 'sidebar-closed'}`}>
      <AppSidebar />
      <div className="outlet-box">
        <Header headertext={headertext} paraText={paraText} />
        <div className="body flex-grow-1 p-4">
          <Outlet  context={{setHeadertext, setParaText}}  />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
