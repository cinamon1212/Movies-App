import React, { Component } from 'react';

import List from '../List/List';
import SearchForm from '../SearchForm/SearchForm';
import Loader from '../Loader/Loader';
import PaginationSwiper from '../PaginationSwiper/PaginationSwiper';

import './Search.css';

export default class Search extends Component {
  render() {
    const {
      state,
      movieService,
      addRatedMovie,
      request,
      changeLoading,
      changeCurrentPage,
      updateMovies,
      changeRatedMovieRating,
      allGenres,
    } = this.props;
    const { totalPages, loading, isNotFound, query, currentPage, ratedMoviesArray, genre } = state;

    const loader = loading ? <Loader /> : null;

    const content = !loading ? (
      <List
        ratedMoviesArray={ratedMoviesArray}
        addRatedMovie={addRatedMovie}
        changeRatedMovieRating={changeRatedMovieRating}
        genre={genre}
        movieService={movieService}
        allGenres={allGenres}
      />
    ) : null;

    const notFound = isNotFound ? <span className="not-found">Movies not found...</span> : null;

    return (
      <div className="search">
        <SearchForm
          request={request}
          changeLoading={changeLoading}
          changeCurrentPage={changeCurrentPage}
          movieService={movieService}
        />

        {notFound}
        {loader}
        {content}

        <PaginationSwiper
          hideOnSinglePage
          totalPages={totalPages}
          updateMovies={updateMovies}
          changeLoading={changeLoading}
          query={query}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          movieService={movieService}
        />
      </div>
    );
  }
}
