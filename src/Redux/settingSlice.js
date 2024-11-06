// src/redux/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    activeTab: 'GeneralSettings', // Default tab
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = settingsSlice.actions;
export default settingsSlice.reducer;
