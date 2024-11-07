// src/components/SettingTabs.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';

import { setActiveTab } from '../../Redux/settingSlice';

const SettingTabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.settings.activeTab);

  const tabs = [
    { label: 'General Settings', value: 'GeneralSettings' },
    { label: 'Workplace Organization', value: 'WorkSpace' },
    { label: 'Roles & Modules', value: 'Roles' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Tax', value: 'Tax' },
  ];

  return (
    <div style={{ display: 'flex',justifyContent:"start", width:"100%", flexWrap:"wrap", gap:"10px"}}>
      {tabs.map((tab) => (
        <Tooltip key={tab.value} title={tab.label}>
          <CustomButton
            ButtonText={tab.label}
            fontSize="18px"
            color={activeTab === tab.value ? "white" : "#010120"}
            fontWeight="500"
            fullWidth={false}
            variant="contained"
            padding="10px 23px"
            type="button"
            background={activeTab === tab.value ? '#157AFF' : 'white'}
            hoverBg="#303f9f"
            hovercolor="white"
            buttonStyle={{
              minWidth:"170px !important"
            }}
            borderRadius="7px"
            onClick={() => dispatch(setActiveTab(tab.value))}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default SettingTabs;
