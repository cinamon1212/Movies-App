import React, { Component } from 'react';
import { Offline } from 'react-detect-offline';
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
    hasError: false,

    totalResults: null,
    totalPages: null,

    loading: true,
    isNotFound: false,
    query: 'return',
    currentPage: 1,

    allGenres: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.allGenres.length && this.state.allGenres && this.state.allGenres.length) {
      this.render();
    }
  }

  componentDidMount() {
    this.movieService
      .getAllMovies(1, this.state.query)
      .then((res) => this.request(res, this.state.query))
      .catch((er) => {
        console.log(er);
      });

    this.movieService.getGenre().then((res) => {
      this.setState({
        allGenres: res.genres,
      });
    });
  }

  request = (res, newQuery) => {
    localStorage.setItem('pageResults', JSON.stringify(res.results));

    this.setState({
      totalResults: res.total_results,
      totalPages: res.total_pages,
      loading: false,
      query: newQuery,
    });

    const localRes = JSON.parse(localStorage.getItem('pageResults'));

    if (!localRes.length) {
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
      loading: false,
    });
  };

  updateRatedMovies = (res) => {
    localStorage.setItem('ratedPage', JSON.stringify(res));
  };

  changeRatedMovieRating = (cardId, newRate) => {
    const arr = this.state.ratedMoviesArray;

    arr.forEach((element) => {
      if (element.id === cardId) element.rating = newRate;
    });

    localStorage.setItem('ratedMoviesArray', arr);
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
                  changeRatedMovieRating={this.changeRatedMovieRating}
                  request={this.request}
                  changeLoading={this.changeLoading}
                  changeCurrentPage={this.changeCurrentPage}
                  updateMovies={this.updateMovies}
                  allGenres={this.state.allGenres}
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
                  changeRatedMovieRating={this.changeRatedMovieRating}
                  currentPage={this.state.currentPage}
                  changeLoading={this.changeLoading}
                  changeCurrentPage={this.changeCurrentPage}
                  updateRatedMovies={this.updateRatedMovies}
                  loading={this.state.loading}
                  allGenres={this.state.allGenres}
                />
              );
            }}
          </MovieServiceConsumer>
        ),
      },
    ];

    const tabs = (
      <Tabs defaultActiveKey="1" items={items} centered style={{ paddingTop: '10px' }} destroyInactiveTabPane />
    );
    const page = this.state.hasError ? <ErrorMessage /> : tabs;

    return (
      <MovieServiceProvider value={this.movieService}>
        <div className="app">
          <Offline>{<NetworkStatus />}</Offline>
          {page}
        </div>
      </MovieServiceProvider>
    );
  }
}

export default App;
