import React, { Component } from 'react';
import { Pagination } from 'antd';

import ItemList from '../ItemList/ItemList';
import './Rated.css';

export default class Rated extends Component {
  state = {
    currentPage: 1,
    //  allGenres: []
  };

  onPaginationChange = (PaginationPage) => {
    const ratedMovies = JSON.parse(localStorage.getItem('ratedMoviesArray'));

    const sliceRatedMovies = (page, ratedMovies, lastPage) => {
      let res;

      if (ratedMovies.length > 20 * page && page === 1) {
        res = ratedMovies.slice(0, 20);
      } else if (ratedMovies.length < 20 * page && page === 1) {
        res = ratedMovies.slice(0, ratedMovies.length);
      } else if (ratedMovies.length > 20 * page && page === lastPage) {
        res = ratedMovies.slice(20 * page, ratedMovies.length);
      } else if (ratedMovies.length > 20 * page && page !== lastPage) {
        res = ratedMovies.slice(20 * (page - 1), 20 * (page - 1) + 20);
      } else res = ratedMovies.slice(20 * (page - 1));

      return res;
    };

    const resultRatedArray = sliceRatedMovies(PaginationPage, ratedMovies, this.total.length);
    this.props.updateRatedMovies(resultRatedArray);
    this.setState({
      currentPage: PaginationPage,
    });

    window.scroll(0, 0);
  };

  total = JSON.parse(localStorage.getItem('ratedMoviesArray'));

  render() {
    const RatedPage = () => {
      const cards = JSON.parse(localStorage.getItem('ratedPage'));
      let res;
      if (cards && cards.length > 20) {
        res = cards.slice(0, 20);
      } else res = cards;

      if (res) {
        return (
          <div className="search">
            <div className="list">
              {res.map((item) => {
                return (
                  <ItemList
                    key={item.id}
                    item={item}
                    ratedMoviesArray={this.props.ratedMoviesArray}
                    addRatedMovie={this.props.addRatedMovie}
                    changeRatedMovieRating={this.props.changeRatedMovieRating}
                    movieService={this.props.movieService}
                    allGenres={this.props.allGenres}
                  />
                );
              })}
            </div>

            <Pagination
              hideOnSinglePage
              current={this.state.currentPage}
              movieService={this.props.movieService}
              total={this.total.length}
              showSizeChanger={false}
              onChange={this.onPaginationChange}
              defaultPageSize={20}
              style={{ marginTop: '10px' }}
            />
          </div>
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
