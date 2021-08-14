import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

class ManageCoursePage extends React.Component {
  state = {
    course: {},
    errors: {},
  }

  componentDidMount() {
    let { loadCourses, loadAuthors, courses, authors, course } = this.props;
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("load courses failed " + error);
      });
    } else {
      this.setState({ ...this.state, course });
    };

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
    const { saveCourse, history } = this.props;
    saveCourse(this.state.course).then(() => {
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
        onChange={this.handleChange}
        onSave={this.handleSave} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

// Redux mappings
function mapStateToProps(state, ownProps) {
  console.log('call map state to props');
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses?.length > 0
    ? state.courses.find(course => course.slug === slug) || newCourse
    : newCourse;

  return {
    course,
    courses: state.authors,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);