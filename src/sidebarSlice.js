import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = sidebarSlice.actions;
export default sidebarSlice.reducer;
