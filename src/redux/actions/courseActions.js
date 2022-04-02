import { beginApiCall, apiCallError } from './apiStatusAction';
import { loadAll_SUCCESS, create_SUCCESS, update_SUCCESS, deleteOptimistic } from '../reducers/courseSlice';
import { rest } from '../../api';

export function loadCourses(successCb, failCB) {
  return function (dispatch, getState) {
    console.log('log state in loadCourses');
    console.log(getState());
    dispatch(beginApiCall());
    rest.get('courses', null, (courses) => {
      console.log('log courses in after reponse async');
      console.log(courses);
      dispatch(loadAll_SUCCESS(courses));
      if (successCb) successCb(courses);
    }, (error) => {
      dispatch(apiCallError(error));
      if (failCB) failCB(error);
    });
  }
}

export function saveCourse(course, successCb, failCb) {
  console.log('===========before save course===============');
  console.log(course);
  return function (dispatch, _getState) {
    dispatch(beginApiCall());
    if (course.id) {
      rest.put(`courses/${course.id}`, course,
        savedCourse => {
          dispatch(update_SUCCESS(savedCourse));
          if (successCb) successCb(savedCourse);
        },
        error => {
          dispatch(apiCallError(error));
          if (failCb) failCb(error);
        }
      );
    } else {
      rest.post("courses", course,
        savedCourse => {
          console.log(savedCourse);
          dispatch(create_SUCCESS(savedCourse));
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
    dispatch(deleteOptimistic(courseId));
    rest.delete(`courses/${courseId}`, null, successCb, failCb);
  }
}
