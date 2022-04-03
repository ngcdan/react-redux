import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import { SearchInput } from './SearchInput';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursePage extends React.Component {
  constructor(props) {
    console.log('Course Page is mounting................');
    super(props);
    this.state = {
      courses: this.props.courses,
      authors: this.props.authors
    }
    this.computeToLoadData();
  }

  computeToLoadData() {
    let { loadAuthors, loadCourses } = this.props;
    let { authors, courses } = this.state;
    if (authors.length === 0) loadAuthors();
    if (courses.length === 0) loadCourses()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { courses, authors } = nextProps;
      this.setState({ courses: courses, authors: authors });
    }
  }

  handleDeleteCourse = (deleteCourse) => {
    toast.success("Course deleted");
    this.props.deleteCourse(deleteCourse.id, () => {
      this.setState({ courses: this.state.courses.filter(course => course.id !== deleteCourse.id) });
    }, (error) => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  }

  handleSearchFilter(value) {
    if (value?.length > 0) {
      const coursesFilter = this.state.courses
        .filter(c => Object.values(c).join(' ').toLowerCase().includes(value.toLowerCase()));
      this.setState({ courses: coursesFilter });
    } else {
      this.computeToLoadData();
    }
  }

  render() {
    const { loading, history } = this.props;
    return (
      <>
        <h1>Course Page</h1>
        <SearchInput onSearch={(value) => this.handleSearchFilter(value)} />
        {loading
          ? <Spinner />
          :
          <>
            <button style={{ marginBottom: 20 }} className='btn btn-primary'
              onClick={() => history.push('/course')}>
              Add Course
            </button>
            <CourseList onDelete={this.handleDeleteCourse} courses={this.state.courses} />
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
function mapStateToProps(state, _ownProps) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(author => author.id === course.authorId).name
          };
        }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0, //TODO: performance
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);