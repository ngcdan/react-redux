import * as types from './actionTypes';
import { getCourses } from '../../api/courseApi';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCourses() {
  return function (dispatch) {
    return getCourses().then((courses) => {
      console.log(courses);
      dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
    }).catch((error) => {
      throw error;
    });
  }
}