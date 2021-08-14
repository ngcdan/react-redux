import React, { Component } from 'react';
import { TextInput, SelectInput } from 'reactjs-lib';
import PropTypes from 'prop-types';

export default class CourseForm extends Component {
  render() {
    let { course, onSave, onChange, authors } = this.props;
    return (
      <form onSubmit={onSave}>
        <h2>{course.id ? "Edit" : "Add"} Course</h2>
        <TextInput htmlId="example-optional"
          name="title" label="Title" value={course.title} onChange={onChange} />
        <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId || ""}
          defaultOption="Select Author"
          options={authors.map(author => ({
            value: author.id,
            text: author.name
          }))}
          onChange={onChange} />
        <TextInput
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange} />

        <button type="submit" className="btn btn-primary">
          {"Save"}
        </button>
      </form>
    );
  }
}

CourseForm.propTypes = {
  authors: PropTypes.array,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};
