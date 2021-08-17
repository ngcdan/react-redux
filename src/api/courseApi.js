import { handleError, handleResponse } from './apiUtils';
const baseUrl = process.env.API_URL + "/courses/";
import { Rest } from '../api/apiUtils';

export const rest = new Rest(process.env.API_URL, process.env.API_URL);
export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST",
    headers: { 'content-type': "application/json" },
    body: JSON.stringify(course)
  }).then(handleResponse).catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, {
    method: "DELETE"
  })
    .then(handleResponse)
    .catch(handleError);
}