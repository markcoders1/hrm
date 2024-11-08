// src/pages/Settings.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import Finance from './Finance';
import Tax from './Tax';
import Roles from './Roles';
import WorkSpace from './WorkSpace';
import SettingTabs from '../../components/SettingTabs/SettingTabs';

const Settings = () => {
  const { setHeadertext, setParaText } = useOutletContext();
  const activeTab = useSelector((state) => state.settings.activeTab);

  useEffect(() => {
    setHeadertext("");
    setParaText("");
    console.log(activeTab)
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'GeneralSetting':
        return <GeneralSettings />;
      case 'WorkSpace':
        return <WorkSpace />;
      case 'Roles':
        return <Roles />;
      case 'Finance':
        return <Finance />;
      case 'Tax':
        return <Tax />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div>
     
      {renderTabContent()}
    </div>
  );
};

export default Settings;
