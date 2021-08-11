import React from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';

class CoursePage extends React.Component {
  state = {
    course: {
      title: ''
    }
  };

  onChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(createCourse(this.state.course));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Course Page</h1>
        <h2>Add Course</h2>
        <input type='text' value={this.state.course.title} onChange={this.onChange} />
        <input type='submit' value='Save' />
        {this.props.courses.map(course => (<div key={course.title}>{course.title}</div>))}
      </form>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, _ownProps) {
  return { courses: state.courses };
}

export default connect(mapStateToProps)(CoursePage);