import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getCourses().then((courses) => {
      dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
    }).catch((error) => {
      throw error;
    });
  }
}

export function saveCourse(course) {
  return function (dispatch, _getState) {
    return courseApi.saveCourse(course)
      .then((course) => {
        course.id
          ? dispatch({ type: types.UPDATE_COURSES_SUCCESS, course })
          : dispatch({ type: types.CREATE_COURSE_SUCCESS, course })
      }).catch((error) => {
        throw error;
      });
  }
}