// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isFormDirty: false,
  },
  reducers: {
    setFormDirty: (state, action) => {
      state.isFormDirty = action.payload;
    },
  },
});

export const { setFormDirty } = formSlice.actions;
export default formSlice.reducer;
