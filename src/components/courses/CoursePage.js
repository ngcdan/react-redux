import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';

class CoursePage extends React.Component {
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
            <CourseList courses={this.props.courses} />
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
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);