import React, { Component } from 'react';
import { format } from 'date-fns';
import { Image, Rate } from 'antd';

import './ItemList.css';

export default class ItemList extends Component {
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

  onChange(movieId, rate) {
    const guestId = this.props.guestSessionId;

    const postRate = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=cd28b874038213b9d99f6a967671e4df&guest_session_id=${guestId}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),

        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    postRate
      .then(() => {
        const getRate = fetch(
          `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=cd28b874038213b9d99f6a967671e4df`
        );
        return getRate;
      })
      .then((res) => console.log(res));
  }

  render() {
    const { title, release, description, poster, rate, movieId, rating } = this.props;

    const text = mySlice(description);
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;

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

    return (
      <div className="card">
        <Image
          src={imageUrl}
          style={{ height: '280px', width: '180px' }}
          fallback="https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture"
        />

        <div className="info">
          <span className="title">{title}</span>
          <div className="grade">{finalRating}</div>

          <span className="release">{release ? `${fullMonth} ${day}, ${year}` : 'Release date is unknown'}</span>

          <span className="genre">GENRE</span>
          <span className="description">{text}</span>
          <Rate
            allowHalf
            defaultValue={0}
            value={rating}
            count={10}
            onChange={(value) => this.onChange(movieId, value)}
          />
        </div>
      </div>
    );
  }
}
