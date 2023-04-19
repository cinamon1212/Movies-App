export default class MovieService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=cd28b874038213b9d99f6a967671e4df';
    this._token = 'cd28b874038213b9d99f6a967671e4df';
  }

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Could not fetch ${url}`, `received ${res.status}`);

    return await res.json();
  }

  async getAllMovies(urlPage, urlQuery) {
    const urlRes = this._apiBase + `&page=${urlPage}` + `&query=${urlQuery}`;
    const res = await this.getResource(urlRes);
    return res;
  }

  async getGenre() {
    const genre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._token}`);
    return await genre.json();
  }
}
