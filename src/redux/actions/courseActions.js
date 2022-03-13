import * as types from './actionTypes';
import { beginApiCall, apiCallError } from './apiStatusAction';
import { rest } from '../../api';

export function loadCourses(successCb, failCB) {
  return function (dispatch) {
    dispatch(beginApiCall());
    rest.get('courses', null, (courses) => {
      dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
      if (successCb) successCb(courses);
    }, (error) => {
      dispatch(apiCallError(error));
      if (failCB) failCB(error);
    });
  }
}

export function saveCourse(course, successCb, failCb) {
  return function (dispatch, _getState) {
    dispatch(beginApiCall());
    if (course.id) {
      rest.put(`courses/${course.id}`, course,
        savedCourse => {
          dispatch({ type: types.UPDATE_COURSES_SUCCESS, course: savedCourse });
          if (successCb) successCb(savedCourse);
        },
        error => {
          dispatch(apiCallError(error));
          if (failCb) failCb(error);
        }
      );
    } else {
      rest.put("courses", course,
        savedCourse => {
          dispatch({ type: types.CREATE_COURSE_SUCCESS, course: savedCourse });
          if (successCb) successCb(savedCourse);
        },
        error => {
          dispatch(apiCallError(error));
          if (failCb) failCb(error);
        }
      );
    }
  }
}

export function deleteCourse(courseId, successCb, failCb) {
  return function (dispatch) {
    dispatch({ type: types.DELETE_COURSE_OPTIMISTIC, course: courseId });
    rest.delete(`courses/${courseId}`, null, successCb, failCb);
  }
}
