import { fullfilled, pending } from '../reducers/apiCallStatusSlice';
import { loadAll, create, update, deleteOptimistic } from '../reducers/courseSlice';
import { rest } from '../../api';

export function loadCourses(successCb, failCB) {
  return function (dispatch, _getState) {
    dispatch(pending());
    rest.get('courses', null, (courses) => {
      dispatch(loadAll(courses));
      dispatch(fullfilled());
      if (successCb) successCb(courses);
    }, (error) => {
      dispatch(fullfilled());
      if (failCB) failCB(error);
      throw new Error(err);
    });
  }
}

export function saveCourse(course, successCb, failCb) {
  return function (dispatch, _getState) {
    dispatch(pending());
    if (course.id) {
      rest.put(`courses/${course.id}`, course,
        savedCourse => {
          dispatch(update(savedCourse));
          dispatch(fullfilled());
          if (successCb) successCb(savedCourse);
        },
        error => {
          dispatch(fullfilled());
          if (failCb) failCb(error);
          throw new Error(err); k
        }
      );
    } else {
      rest.post("courses", course,
        savedCourse => {
          dispatch(create(savedCourse));
          dispatch(fullfilled());
          if (successCb) successCb(savedCourse);
        },
        error => {
          dispatch(fullfilled());
          if (failCb) failCb(error);
          throw new Error(err); k
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
