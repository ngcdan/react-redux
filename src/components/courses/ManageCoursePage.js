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
  state = {
    course: { ...this.props.course },
    errors: {},
    saving: false,
  }

  loadData() {
    let { loadCourses, courses, course } = this.props;
    if (courses.length === 0) {
      return loadCourses();
    } else {
      this.setState({ ...this.state, course });
    };
  }

  componentDidMount() {
    this.loadData();
    let { loadAuthors, authors } = this.props;
    if (authors.length === 0) {
      const failCb = (error) => {
        alert("load Authors failed " + error);
      };
      loadAuthors((_authors) => { }, failCb);
    }
  }

  componentWillReceiveProps(_nextProps) {
    this.loadData();
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
    saveCourse(this.state.course, (course) => {
      toast.success("Course saved!");
      history.push("/courses");
    });
    /*
          .catch (error => {
          this.setState(prevState =>
          ({
            ...prevState,
            errors: { onSave: error.message },
            saving: false
          }));
        });
        */
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

// Redux mappings
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses?.length > 0
    ? state.courses.find(course => course.slug === slug) || null
    : newCourse;
  console.log(state);

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