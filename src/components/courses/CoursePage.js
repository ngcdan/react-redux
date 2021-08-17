import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursePage extends React.Component {
  componentDidMount() {
    let { loadCourses, loadAuthors, courses, authors } = this.props;
    if (courses.length === 0) loadCourses();

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("load Authors failed " + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    const { loading } = this.props;

    return (
      <>
        <h1>Course Page</h1>
        {loading
          ? <Spinner />
          :
          <>
            <button style={{ marginBottom: 20 }} className='btn btn-primary'
              onClick={() => this.props.history.push('/course')}>
              Add Course
            </button>
            <CourseList onDelete={this.handleDeleteCourse} courses={this.props.courses} />
          </>
        }
      </>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};


//Redux mappings
function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
    courses:
      state.authors?.length === 0
        ? []
        : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(author => author.id === course.authorId).name
          };
        }),
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);