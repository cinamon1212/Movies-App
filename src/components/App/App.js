import React, { Component } from 'react';
import { Offline } from 'react-detect-offline';
import { Tabs } from 'antd';

import Search from '../Search/Search';
import Rated from '../Rated/Rated';
import MovieService from '../../service';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NetworkStatus from '../NetworkStatus/NetworkStatus';

import './App.css';

class App extends Component {
  movieService = new MovieService();

  state = {
    ratedMovies: [],
    hasError: false,
    guestSessionId: null,
  };

  componentDidMount() {
    this.guestSession();
  }

  guestSession = () => {
    this.movieService.getGuestSessionId().then((res) => {
      this.setState({
        guestSessionId: res,
      });
    });
  };

  changeRatedMovies = (rated) => {
    this.setState({
      ratedMovies: rated,
    });
  };

  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <Search
            movieService={this.movieService}
            guestSessionId={this.state.guestSessionId}
            changeRatedMovies={this.changeRatedMovies}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: <Rated ratedMovies={this.state.ratedMovies} guestSessionId={this.state.guestSessionId} />,
      },
    ];

    const tabs = <Tabs defaultActiveKey="1" items={items} centered style={{ paddingTop: '10px' }} />;
    const page = this.state.hasError ? <ErrorMessage /> : tabs;

    return (
      <div className="app">
        <Offline>{<NetworkStatus />}</Offline>
        {page}
      </div>
    );
  }
}

export default App;
