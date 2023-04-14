import React, { Component } from 'react';

import ItemList from '../ItemList/ItemList';
import './Rated.css';

export default class Rated extends Component {
  render() {
    return (
      <div className="list">
        {this.props.ratedMovies.map((item) => {
          return (
            <ItemList
              key={item.id}
              title={item.title}
              description={item.overview}
              release={item.release_date}
              poster={item.poster_path}
              rate={item.vote_average}
              movieId={item.id}
              guestSessionId={this.props.guestSessionId}
              rating={item.rating}
            />
          );
        })}
      </div>
    );
  }
}
