import React, { Component } from 'react';

import ItemList from '../ItemList/ItemList';
import './List.css';

export default class List extends Component {
  render() {
    return (
      <div className="list">
        {JSON.parse(localStorage.getItem('pageResults')).map((item) => {
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
    );
  }
}
