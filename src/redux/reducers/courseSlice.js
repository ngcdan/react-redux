import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
  name: 'courses',
  initialState: initialState.courses,
  reducers: {
    loadAll: (_state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return action.payload;
    },
    update: (state, action) => {
      return state.map(course => course.id === action.payload.id
        ? action.payload
        : course);
    },
    create: (state, action) => {
      // state = [...state, { ...action.payload }];
      state.push(action.payload);
    },
    deleteOptimistic: (state, action) => {
      return state.filter(course => course.id !== action.payload.id);
    }
  }
})

export const { loadAll, update, create, deleteOptimistic } = courseSlice.actions

export default courseSlice.reducer
