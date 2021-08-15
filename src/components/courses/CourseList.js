import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CourseList extends Component {

  render() {
    const { courses, onDelete } = this.props;
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th> Title </th>
            <th> Author </th>
            <th> Category </th>
            <td />
          </tr>
        </thead>
        <tbody>
          {courses.map(course => {
            return (
              <tr key={course.id}>
                <th>
                  <a className="btn btn-light"
                    href={"http://pluralsight.com/courses/" + course.slug} >
                    Watch
                  </a>
                </th>
                <th>
                  <Link to={"/course/" + course.slug}>
                    {course.title}
                  </Link>
                </th>
                <th> {course.authorName} </th>
                <th> {course.category} </th>
                <th>
                  <button className="btn btn-outline-danger" onClick={() => onDelete(course)}>
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table >
    )
  }
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}
