import React from 'react';

export class CoursePage extends React.Component {
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
    alert(this.state.course.title)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Course Page</h1>
        <h2>Add Course</h2>
        <input type='text' value={this.state.course.title} onChange={this.onChange} />
        <input type='submit' value='Save' />
      </form>
    );
  }
}