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
              title={item.title}
              description={item.overview}
              release={item.release_date}
              poster={item.poster_path}
              rate={item.vote_average}
              movieId={item.id}
              genreIds={item.genre_ids}
              genre={this.props.genre}
              rating={item.rating}
              item={item}
              ratedMoviesArray={this.props.ratedMoviesArray}
              addRatedMovie={this.props.addRatedMovie}
              changeRatedMovieRating={this.props.changeRatedMovieRating}
              movieService={this.props.movieService}
            />
          );
        })}
      </div>
    );
  }
}
