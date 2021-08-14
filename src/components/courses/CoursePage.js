import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';

class CoursePage extends React.Component {
  componentDidMount() {
    this.props.loadCourses().catch(error => {
      alert("load courses failed " + error);
    });

    this.props.loadAuthors().catch(error => {
      alert("load Authors failed " + error);
    });
  }

  render() {
    return (
      <>
        <h1>Course Page</h1>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors?.length === 0
        ? []
        : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(author => author.id === course.authorId).name
          };
        }),
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);