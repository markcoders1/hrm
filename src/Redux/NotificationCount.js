import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  count: 110,
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
