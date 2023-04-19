import React, { Component } from 'react';
// import { Offline } from 'react-detect-offline';
import { Tabs } from 'antd';

import Search from '../Search/Search';
import Rated from '../Rated/Rated';
import MovieService from '../../service';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NetworkStatus from '../NetworkStatus/NetworkStatus';
import { MovieServiceProvider, MovieServiceConsumer } from '../MovieServiceContext/MovieServiceContext';

import './App.css';

class App extends Component {
  movieService = new MovieService();

  state = {
    ratedMoviesArray: JSON.parse(localStorage.getItem('ratedMoviesArray'))
      ? JSON.parse(localStorage.getItem('ratedMoviesArray'))
      : [],
    hasError: false,

    // Search
    totalResults: null,
    totalPages: null,
    results: [],
    ratedResults: [],
    loading: true,
    isNotFound: false,
    query: 'return',
    currentPage: 1,

    genre: [],
  };

  componentDidMount() {
    localStorage.clear();
    this.movieService
      .getAllMovies(1, this.state.query)
      .then((res) => this.request(res, this.state.query))
      .catch((er) => {
        console.log(er);
      });

    this.movieService.getGenre().then((res) => {
      this.setState({
        genre: res,
      });
      localStorage.setItem('genre', JSON.stringify(res));
    });
  }

  request = (res, newQuery) => {
    localStorage.setItem('pageResults', JSON.stringify(res.results));

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
    localStorage.setItem('pageResults', JSON.stringify(res));
    this.setState({
      ratedResults: res,
      loading: false,
    });
  };

  updateRatedMovies = (res) => {
    localStorage.setItem('ratedPage', JSON.stringify(res));
  };

  addRatedMovie = (res) => {
    this.setState({
      ratedMoviesArray: [res, ...this.state.ratedMoviesArray],
    });
  };

  changeRatedMovieRating = (cardId, newRate) => {
    const arr = this.state.ratedMoviesArray;

    arr.forEach((element) => {
      if (element.id === cardId) element.rating = newRate;
    });

    this.setState({
      ratedMoviesArray: arr,
    });
  };

  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <MovieServiceConsumer>
            {(movieService) => {
              return (
                <Search
                  state={this.state}
                  movieService={movieService}
                  addRatedMovie={this.addRatedMovie}
                  changeRatedMovieRating={this.changeRatedMovieRating}
                  request={this.request}
                  changeLoading={this.changeLoading}
                  changeCurrentPage={this.changeCurrentPage}
                  updateMovies={this.updateMovies}
                />
              );
            }}
          </MovieServiceConsumer>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <MovieServiceConsumer>
            {(movieService) => {
              return (
                <Rated
                  movieService={movieService}
                  genre={this.state.genre}
                  ratedMoviesArray={this.state.ratedMoviesArray}
                  addRatedMovie={this.addRatedMovie}
                  changeRatedMovieRating={this.changeRatedMovieRating}
                  currentPage={this.state.currentPage}
                  changeLoading={this.changeLoading}
                  changeCurrentPage={this.changeCurrentPage}
                  updateRatedMovies={this.updateRatedMovies}
                />
              );
            }}
          </MovieServiceConsumer>
        ),
      },
    ];

    const tabs = (
      // destroyInactiveTabPane
      <Tabs defaultActiveKey="1" items={items} centered style={{ paddingTop: '10px' }} destroyInactiveTabPane />
    );
    const page = this.state.hasError ? <ErrorMessage /> : tabs;
    const isOnline = navigator.onLine ? page : <NetworkStatus />;

    return (
      <MovieServiceProvider value={this.movieService}>
        <div className="app">
          {/* <Offline>{<NetworkStatus />}</Offline>
          {page} */}
          {isOnline}
        </div>
      </MovieServiceProvider>
    );
  }
}

export default App;
