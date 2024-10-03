import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});


export const { setCount } = counterSlice.actions;


export default counterSlice.reducer;
