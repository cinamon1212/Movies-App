import React, { Component } from 'react';

import List from '../List/List';
import SearchForm from '../SearchForm/SearchForm';
import Loader from '../Loader/Loader';
import PaginationSwiper from '../PaginationSwiper/PaginationSwiper';

import './Search.css';

export default class Search extends Component {
  movieService = this.props.movieService;

  state = {
    totalResults: null,
    totalPages: null,
    results: [],
    loading: true,
    isNotFound: false,
    query: 'return',
    currentPage: 1,
  };

  componentDidMount() {
    this.movieService
      .getAllMovies(1, this.state.query)
      .then((res) => this.request(res, this.state.query))
      .catch((er) => {
        console.log(er);
      });
  }

  request = (res, newQuery) => {
    this.setState({
      totalResults: res.total_results,
      totalPages: res.total_pages,
      results: res.results,
      loading: false,
      query: newQuery,
    });

    if (!res.results.length) {
      this.setState({
        isNotFound: true,
      });
    } else {
      this.setState({
        isNotFound: false,
      });
    }
  };

  changeLoading = () => {
    this.setState({
      loading: true,
    });
  };

  changeCurrentPage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  updateMovies = (res) => {
    this.setState({
      results: res,
      loading: false,
    });
  };

  render() {
    const { loading, results, isNotFound, totalPages, query, currentPage } = this.state;

    const loader = loading ? <Loader /> : null;

    const content = !loading ? (
      <List
        movies={results}
        guestSessionId={this.props.guestSessionId}
        changeRatedMovies={this.props.changeRatedMovies}
      />
    ) : null;

    const notFound = isNotFound ? <span className="not-found">Movies not found...</span> : null;

    return (
      <div className="search">
        <SearchForm
          request={this.request}
          changeLoading={this.changeLoading}
          changeCurrentPage={this.changeCurrentPage}
          movieService={this.movieService}
        />

        {notFound}
        {loader}
        {content}

        <PaginationSwiper
          totalPages={totalPages}
          updateMovies={this.updateMovies}
          changeLoading={this.changeLoading}
          query={query}
          currentPage={currentPage}
          changeCurrentPage={this.changeCurrentPage}
          movieService={this.movieService}
        />
      </div>
    );
  }
}
