import ItemList from '../ItemList/ItemList';
import './List.css';

export default function List({ movies, guestSessionId, changeRatedMovies }) {
  return (
    <div className="list">
      {movies.map((item) => {
        return (
          <ItemList
            key={item.id}
            title={item.title}
            description={item.overview}
            release={item.release_date}
            poster={item.poster_path}
            rate={item.vote_average}
            movieId={item.id}
            guestSessionId={guestSessionId}
            changeRatedMovies={changeRatedMovies}
          />
        );
      })}
    </div>
  );
}
