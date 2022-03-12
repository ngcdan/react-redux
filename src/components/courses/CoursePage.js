import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import { SearchInput } from './SearchInput';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { authors } from '../../../tools/mockData';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: this.props.courses,
      authors: this.props.authors
    }
  }

  loadData() {
    let { loadAuthors, loadCourses } = this.props;
    if (authors.length === 0) {
      loadAuthors((_authors) => { }, (error) => {
        alert("load Authors failed " + error);
      });
    }

    loadCourses((result) => {
      const courses = result.map(course => {
        return {
          ...course,
          authorName: authors.find(author => author.id === course.authorId).name
        };
      });
      this.setState({ courses: courses });
    });
  }

  componentDidMount() {
    this.loadData();
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
      this.loadData();
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <>
        <h1>Course Page</h1>
        <SearchInput onSearch={(value) => this.handleSearchFilter(value)} />
        {loading
          ? <Spinner />
          :
          <>
            <button style={{ marginBottom: 20 }} className='btn btn-primary'
              onClick={() => this.props.history.push('/course')}>
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
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);