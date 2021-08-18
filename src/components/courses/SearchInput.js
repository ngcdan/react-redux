import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchInput extends Component {
  state = {
    searchValue: ''
  }

  onChange = (value) => {
    this.setState({ searchValue: value });
  }

  render() {
    const { onSearch } = this.props;
    return (
      <div class="input-group mb-2">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" onChange={e => this.onChange(e.target.value)} />
        <button type="button" class="btn btn-outline-primary" onClick={() => onSearch(this.state.searchValue)}>
          search
        </button>
      </div >
    );
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};




