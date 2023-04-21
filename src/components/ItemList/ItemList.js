import React, { Component } from 'react';
import { format } from 'date-fns';
import { Image, Rate } from 'antd';

import './ItemList.css';

export default class ItemList extends Component {
  state = {
    cardGenre: [],
  };

  componentDidMount() {
    function colorGrade() {
      const gr = document.querySelectorAll('.grade');

      gr.forEach((item) => {
        const grade = Number(item.innerText);

        if (grade >= 7) item.classList.add('perfect-grade');
        else if (grade >= 5 && grade < 7) item.classList.add('good-grade');
        else if (grade >= 3 && grade < 5) item.classList.add('bad-grade');
        else if (grade < 3) item.classList.add('terrible-grade');
      });
    }

    colorGrade();

    const getGenre = () => {
      let result = [];
      const res = this.props.allGenres;
      const propGenreIds = this.props.item.genre_ids;

      if (res && res.length) {
        res.forEach((element) => {
          if (propGenreIds && propGenreIds.length && propGenreIds.indexOf(element.id) !== -1) result.push(element.name);
        });
      }
      if (propGenreIds && !propGenreIds.length) result = ['Genres are unknown'];

      this.setState({
        cardGenre: result,
      });
    };

    getGenre();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.allGenres.length && this.props.allGenres && this.props.allGenres.length) this.componentDidMount();
  }

  onChange = (rating) => {
    let prop = this.props.item;
    prop = { ...prop, rating };

    const propArr = JSON.parse(localStorage.getItem('ratedMoviesArray'));

    if (propArr && propArr.length !== 0) {
      let flag = 0;
      propArr.forEach((element) => {
        if (element.id === prop.id) {
          element.rating = prop.rating;
          localStorage.setItem('ratedMoviesArray', JSON.stringify(propArr));
          localStorage.setItem('ratedPage', JSON.stringify(propArr));
          //
          flag++;
        }
      });
      if (!flag) {
        localStorage.setItem('ratedMoviesArray', JSON.stringify([prop, ...propArr]));
        localStorage.setItem('ratedPage', JSON.stringify([prop, ...propArr]));
      }
    } else {
      localStorage.setItem('ratedMoviesArray', JSON.stringify([prop]));
      localStorage.setItem('ratedPage', JSON.stringify([prop]));
    }
  };

  render() {
    const { item } = this.props;
    const {
      title,
      release_date: release,
      overview: description,
      poster_path: poster,
      vote_average: rate,
      id: movieId,
      genre_ids: genreIds,
    } = item;

    const mySlice = (str) => {
      const end = 90;
      let sliced = str.slice(0, end).trim();
      const strArr = sliced.split(' ');

      if (str.length > end) delete strArr[strArr.length - 1];

      sliced = strArr.join(' ').trim();
      let theLast = sliced[sliced.length - 1];

      if (theLast && (theLast === ',' || theLast === ';' || theLast === '...' || theLast === ':'))
        sliced = sliced.slice(0, sliced.length - 1);

      if (str.length > end) sliced += '...';
      return sliced;
    };

    const text = mySlice(description);

    let imageUrl;
    if (poster) {
      imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;
    } else imageUrl = 'https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture';

    let strRelease;
    let month;
    let year;
    let day;
    let date;
    let fullMonth;

    if (release) {
      strRelease = new Date(release);
      month = strRelease.getMonth();
      year = strRelease.getFullYear();
      day = strRelease.getDate();
      date = new Date(year, month, day);
      fullMonth = format(date, 'MMMM');
    }

    function sortRate(rating) {
      rating = String(rating.toFixed(1));

      const lastElem = rating[rating.length - 1];
      if (lastElem === '0') rating = Number(rating.slice(0, lastElem - 1));

      return rating;
    }

    const finalRating = sortRate(rate);

    let defaultValue;

    const ratedMovieArray = JSON.parse(localStorage.getItem('ratedMoviesArray'));

    if (ratedMovieArray) {
      ratedMovieArray.forEach((element) => {
        if (element.id === movieId) defaultValue = element.rating;
      });
    }

    let res;
    if (this.state.cardGenre)
      res = this.state.cardGenre.map((item, i) => {
        let className = 'genre';
        if (!genreIds.length) className = 'unknown-genre';
        return (
          <div className={className} key={i}>
            {item}
          </div>
        );
      });

    return (
      <div className="card">
        <Image className="image-big" src={imageUrl} />

        <div className="info">
          <span className="title">{title}</span>
          <div className="grade">{finalRating}</div>

          <span className="release">{release ? `${fullMonth} ${day}, ${year}` : 'Release date is unknown'}</span>

          <div className="genre-container">{res}</div>

          <span className="description">{text}</span>
          <Rate
            className="rate"
            allowHalf
            defaultValue={defaultValue ? defaultValue : 0}
            count={10}
            onChange={(value) => this.onChange(value)}
          />
        </div>
      </div>
    );
  }
}
