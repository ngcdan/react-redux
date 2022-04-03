import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit'

const authorSlice = createSlice({
  name: 'authors',
  initialState: initialState.authors,
  reducers: {
    loadAll: (_state, action) => {
      return action.payload;
    }
  }
})

export const { loadAll } = authorSlice.actions

export default authorSlice.reducer
