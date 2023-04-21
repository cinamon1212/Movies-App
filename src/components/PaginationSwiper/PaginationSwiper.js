import { Pagination } from 'antd';
import { Component } from 'react';

class PaginationSwiper extends Component {
  onChange = (page) => {
    this.props.changeLoading();

    this.props.movieService.getAllMovies(page, this.props.query).then((res) => this.props.updateMovies(res.results));

    window.scroll(0, 0);
    this.props.changeCurrentPage(page);
  };

  render() {
    return (
      <Pagination
        current={this.props.currentPage}
        onChange={this.onChange}
        total={this.props.totalPages * 20}
        showSizeChanger={false}
        hideOnSinglePage
        defaultPageSize={20}
        style={{ marginTop: '10px' }}
      />
    );
  }
}
export default PaginationSwiper;
