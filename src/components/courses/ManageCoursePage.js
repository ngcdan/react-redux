import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

class ManageCoursePage extends React.Component {
  state = {
    course: { ...this.props.course },
    errors: {}
  }

  componentDidMount() {
    let { loadCourses, loadAuthors, courses, authors } = this.props;
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("load courses failed " + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("load Authors failed " + error);
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      course: {
        ...this.state.course,
        [name]: name === "authorId" ? parseInt(value, 10) : value
      }
    }));
  }

  handleSave = (event) => {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    }).catch(error => {
      throw error;
    });
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        authors={this.props.authors}
        errors={this.state.errors}
        onChange={this.handleChange} onSave={this.handleSave} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    course: state.courses?.length > 0 ? state.courses[0] : newCourse,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);