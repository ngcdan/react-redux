import React, { Component } from 'react';
import { TextInput, SelectInput } from 'reactjs-lib';
import PropTypes from 'prop-types';

export default class CourseForm extends Component {
  render() {
    let { course, onSave, onChange, authors, saving, errors } = this.props;
    return (
      <form onSubmit={onSave}>
        <h2>{course.id ? "Edit" : "Add"} Course</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}

        <TextInput
          name="title" label="Title" value={course.title}
          onChange={onChange} error={errors.title} />
        <SelectInput
          name="authorId" label="Author" value={course.authorId || ""}
          defaultOption="Select Author"
          options={authors.map(author => ({
            value: author.id,
            text: author.name
          }))}
          onChange={onChange}
          error={errors.author} />

        <TextInput
          name="category" label="Category" value={course.category}
          onChange={onChange} error={errors.category} />

        <button type="submit" disabled={saving} className="btn btn-primary mt-2"> {saving ? "Saving" : "Save"} </button>
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
