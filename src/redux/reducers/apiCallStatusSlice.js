import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit'

const apiCallStatusSlice = createSlice({
  name: 'apiCallStatus',
  initialState: initialState.apiCallsInProgress,
  reducers: {
    pending: (state, _action) => {
      return ++state;
    },
    fullfilled: (state, _action) => {
      return --state;
    }
  }
});

export const { pending, fullfilled } = apiCallStatusSlice.actions;
export default apiCallStatusSlice.reducer;