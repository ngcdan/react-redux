import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';

class CoursePage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("load courses failed " + error);
    });
  }

  render() {
    return (
      <>
        <h1>Course Page</h1>
        {this.props.courses.map(course => (<div key={course.title}>{course.title}</div>))}
      </>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, _ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(loadCourses, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);