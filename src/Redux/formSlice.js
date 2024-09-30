// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormDirty: false, // Track if the form is modified
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormDirty: (state, action) => {
      state.isFormDirty = action.payload;
    },
    resetFormDirty: (state) => {
      state.isFormDirty = false;
    },
  },
});

export const { setFormDirty, resetFormDirty } = formSlice.actions;
export default formSlice.reducer;
