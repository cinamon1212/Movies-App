import React, { Component } from 'react';
import { format } from 'date-fns';
import { Image, Rate } from 'antd';

import './ItemList.css';

export default class ItemList extends Component {
  state = {
    genreArray: [],
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
  }

  onChange = (id, rating) => {
    let prop = this.props.item;
    prop = { ...prop, rating };

    const propArr = this.props.ratedMoviesArray;

    let arr = JSON.parse(JSON.stringify(propArr));
    if (!propArr.length) {
      this.props.addRatedMovie(prop);
      arr = [prop];
    } else {
      let flag = 0;

      propArr.forEach((element, i) => {
        if (element.id === prop.id) {
          arr[i].rating = prop.rating;
          this.props.changeRatedMovieRating(id, rating);
          flag++;
        }
      });

      if (!flag) {
        this.props.addRatedMovie(prop);
        arr = [prop, ...arr];
      }
    }

    localStorage.setItem('ratedMoviesArray', JSON.stringify(arr));
    localStorage.setItem('ratedPage', JSON.stringify(arr));
  };

  render() {
    const { title, release, description, poster, rate, movieId, ratedMoviesArray, genreIds } = this.props;

    const text = mySlice(description);

    const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;
    const fallbackImg = 'https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture';

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

    function mySlice(str) {
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
    }

    function sortRate(rating) {
      rating = String(rating.toFixed(1));

      const lastElem = rating[rating.length - 1];
      if (lastElem === '0') rating = Number(rating.slice(0, lastElem - 1));

      return rating;
    }

    const finalRating = sortRate(rate);

    let defaultValue;

    if (ratedMoviesArray) {
      ratedMoviesArray.forEach((element) => {
        if (element.id === movieId) defaultValue = element.rating;
      });
    }

    let cardGenre = [];
    const localGenre = JSON.parse(localStorage.getItem('genre'));

    if (localGenre) {
      localGenre.genres.forEach((element) => {
        if (genreIds.indexOf(element.id) !== -1) cardGenre.push(element.name);
      });
      // ! РАЗБИТЬ CARDGANRE НА МАССИВ ЧЕРЕЗ ПРОБЕЛ
    }
    if (!genreIds.length) cardGenre = ['Genres are unknown'];

    return (
      <div className="card">
        <Image
          src={poster ? imageUrl : fallbackImg}
          style={{ height: '280px', width: '180px' }}
          // fallback="https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture"
        />

        <div className="info">
          <span className="title">{title}</span>
          <div className="grade">{finalRating}</div>

          <span className="release">{release ? `${fullMonth} ${day}, ${year}` : 'Release date is unknown'}</span>

          <div className="genre-container">
            {cardGenre.map((item, i) => {
              let className = 'genre';
              if (!genreIds.length) className = 'unknown-genre';
              return (
                <div className={className} key={i}>
                  {item}
                </div>
              );
            })}
          </div>
          <span className="description">{text}</span>
          <Rate
            allowHalf
            defaultValue={defaultValue ? defaultValue : 0}
            count={10}
            onChange={(value) => this.onChange(movieId, value)}
          />
        </div>
      </div>
    );
  }
}
