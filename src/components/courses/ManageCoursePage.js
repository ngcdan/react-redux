import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);
    const { course } = this.props;
    this.state = {
      course: { ...course },
      errors: {},
      saving: false,
    }
    this.computeToLoadDate();
  }

  computeToLoadDate() {
    let { loadCourses, courses, authors } = this.props;
    if (courses.length === 0) loadCourses();
    if (authors.length === 0) loadAuthors();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { course } = nextProps;
      this.setState({ course: { ...course } });
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

  formIsValid() {
    const { title, authorId, category } = this.state.course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    this.setState(prevState => ({ ...prevState, errors }));
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  handleSave = (event) => {
    event.preventDefault();
    if (!this.formIsValid()) return;
    const { saveCourse, history } = this.props;
    this.setState(prevState => ({ ...prevState, saving: true }));
    saveCourse(this.state.course);
    toast.success("Course saved!");
    history.push("/courses");
  }

  render() {
    const { authors, courses } = this.props;
    return (authors.length === 0 && courses.length === 0
      ? (<Spinner />)
      : (
        <CourseForm
          course={this.state.course}
          authors={this.props.authors}
          errors={this.state.errors}
          onChange={this.handleChange}
          onSave={this.handleSave}
          saving={this.state.saving} />
      ));
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// Redux mappings, like useSelector in function component
function mapStateToProps(state, ownProps) {
  const { courses } = state;
  const { slug } = ownProps.match.params;
  const course = slug && courses?.length > 0
    ? courses.find(course => course.slug === slug) || null
    : newCourse;

  return {
    courses: state.authors,
    authors: state.authors,
    course,
  };
}
// component will receive: props.courses, props.authors, and props.course

const mapDispatch = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatch)(ManageCoursePage);