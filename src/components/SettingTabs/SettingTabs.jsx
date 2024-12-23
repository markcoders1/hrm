// src/components/SettingTabs.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';

import { setActiveTab } from '../../Redux/settingSlice';
import { useNavigate } from 'react-router-dom';

const SettingTabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.settings.activeTab);
  const navigate = useNavigate();

  const tabs = [
    { label: 'General Settings',route: 'settings/g-s'},
    { label: 'Workplace Organization',route: 'settings/w-o' },
    { label: 'Roles & Modules',route: 'settings/r' },
    { label: 'Finance', route: 'settings/f' },
    { label: 'Tax', route: 'settings/t' },
  ];

 const handleNavigate = (route) => {
  navigate(route)
 }
  return (
    <div style={{ display: 'flex',justifyContent:"start", width:"100%", flexWrap:"wrap", gap:"10px"}}>
      {tabs.map((tab) => (
        <Tooltip key={tab.value} title={tab.label}>
          <CustomButton
            ButtonText={tab.label}
            fontSize="18px"
            color={location.pathname.includes(tab.route) ? "white" : "#010120"}

            fontWeight="500"
            fullWidth={false}
            variant="contained"
            padding="10px 23px"
            type="button"
            background={
              location.pathname.includes(tab.route) ? "#157AFF" : "white"
            }
            hoverBg="#303f9f"
            hovercolor="white"
            buttonStyle={{
              minWidth:"170px !important"
            }}
            borderRadius="7px"
            // onClick={() => dispatch(setActiveTab(tab.value))}
   onClick={() => navigate(tab.route)}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default SettingTabs;
