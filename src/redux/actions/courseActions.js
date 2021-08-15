import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall } from './apiStatusAction';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi.getCourses().then((courses) => {
      dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
    }).catch((error) => {
      throw error;
    });
  }
}

export function saveCourse(course) {
  return function (dispatch, _getState) {
    dispatch(beginApiCall());
    return courseApi.saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch({ type: types.UPDATE_COURSES_SUCCESS, course: saveCourse })
          : dispatch({ type: types.CREATE_COURSE_SUCCESS, course: savedCourse });
      }).catch((error) => {
        throw error;
      });
  }
}