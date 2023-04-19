import React, { Component } from 'react';
import { Pagination } from 'antd';

import ItemList from '../ItemList/ItemList';
import './Rated.css';

export default class Rated extends Component {
  currentPage = 1;

  onPaginationChange = (PaginationPage) => {
    const ratedMovies = JSON.parse(localStorage.getItem('ratedMoviesArray'));

    const sliceRatedMovies = (page, ratedMovies) => {
      if (ratedMovies.length < 20) ratedMovies = ratedMovies.slice(0, ratedMovies.length);
      else ratedMovies = ratedMovies.slice(20 * page, 20 * page + 20);
      return ratedMovies;
    };
    const res = sliceRatedMovies(PaginationPage, ratedMovies);
    this.props.updateRatedMovies(res);
    this.currentPage = PaginationPage;

    window.scroll(0, 0);
  };

  total = JSON.parse(localStorage.getItem('ratedMoviesArray'));

  render() {
    const RatedPage = () => {
      const cards = JSON.parse(localStorage.getItem('ratedPage'));
      if (cards) {
        return (
          <React.Fragment>
            <div className="list">
              {cards.map((item) => {
                return (
                  <ItemList
                    key={item.id}
                    title={item.title}
                    description={item.overview}
                    release={item.release_date}
                    poster={item.poster_path}
                    rate={item.vote_average}
                    movieId={item.id}
                    rating={item.rating}
                    genreIds={item.genre_ids}
                    genre={this.props.genre}
                    item={item}
                    ratedMoviesArray={this.props.ratedMoviesArray}
                    addRatedMovie={this.props.addRatedMovie}
                    changeRatedMovieRating={this.props.changeRatedMovieRating}
                    movieService={this.props.movieService}
                  />
                );
              })}
            </div>
            <Pagination
              current={this.currentPage}
              movieService={this.props.movieService}
              total={this.total.length}
              showSizeChanger={false}
              onChange={this.onPaginationChange}
              defaultPageSize={20}
            />
          </React.Fragment>
        );
      } else
        return (
          <div className="list">
            <div
              style={{
                margin: '0 auto',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              <div>Rated films not found...</div>
              <div>Please, go to Search and rate the movie </div>
            </div>
          </div>
        );
    };

    return <RatedPage />;
  }
}
