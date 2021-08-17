import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusAction';
import { rest } from '../../api/courseApi';

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    rest.get('courses', null, (courses) => {
      dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
    }, (error) => {
      dispatch(apiCallError(error));
      throw error;
    });
  }
}

export function saveCourse(course, successCb) {
  return function (dispatch, _getState) {
    dispatch(beginApiCall());
    if (course.id) {
      rest.put(`courses/${course.id}`, course,
        savedCourse => {
          successCb(savedCourse);
          dispatch({ type: types.UPDATE_COURSES_SUCCESS, course: savedCourse });
        },
        error => {
          dispatch(apiCallError(error));
          throw error;
        }
      );
    } else {
      rest.put("courses", course,
        savedCourse => {
          dispatch({ type: types.CREATE_COURSE_SUCCESS, course: savedCourse });
        },
        error => {
          dispatch(apiCallError(error));
          throw error;
        }
      );
    }
  }
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch({ type: types.DELETE_COURSE_OPTIMISTIC, course });
    return courseApi.deleteCourse(course.id);
  }
}
