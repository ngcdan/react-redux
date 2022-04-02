import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit'

/*
export function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.UPDATE_COURSES_SUCCESS:
      return state.map(course => course.id === action.course.id
        ? action.course
        : course
      );
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
}
*/
const courseSlice = createSlice({
  name: 'courses',
  initialState: initialState.courses,
  reducers: {
    loadAll_SUCCESS: action => {
      console.log('===========load courses reducer============');
      console.log(action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return action.payload;
    },
    update_SUCCESS: (action) => {
      console.log('===========update courses reducer============');
      console.log(action);
      state.forEach(course => course.id === action.payload.id
        ? action.course
        : course);
    },
    create_SUCCESS: (state, action) => {
      console.log('===========update courses reducer============');
      console.log(action);
      state = [...state, { ...action.payload }];
    },
    deleteOptimistic: (state, action) => {
      console.log('===========update courses reducer============');
      console.log(action);
      state = state.filter(course => course.id !== action.payload.id);
    }
  }
})

export const { loadAll_SUCCESS, update_SUCCESS, create_SUCCESS, deleteOptimistic } = courseSlice.actions

export default courseSlice.reducer
