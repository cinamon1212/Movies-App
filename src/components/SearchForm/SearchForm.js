import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class SearchForm extends Component {
  onInputChange = debounce((event) => {
    const value = event.target.value;

    const fet = (query) => {
      this.props.changeLoading();
      this.props.movieService
        .getAllMovies(1, query)
        .then((res) => this.props.request(res, query))
        .catch((er) => {
          console.log(er);
        });
      this.props.changeCurrentPage(1);
    };

    if (value.trim()) {
      fet(value);
    } else if (!value) {
      fet('return');
    }
  }, 700);

  render() {
    return (
      <React.Fragment>
        <Input placeholder="Type to search..." style={{ height: '40px' }} onChange={this.onInputChange} />
      </React.Fragment>
    );
  }
}
export default SearchForm;
